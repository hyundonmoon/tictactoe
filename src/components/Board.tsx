import { BoardState as BoardModel } from '../types/boardState.model';
import CircleIcon from './CircleIcon';
import XMarkIcon from './XMarkIcon';

export default function Board({
  boardState,
  currentTurn,
  makeMove,
}: {
  boardState: BoardModel;
  currentTurn: 'O' | 'X';
  makeMove: (idx: number) => void;
}) {
  const handleBoardClick = (idx: number) => {
    if (currentTurn !== 'X') {
      return;
    }

    makeMove(idx);
  };

  return (
    <div className="board grid grid-cols-3 gap-4">
      {boardState.map((value, index) => (
        <button
          key={index}
          className="col-span-1 w-36 h-36 p-8 bg-amber-50 shadow-md shadow-amber-200/50 cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden enabled:active:shadow-inner disabled:shadow-inner disabled:bg-amber-100 disabled:cursor-not-allowed"
          onClick={() => handleBoardClick(index)}
          disabled={value !== ''}
        >
          {value === 'O' ? <CircleIcon /> : value === 'X' ? <XMarkIcon /> : ''}
        </button>
      ))}
    </div>
  );
}
