import { Outlet } from 'react-router-dom';
import { SocketProvider } from '../contexts/SocketContext';

export default function MultiplayerLayout() {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}
