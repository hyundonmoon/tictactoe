// ROOM

export const ROOM_SERVER_TO_CLIENT = {
  PENDING: 'ROOM::PENDING',
  JOINED: 'ROOM::JOINED',
  NOT_FOUND: 'ROOM::NOT_FOUND',
  FULL: 'ROOM::FULL',
  PASSWORD_REQUIRED: 'ROOM::PASSWORD_REQUIRED',
  WRONG_PASSWORD: 'ROOM::WRONG_PASSWORD',
  PLAYER_LEFT: 'ROOM::PLAYER_LEFT',
} as const;

export const ROOM_CLIENT_TO_SERVER = {
  CREATE: 'ROOM::CREATE',
  JOIN: 'ROOM::JOIN',
  JOIN_PASSWORD: 'ROOM::JOIN_PASSWORD',
  LEAVE: 'ROOM::LEAVE',
} as const;

// GAME

export const GAME_SERVER_TO_CLIENT = {
  START: 'GAME::START',
  OVER: 'GAME::OVER',
  ACTION: 'GAME::ACTION',
} as const;

export const GAME_CLIENT_TO_SERVER = {
  READY: 'GAME::READY',
  MAKE_MOVE: 'GAME::MAKE_MOVE',
} as const;
