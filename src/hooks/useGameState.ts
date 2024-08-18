import { useEffect, useState } from 'react';
import { BoardState } from '../types/boardState.model';
import getGameState from '../utils/getGameState';

export default function useGameState(boardState: BoardState) {
  const [currentTurn, setCurrentTurn] = useState<'O' | 'X'>('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<'O' | 'X' | ''>('');
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const status = getGameState(boardState);

    if (status.isGameOver) {
      setWinner(status.winner);
      setIsDraw(status.isDraw);
      setIsGameOver(true);
    }
  }, [boardState]);

  return { isGameOver, winner, isDraw, currentTurn, setCurrentTurn };
}
