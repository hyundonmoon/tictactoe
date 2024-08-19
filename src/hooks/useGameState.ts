import { useEffect, useState } from 'react';
import { BoardState } from '../types/boardState.model';
import getGameState from '../utils/getGameState';
import useGameStats from './useGameStats';
import GAME_RESULTS from '../constants/gameResult.constants';

export default function useGameState() {
  const [boardState, setBoardState] = useState(
    Array.from({ length: 9 }).fill('') as BoardState,
  );
  const [currentTurn, setCurrentTurn] = useState<'O' | 'X'>('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<'O' | 'X' | ''>('');
  const [isDraw, setIsDraw] = useState(false);
  const { gameStats, dispatchGameResult } = useGameStats();

  const reset = () => {
    setCurrentTurn('X');
    setIsGameOver(false);
    setWinner('');
    setIsDraw(false);
    dispatchGameResult({ type: 'reset' });
    setBoardState(Array.from({ length: 9 }).fill('') as BoardState);
  };

  useEffect(() => {
    const status = getGameState(boardState);

    if (status.isGameOver) {
      setWinner(status.winner);
      setIsDraw(status.isDraw);
      setIsGameOver(true);

      if (status.isDraw) {
        dispatchGameResult({ type: GAME_RESULTS.DRAW });
      } else if (status.winner === 'X') {
        dispatchGameResult({ type: GAME_RESULTS.WIN });
      } else {
        dispatchGameResult({ type: GAME_RESULTS.LOSS });
      }
    }
  }, [boardState]);

  return {
    boardState,
    setBoardState,
    isGameOver,
    winner,
    isDraw,
    currentTurn,
    setCurrentTurn,
    gameStats,
    reset,
  };
}
