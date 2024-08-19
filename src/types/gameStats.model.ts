import GAME_RESULTS from '../constants/gameResult.constants';

export type GameResult = (typeof GAME_RESULTS)[keyof typeof GAME_RESULTS];

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}
