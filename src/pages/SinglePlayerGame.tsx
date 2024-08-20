import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { BoardState } from '../types/boardState.model';
import useGameState from '../hooks/useGameState';
import getNextMoveForComputer from '../utils/minimax';
import ResetBtn from '../components/ResetBtn';
import SinglePlayerScoreboard from '../components/SinglePlayerScoreboard';
import GameOverModal from '../components/GameOverModal';
import ResetConfirmModal from '../components/ResetConfirmModal';

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
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <SinglePlayerScoreboard stats={gameStats} />
      <Board
        boardState={boardState}
        makeMove={makeMove}
        currentTurn={currentTurn}
      />
      <ResetBtn
        handleClick={() => {
          setIsResetConfirmModalOpen(true);
        }}
      />
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
    </div>
  );
}
