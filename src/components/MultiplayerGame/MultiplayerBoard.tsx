import { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { BoardState } from '../../types/boardState.model';
import { GameAction, Player } from '../../types/socket.model';
import CircleIcon from '../CircleIcon';
import XMarkIcon from '../XMarkIcon';

interface MultiplayerBoardProps {
  boardState: BoardState;
  currentTurn: Player;
  handleClick: (action: GameAction) => void;
  players: Player[];
  roomId: string;
}

export default function MultiplayerBoard({
  boardState,
  currentTurn,
  handleClick,
  players,
  roomId,
}: MultiplayerBoardProps) {
  const { socket } = useSocket();
  const [myPlayer, setMyPlayer] = useState<Player>();

  useEffect(() => {
    setMyPlayer(players.find((player) => player.id === socket?.id));
  }, [players, socket]);

  if (!socket?.connected || !myPlayer) {
    return null;
  }

  return (
    <div className="board grid grid-cols-3 gap-4">
      {boardState.map((value, idx) => (
        <button
          key={idx}
          className={`w-24 h-24 lg:w-36 lg:h-36 p-6 lg:p-8 bg-white shadow-md shadow-gray-400 cursor-pointer rounded-3xl flex justify-center items-center overflow-hidden disabled:shadow-inner disabled:shadow-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 ${
            !!myPlayer && currentTurn.id === socket.id && value === ''
              ? 'hover:bg-blue-50'
              : ''
          }`}
          disabled={
            value !== '' ||
            !currentTurn ||
            !myPlayer ||
            currentTurn.id !== socket.id
          }
          onClick={() => {
            handleClick({
              player: myPlayer,
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
