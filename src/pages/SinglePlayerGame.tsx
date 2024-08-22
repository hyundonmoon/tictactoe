import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { BoardState } from '../types/boardState.model';
import useGameState from '../hooks/useGameState';
import getNextMoveForComputer from '../utils/minimax';
import SinglePlayerScoreboard from '../components/SinglePlayerScoreboard';
import GameOverModal from '../components/modals/GameOverModal';
import ResetConfirmModal from '../components/modals/ResetConfirmModal';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../assets/left-arrow.svg';
import resetIcon from '../assets/reset.svg';
import GoBackConfirmModal from '../components/modals/GoBackConfirmModal';

export default function SinglePlayerGame() {
  const {
    winner,
    isGameOver,
    currentTurn,
    setCurrentTurn,
    gameStats,
    reset,
    playAgain,
    boardState,
    setBoardState,
  } = useGameState();
  const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false);
  const [isGoBackConfirmModalOpen, setIsGoBackConfirmModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const makeMove = (idx: number, player: 'O' | 'X', currentTurn: 'O' | 'X') => {
    if (boardState[idx] !== '' || isGameOver) return;
    if (currentTurn !== player) return;

    const newBoardState = [...boardState] as BoardState;
    newBoardState[idx] = currentTurn;
    setBoardState(newBoardState);
    setCurrentTurn((currentTurn) => (currentTurn === 'O' ? 'X' : 'O'));
  };

  useEffect(() => {
    if (isGameOver) return;
    if (currentTurn === 'X') return;

    const nextMoveIdx = getNextMoveForComputer(boardState);

    let timeoutId: ReturnType<typeof setTimeout>;

    if (nextMoveIdx !== -1) {
      timeoutId = setTimeout(() => {
        makeMove(nextMoveIdx, 'O', currentTurn);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [boardState, isGameOver, currentTurn]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <div className="w-max h-full flex flex-col justify-center items-center gap-4 space-y-6">
          <div className="w-full flex justify-between items-center">
            <button
              className="w-8 h-8 transition-all duration-200 transform hover:translate-y-[-4px] cursor-pointer"
              onClick={() => {
                setIsGoBackConfirmModalOpen(true);
              }}
            >
              <img src={leftArrowIcon} alt="Go back to landing page" />
            </button>

            <button
              className="w-8 h-8 transition-all duration-200 transform hover:translate-y-[-4px] cursor-pointer"
              onClick={() => {
                setIsResetConfirmModalOpen(true);
              }}
            >
              <img src={resetIcon} />
            </button>
          </div>
          <Board
            boardState={boardState}
            makeMove={makeMove}
            currentTurn={currentTurn}
          />

          <SinglePlayerScoreboard stats={gameStats} />
        </div>
      </div>

      <GameOverModal
        isGameOver={isGameOver}
        winner={winner}
        currentPlayer="X"
        onClose={playAgain}
      />
      <ResetConfirmModal
        isResetConfirmModalOpen={isResetConfirmModalOpen}
        closeModal={() => {
          setIsResetConfirmModalOpen(false);
        }}
        reset={reset}
      />
      <GoBackConfirmModal
        isOpen={isGoBackConfirmModalOpen}
        closeModal={() => {
          setIsGoBackConfirmModalOpen(false);
        }}
        onConfirm={() => {
          navigate('/');
        }}
      />
    </>
  );
}
