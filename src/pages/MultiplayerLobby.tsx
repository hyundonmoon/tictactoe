import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMultiplayerRoom from '../components/modals/CreateMultiplayerRoomModal';
import JoinRoomModal from '../components/modals/JoinRoomModal';
import UserNicknameModal from '../components/modals/UserNicknameModal';
import MultiplayerGameLoadingScreen from '../components/MultiplayerGame/LoadingScreen';
import MultiplayerLobbyMain from '../components/MultiplayerLobby/MultiplayerLobbyMain';
import MultiplayerLobbySidebar from '../components/MultiplayerLobby/MultiplayerLobbySidebar';
import {
  ROOM_CLIENT_TO_SERVER,
  ROOM_SERVER_TO_CLIENT,
} from '../constants/socket.constants';
import { useSocket } from '../contexts/SocketContext';

export default function MultiplayerLobby() {
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
  const createModalRoomRef = useRef<HTMLDialogElement | null>(null);

  const openCreateRoomModal = useCallback(() => {
    createModalRoomRef.current?.showModal();
  }, []);

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
    return (
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <MultiplayerGameLoadingScreen
          intervalMessages={[
            'Joining lobby.',
            'Joining lobby..',
            'Joining lobby...',
          ]}
          note="This may take up to a minute if the server has been idle for a while — my hosting service's free-tier isn't the fastest, but it gets the job done!"
        />
      </div>
    );
  }

  return (
    <>
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <div className="flex flex-col w-full max-w-4xl h-full max-h-[700px] bg-gray-100 p-4 rounded-lg shadow-lg overflow-hidden md:p-8">
          <header className="mb-4 md:mb-6">
            <h1 className="text:lg md:text-2xl text-gray-900 font-bold">
              Find & Join a Game
            </h1>
          </header>

          <div className="min-h-0 flex flex-col md:flex-row gap-4 flex-1 md:gap-6">
            <MultiplayerLobbyMain />
            <MultiplayerLobbySidebar
              openCreateRoomModal={openCreateRoomModal}
              setJoinRoomModalOpen={setJoinRoomModalOpen}
              setNicknameModalOpen={setNicknameModalOpen}
            />
          </div>
        </div>
      </div>

      <CreateMultiplayerRoom
        ref={createModalRoomRef}
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
