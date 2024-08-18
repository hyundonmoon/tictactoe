import { BoardState as BoardModel } from '../types/boardState.model';
import CircleIcon from './CircleIcon';
import XMarkIcon from './XMarkIcon';

export default function Board({
  boardState,
  handleBoardClick,
}: {
  boardState: BoardModel;
  handleBoardClick: (idx: number) => void;
}) {
  return (
    <div className="board grid grid-cols-3 gap-4">
      {boardState.map((value, index) => (
        <button
          key={index}
          className="col-span-1 w-36 h-36 p-8 bg-amber-50 shadow-md shadow-amber-200/50 cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden active:shadow-inner"
          onClick={() => handleBoardClick(index)}
        >
          {value === 'O' ? <CircleIcon /> : value === 'X' ? <XMarkIcon /> : ''}
        </button>
      ))}
    </div>
  );
}
