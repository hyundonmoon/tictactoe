import { useEffect } from 'react';
import Board from '../components/Board';
import { BoardState } from '../types/boardState.model';
import useGameState from '../hooks/useGameState';
import getNextMoveForComputer from '../utils/minimax';
import ResetBtn from '../components/ResetBtn';
import SinglePlayerScoreboard from '../components/SinglePlayerScoreboard';

export default function SinglePlayerGame() {
  const {
    winner,
    isGameOver,
    isDraw,
    currentTurn,
    setCurrentTurn,
    gameStats,
    reset,
    boardState,
    setBoardState,
  } = useGameState();

  const makeMove = (idx: number) => {
    if (boardState[idx] !== '' || isGameOver) return;

    const newBoardState = [...boardState] as BoardState;
    newBoardState[idx] = currentTurn;
    setBoardState(newBoardState);
    setCurrentTurn((currentTurn) => (currentTurn === 'O' ? 'X' : 'O'));
  };

  useEffect(() => {
    if (isGameOver) {
      if (isDraw) {
        alert('Draw!');
      } else {
        alert(`Game over! The winner is: ${winner}`);
      }
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    if (currentTurn === 'X') return;

    const nextMoveIdx = getNextMoveForComputer(boardState);

    let timeoutId: ReturnType<typeof setTimeout>;

    if (nextMoveIdx !== -1) {
      timeoutId = setTimeout(() => {
        makeMove(nextMoveIdx);
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
      <Board boardState={boardState} makeMove={makeMove} />
      <ResetBtn handleClick={reset} />
    </div>
  );
}
