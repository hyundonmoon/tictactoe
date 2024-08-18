import { useEffect, useState } from 'react';
import Board from '../components/Board';
import { BoardState as BoardModel } from '../types/boardState.model';
import useGameState from '../hooks/useGameState';

export default function SinglePlayerGame() {
  const [boardState, setBoardState] = useState(
    Array.from({ length: 9 }).fill('') as BoardModel,
  );
  const [currentTurn, setCurrentTurn] = useState<'O' | 'X'>('X');
  const { winner, isGameOver, isDraw } = useGameState(boardState);

  const handleBoardClick = (idx: number) => {
    if (currentTurn !== 'X') return;
    if (boardState[idx] !== '') return;
    if (isGameOver) return;

    const newBoardState = [...boardState] as BoardModel;
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
    // TODO: implement computer move logic
  }, [boardState, isGameOver, currentTurn]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Board boardState={boardState} handleBoardClick={handleBoardClick} />
    </div>
  );
}
