import { useEffect, useState } from 'react';
import { BoardState } from '../types/boardState.model';
import getGameState from '../utils/getGameState';

export default function useGameState(boardState: BoardState) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<'O' | 'X' | ''>('');
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const status = getGameState(boardState);

    if (status.isGameOver) {
      setIsGameOver(true);
      setWinner(status.winner);
      setIsDraw(status.isDraw);
    }
  }, [boardState]);

  return { isGameOver, winner, isDraw };
}
