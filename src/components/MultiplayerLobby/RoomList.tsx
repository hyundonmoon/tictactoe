import { Room } from '../../types/socket.model';
import RoomItem from './RoomItem';

interface RoomListProps {
  rooms: Room[];
  handleClick: (id: string) => void;
}

export default function RoomList({ rooms, handleClick }: RoomListProps) {
  if (!rooms?.length) {
    return (
      <div className="flex-1 flex justify-center items-center text-gray-500 text-sm md:text-base">
        No rooms available.
      </div>
    );
  }

  return (
    <ul className="flex-1 space-y-4 overflow-y-scroll bg-gray-200 p-3 sm:p-4 rounded-lg shadow-inner">
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} handleClick={handleClick} />
      ))}
    </ul>
  );
}
