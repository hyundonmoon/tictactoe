import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import SinglePlayerGame from './pages/SinglePlayerGame.tsx';
import MultiplayerLobby from './pages/MultiplayerLobby.tsx';

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
    path: 'multi-player-lobby',
    element: <MultiplayerLobby />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
