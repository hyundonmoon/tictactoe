import { BoardState } from '../types/boardState.model';
import getGameState from './getGameState';

export default function getNextMoveForComputer(boardState: BoardState): number {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === '') {
      const tempBoardState = [...boardState] as BoardState;
      tempBoardState[i] = 'O';
      const score = minimax(tempBoardState, false);

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(boardState: BoardState, maximize: boolean): number {
  const { isGameOver, winner } = getGameState(boardState);

  if (isGameOver) {
    if (winner === 'O') {
      return 10;
    } else if (winner === 'X') {
      return -10;
    }

    return 0;
  }

  if (maximize) {
    // computer's turn
    let value = -Infinity;

    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === '') {
        const tempBoardState = [...boardState] as BoardState;
        tempBoardState[i] = 'O';
        value = Math.max(value, minimax(tempBoardState, !maximize));
      }
    }

    return value;
  } else {
    let value = Infinity;

    for (let j = 0; j < boardState.length; j++) {
      if (boardState[j] === '') {
        const tempBoardState = [...boardState] as BoardState;
        tempBoardState[j] = 'X';
        value = Math.min(value, minimax(tempBoardState, !maximize));
      }
    }

    return value;
  }
}
