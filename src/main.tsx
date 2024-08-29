import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MultiplayerLayout from './layouts/MultiplayerLayout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import MultiplayerGameRoom from './pages/MultiPlayerGameRoom.tsx';
import MultiplayerLobby from './pages/MultiplayerLobby.tsx';
import SinglePlayerGame from './pages/SinglePlayerGame.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'single-player',
    element: <SinglePlayerGame />,
  },
  {
    path: 'multi-player',
    element: <MultiplayerLayout />, // provides Socket
    children: [
      {
        path: 'lobby',
        element: <MultiplayerLobby />,
      },
      {
        path: 'play/:gameRoomId',
        element: <MultiplayerGameRoom />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
