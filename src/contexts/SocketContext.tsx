import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<{
  socket: Socket | null;
  connected: boolean;
}>({ socket: null, connected: false });
const URL = import.meta.env.VITE_API_URL;

export function SocketProvider({ children }: { children: ReactNode }) {
  const socket = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const value = useMemo(() => {
    return {
      socket: socket.current,
      connected: connected,
    };
  }, [socket, connected]);

  useEffect(() => {
    if (socket.current === null) {
      socket.current = io(URL);
      console.log('new socket!!', socket.current);

      socket.current.on('connect', () => {
        console.log('socket connected!');
        setConnected(true);
      });
    }

    return () => {
      if (socket?.current?.connected) {
        socket?.current?.disconnect();
        socket.current = null;
        setConnected(false);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
