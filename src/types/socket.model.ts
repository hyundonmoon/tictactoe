export interface Room {
  id: string; // uuid used to redirect user to game page
  name: string; // user submitted name for room
  playerCount: number;
  hasPassword: boolean;
}
