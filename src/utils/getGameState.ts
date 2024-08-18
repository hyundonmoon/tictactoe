import { BoardState } from '../types/boardState.model';

export default function getGameState(board: BoardState) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner: 'O' | 'X' | '' = '';

  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (!board[a] || !board[b] || !board[c]) continue;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  }

  const isDraw = board.every((value) => value !== '') && winner === '';

  return {
    isGameOver: winner !== '' || isDraw,
    isDraw,
    winner,
  };
}
