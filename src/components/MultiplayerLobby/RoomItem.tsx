import lockIcon from '../../assets/locked.svg';
import { Room } from '../../types/socket.model';

interface RoomItemProps {
  room: Room;
  handleClick: (id: string) => void;
}

export default function RoomItem({ room, handleClick }: RoomItemProps) {
  return (
    <>
      <li
        onClick={() => {
          handleClick(room.id);
        }}
        className="w-full p-4 bg-white shadow rounded flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 hover:bg-gray-100 cursor-pointer transition"
      >
        <div className="flex-1 flex min-w-0 max-w-full items-center space-x-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate max-w-xs sm:max-w-none">
            {room.name}
          </h3>
          {room.hasPassword && (
            <img
              src={lockIcon}
              alt="Locked"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          )}
        </div>
        <button
          className="hidden sm:block bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick(room.id);
          }}
        >
          Join
        </button>
      </li>
    </>
  );
}
