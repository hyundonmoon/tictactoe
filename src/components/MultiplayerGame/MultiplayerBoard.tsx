import { BoardState } from '../../types/boardState.model';
import { GameAction, Player } from '../../types/socket.model';
import CircleIcon from '../CircleIcon';
import XMarkIcon from '../XMarkIcon';

interface MultiplayerBoardProps {
  boardState: BoardState;
  currentTurn: Player | null;
  myPlayer: Player | null;
  isGameStarted: boolean;
  isGameOver: boolean;
  handleClick: (action: GameAction) => void;
  roomId: string;
}

export default function MultiplayerBoard({
  boardState,
  isGameStarted,
  isGameOver: isGameFinished,
  currentTurn,
  myPlayer,
  handleClick,
  roomId,
}: MultiplayerBoardProps) {
  return (
    <div className="board grid grid-cols-3 gap-4">
      {boardState.map((value, idx) => (
        <button
          key={idx}
          className={`w-36 h-36 p-8 bg-white shadow-md shadow-gray-400 cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden disabled:shadow-inner disabled:shadow-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 ${
            !!currentTurn &&
            !!myPlayer &&
            currentTurn?.id === myPlayer?.id &&
            value === '' &&
            isGameStarted &&
            !isGameFinished
              ? 'hover:bg-blue-50'
              : ''
          }`}
          disabled={
            value !== '' ||
            !currentTurn ||
            !myPlayer ||
            !isGameStarted ||
            isGameFinished ||
            currentTurn?.id !== myPlayer?.id
          }
          onClick={() => {
            handleClick({
              player: myPlayer!,
              idx,
              roomId,
            });
          }}
        >
          {value === 'O' ? <CircleIcon /> : value === 'X' ? <XMarkIcon /> : ''}
        </button>
      ))}
    </div>
  );
}
