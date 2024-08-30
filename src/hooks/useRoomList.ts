import { useQuery } from '@tanstack/react-query';
import { Room } from '../types/socket.model';

const API_URL = import.meta.env.VITE_API_URL;

export default function useRoomList(filter: 'waiting' | 'all' = 'all') {
  return useQuery({
    queryKey: ['room-list', filter],
    queryFn: async (): Promise<Room[]> => {
      const res = await fetch(`${API_URL}/rooms?filter=${filter}`);

      if (!res.ok) {
        throw new Error('error fetching room list');
      }

      return res.json();
    },
  });
}
