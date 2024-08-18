import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { BoardState } from '../types/boardState.model';
import useGameState from '../hooks/useGameState';
import getNextMoveForComputer from '../utils/minimax';

export default function SinglePlayerGame() {
  const [boardState, setBoardState] = useState(
    Array.from({ length: 9 }).fill('') as BoardState,
  );
  const { winner, isGameOver, isDraw, currentTurn, setCurrentTurn } =
    useGameState(boardState);

  const handleBoardClick = (idx: number) => {
    if (boardState[idx] !== '') return;
    if (isGameOver) return;

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

    if (nextMoveIdx !== -1) {
      setTimeout(() => {
        handleBoardClick(nextMoveIdx);
      }, 1000);
    }
  }, [boardState, isGameOver, currentTurn]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Board boardState={boardState} handleBoardClick={handleBoardClick} />
    </div>
  );
}
