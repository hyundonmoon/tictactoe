import { useReducer } from 'react';
import { GameResult, GameStats } from '../types/gameStats.model';
import GAME_RESULTS from '../constants/gameResult.constants';

function reducer(
  state: GameStats,
  action: { type: GameResult | 'reset' },
): GameStats {
  let newState = { ...state };

  switch (action.type) {
    case GAME_RESULTS.WIN:
      newState.wins++;
      break;
    case GAME_RESULTS.LOSS:
      newState.losses++;
      break;
    case GAME_RESULTS.DRAW:
      newState.draws++;
      break;
    case 'reset':
      newState = initialStats;
      break;
    default:
      break;
  }

  return newState;
}

const initialStats = {
  wins: 0,
  losses: 0,
  draws: 0,
} as const;

export default function useGameStats() {
  const [gameStats, dispatchGameResult] = useReducer(reducer, initialStats);
  return { gameStats, dispatchGameResult };
}
