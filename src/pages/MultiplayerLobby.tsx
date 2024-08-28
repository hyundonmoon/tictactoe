import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMultiplayerRoom from '../components/modals/CreateMultiplayerRoomModal';
import JoinRoomModal from '../components/modals/JoinRoomModal';
import UserNicknameModal from '../components/modals/UserNicknameModal';
import MultiplayerLobbySidebar from '../components/MultiplayerLobby/MultiplayerLobbySidebar';
import RoomList from '../components/MultiplayerLobby/RoomList';
import {
  ROOM_CLIENT_TO_SERVER,
  ROOM_SERVER_TO_CLIENT,
} from '../constants/socket.constants';
import { useSocket } from '../contexts/SocketContext';
import useRoomList from '../hooks/useRoomList';

export default function MultiplayerLobby() {
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
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
    const handleRoomJoin = ({ roomId }: { roomId: string }) => {
      navigate(`../play/${roomId}`);
    };
    if (connected) {
      socket?.on(ROOM_SERVER_TO_CLIENT.PENDING, handleRoomJoin);
    }

    return () => {
      socket?.off(ROOM_SERVER_TO_CLIENT.PENDING, handleRoomJoin);
    };
  }, [socket, connected]);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <div className="flex flex-col w-full max-w-4xl h-full max-h-[700px] bg-gray-100 p-8 rounded-lg shadow-lg overflow-hidden">
          <header className="mb-6">
            <h1 className="text-2xl text-gray-900 font-bold">
              Find & Join a Game
            </h1>
          </header>

          <div className="min-h-0 flex flex-col md:flex-row gap-6 flex-1">
            <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                  Room List
                </h2>
                <button
                  className="text-sm hover:font-bold"
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

            <MultiplayerLobbySidebar
              setCreateRoomModalOpen={setCreateRoomModalOpen}
              setJoinRoomModalOpen={setJoinRoomModalOpen}
              setNicknameModalOpen={setNicknameModalOpen}
            />
          </div>
        </div>
      </div>

      <CreateMultiplayerRoom
        isOpen={isCreateRoomModalOpen}
        closeModal={() => {
          setCreateRoomModalOpen(false);
        }}
        onSubmit={(name: string, password: string, isPrivate: boolean) => {
          socket.emit(ROOM_CLIENT_TO_SERVER.CREATE, {
            name,
            password,
            isPrivate,
          });
        }}
      />

      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        closeModal={() => {
          setJoinRoomModalOpen(false);
        }}
      />

      <UserNicknameModal
        isOpen={isNicknameModalOpen}
        closeModal={() => {
          setNicknameModalOpen(false);
        }}
        onSubmit={(nickname) => {
          localStorage.setItem('nickname', nickname);
          setNicknameModalOpen(false);
        }}
      />
    </>
  );
}
