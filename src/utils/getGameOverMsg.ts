import { GameResult } from '../types/gameStats.model';
import GAME_RESULTS from '../constants/gameResult.constants';

export default function getGameOverMsg(result: GameResult): string {
  if (result === GAME_RESULTS.DRAW) {
    return "It's a draw.";
  } else if (result === GAME_RESULTS.WIN) {
    return 'You win!';
  } else {
    return 'You lose...';
  }
}
