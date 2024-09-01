import { useNavigate } from 'react-router-dom';
import MultiplayerLobbySidebarButton from './MultiplayerLobbySiderbarButton';

interface MultiplayerLobbySidebarProps {
  setCreateRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setJoinRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNicknameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MultiplayerLobbySidebar({
  setCreateRoomModalOpen,
  setJoinRoomModalOpen,
  setNicknameModalOpen,
}: MultiplayerLobbySidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="shrink-0 bg-white p-4 rounded-lg shadow-md md:p-6">
      <div className="flex flex-col gap-2 h-full md:gap-4">
        <MultiplayerLobbySidebarButton
          baseColorClass="bg-cyan-600"
          hoverColorClass="bg-cyan-700"
          handleClick={() => {
            setCreateRoomModalOpen(true);
          }}
          text="Create a room"
        />

        <MultiplayerLobbySidebarButton
          baseColorClass="bg-cyan-600"
          hoverColorClass="bg-cyan-700"
          handleClick={() => {
            setJoinRoomModalOpen(true);
          }}
          text="Join a room"
        />

        <div className="flex-1 hidden md:block"></div>

        <MultiplayerLobbySidebarButton
          baseColorClass="bg-rose-600"
          hoverColorClass="bg-rose-700"
          handleClick={() => {
            setNicknameModalOpen(true);
          }}
          text="Change nickname"
        />

        <MultiplayerLobbySidebarButton
          baseColorClass="bg-gray-500"
          hoverColorClass="bg-gray-600"
          handleClick={() => {
            navigate('/');
          }}
          text="Go back"
        />
      </div>
    </div>
  );
}
