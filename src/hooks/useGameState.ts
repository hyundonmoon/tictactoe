import { useEffect, useState } from 'react';
import { BoardState } from '../types/boardState.model';
import getGameState from '../utils/getGameState';
import useGameStats from './useGameStats';
import GAME_RESULTS from '../constants/gameResult.constants';

export default function useGameState(boardState: BoardState) {
  const [currentTurn, setCurrentTurn] = useState<'O' | 'X'>('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<'O' | 'X' | ''>('');
  const [isDraw, setIsDraw] = useState(false);
  const { gameStats, dispatchGameResult } = useGameStats();

  useEffect(() => {
    const status = getGameState(boardState);

    if (status.isGameOver) {
      setWinner(status.winner);
      setIsDraw(status.isDraw);
      setIsGameOver(true);

      if (status.isDraw) {
        dispatchGameResult(GAME_RESULTS.DRAW);
      } else if (status.winner === 'X') {
        dispatchGameResult(GAME_RESULTS.WIN);
      } else {
        dispatchGameResult(GAME_RESULTS.LOSS);
      }
    }
  }, [boardState]);

  return { isGameOver, winner, isDraw, currentTurn, setCurrentTurn, gameStats };
}
