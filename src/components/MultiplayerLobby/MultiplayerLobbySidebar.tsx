import { useNavigate } from 'react-router-dom';

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
    <div className="shrink-0 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-4 h-full">
        <button
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          onClick={() => {
            setCreateRoomModalOpen(true);
          }}
        >
          Create a room
        </button>

        <button
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          onClick={() => {
            setJoinRoomModalOpen(true);
          }}
        >
          Join a room
        </button>

        <div className="flex-1 hidden md:block"></div>
        <button
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          onClick={() => {
            setNicknameModalOpen(true);
          }}
        >
          Change nickname
        </button>
        <button
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
