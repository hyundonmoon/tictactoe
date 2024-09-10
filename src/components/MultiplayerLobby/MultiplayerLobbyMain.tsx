import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOM_SERVER_TO_CLIENT } from '../../constants/socket.constants';
import { useSocket } from '../../contexts/SocketContext';
import useRoomList from '../../hooks/useRoomList';
import RoomList from './RoomList';

export default function MultiplayerLobbyMain() {
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const [roomListFilter] = useState<'waiting' | 'all'>('all');
  const {
    data: rooms,
    isPending,
    isError,
    refetch,
  } = useRoomList(roomListFilter);

  const handleRoomItemClick = (roomId: string) => {
    navigate(`../play/${roomId}`);
  };

  useEffect(() => {
    if (connected) {
      socket?.on(ROOM_SERVER_TO_CLIENT.NEW_ROOM, refetch);
    }

    return () => {
      socket?.off(ROOM_SERVER_TO_CLIENT.NEW_ROOM, refetch);
    };
  }, [socket, connected]);

  return (
    <div className="flex-1 flex flex-col bg-white p-4 rounded-lg shadow-md overflow-hidden mid:p-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed">
        <h2 className="text-md md:text-xl font-semibold text-gray-800 flex-1">
          Room List
        </h2>
        <button
          className="text-xs md:text-sm hover:font-bold"
          onClick={() => refetch()}
        >
          Refresh
        </button>
      </div>

      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="flex-1 flex justify-center items-center text-gray-500">
          Error when loading room list.
        </div>
      ) : (
        <RoomList rooms={rooms} handleClick={handleRoomItemClick} />
      )}
    </div>
  );
}
