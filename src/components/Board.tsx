import { BoardState as BoardModel } from '../types/boardState.model';
import CircleIcon from './CircleIcon';
import XMarkIcon from './XMarkIcon';

export default function Board({
  boardState,
  makeMove,
  currentTurn,
}: {
  boardState: BoardModel;
  currentTurn: 'O' | 'X';
  makeMove: (idx: number, player: 'O' | 'X', currentTurn: 'O' | 'X') => void;
}) {
  const handleBoardClick = (idx: number) => {
    makeMove(idx, 'X', currentTurn);
  };

  return (
    <div className="board grid grid-cols-3 gap-4">
      {boardState.map((value, index) => (
        <button
          key={index}
          className="w-36 h-36 p-8 bg-white shadow-md shadow-gray-400 cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden disabled:shadow-inner disabled:shadow-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50"
          onClick={() => handleBoardClick(index)}
          disabled={value !== ''}
        >
          {value === 'O' ? <CircleIcon /> : value === 'X' ? <XMarkIcon /> : ''}
        </button>
      ))}
    </div>
  );
}
