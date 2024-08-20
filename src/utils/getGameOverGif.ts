import sadMichael from '../assets/sad-michael.gif';
import soSoRonaldo from '../assets/soso-ronaldo.gif';
import wowJoeRogan from '../assets/wow-joerogan.gif';

import { GameResult } from '../types/gameStats.model';
import GAME_RESULT from '../constants/gameResult.constants';

export default function getGameOverGif(result: GameResult): string {
  if (result === GAME_RESULT.DRAW) {
    return soSoRonaldo;
  } else if (result === GAME_RESULT.LOSS) {
    return sadMichael;
  } else {
    return wowJoeRogan;
  }
}
