import { Room } from '../../types/socket.model';
import lockIcon from '../../assets/locked.svg';

interface RoomItemProps {
  room: Room;
  handleClick: (id: string) => void;
}

export default function RoomItem({ room, handleClick }: RoomItemProps) {
  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <h3 className="text-gray-800 font-semibold">{room.name}</h3>
          {room.hasPassword && (
            <img src={lockIcon} alt="Locked room" className="w-5 h-5" />
          )}
        </div>
        <p className="text-sm text-gray-600">{room.playerCount} / 2 players</p>
      </div>
      <button
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => {
          handleClick(room.id);
        }}
      >
        Join Room
      </button>
    </li>
  );
}
