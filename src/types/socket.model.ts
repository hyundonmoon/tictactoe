import { BoardState } from './boardState.model';

export interface Room {
  id: string; // uuid used to redirect user to game page
  name: string; // user submitted name for room
  playerCount: number;
  hasPassword: boolean;
}

export interface Player {
  id: string;
  symbol: 'O' | 'X';
  name: string;
}

export interface GameplayData {
  isStarted: boolean;
  isFinished: boolean;
  isAborted: boolean;
  isDraw: boolean;
  winner: Player | null;
  board: BoardState;
  players: Player[];
  currentTurn: Player;
}

export interface GameAction {
  idx: number;
  player: Player;
  roomId: string;
}
