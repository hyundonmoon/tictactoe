import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import SinglePlayerGame from './pages/SinglePlayerGame.tsx';
import MultiplayerLobby from './pages/MultiplayerLobby.tsx';
import MultiplayerLayout from './layouts/MultiplayerLayout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MultiplayerGame from './pages/MultiPlayerGame.tsx';

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
        element: <MultiplayerGame />,
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
