import { useEffect, useState } from 'react';
import {
  GAME_CLIENT_TO_SERVER,
  GAME_SERVER_TO_CLIENT,
} from '../constants/socket.constants';
import { useSocket } from '../contexts/SocketContext';
import { BoardState } from '../types/boardState.model';
import { GameAction, GameplayData, Player } from '../types/socket.model';

interface GamePending {
  status: 'pending';
}

interface GameInPlay {
  status: 'in-play';
  players: Player[];
  currentTurn: Player;
  board: BoardState;
}

interface GameAborted {
  status: 'aborted';
}

interface GameOver {
  status: 'over';
  isDraw: boolean;
  winner: Player | null;
}

type GameState = GamePending | GameInPlay | GameAborted | GameOver;

const initialGameState: GameState = {
  status: 'pending',
} as const;

export default function useMultiplayerGame(roomId: string) {
  const { socket, connected } = useSocket();
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const playAgain = () => {
    socket?.emit(
      GAME_CLIENT_TO_SERVER.PLAY_AGAIN,
      roomId,
      socket.id,
      localStorage.getItem('nickname') ?? 'You',
    );
  };

  const makeMove = (action: GameAction) => {
    if (socket && connected) {
      socket?.emit(GAME_SERVER_TO_CLIENT.ACTION, action);
    }
  };

  useEffect(() => {
    const handleGamePending = () => {
      setGameState({ status: 'pending' });
    };

    const handleGameStart = (gameState: GameplayData) => {
      setGameState({
        status: 'in-play',
        ...gameState,
      });
    };

    const handleGameAction = (gameState: GameplayData) => {
      setGameState({
        status: 'in-play',
        ...gameState,
      });
    };

    const handleGameOver = ({
      winner,
      isDraw,
    }: {
      winner: Player | null;
      isDraw: boolean;
    }) => {
      setGameState({
        status: 'over',
        isDraw,
        winner,
      });
    };

    const handleGameAbort = () => {
      setGameState({
        status: 'aborted',
      });
    };

    if (socket && connected) {
      socket?.on(GAME_SERVER_TO_CLIENT.PENDING, handleGamePending);
      socket?.on(GAME_SERVER_TO_CLIENT.START, handleGameStart);
      socket?.on(GAME_SERVER_TO_CLIENT.ACTION, handleGameAction);
      socket?.on(GAME_SERVER_TO_CLIENT.OVER, handleGameOver);
      socket?.on(GAME_SERVER_TO_CLIENT.ABORT, handleGameAbort);

      socket?.emit(
        GAME_CLIENT_TO_SERVER.JOIN,
        roomId,
        socket.id,
        localStorage.getItem('nickname') ?? 'You',
      );
    }

    return () => {
      socket?.off(GAME_SERVER_TO_CLIENT.PENDING, handleGamePending);
      socket?.off(GAME_SERVER_TO_CLIENT.START, handleGameStart);
      socket?.off(GAME_SERVER_TO_CLIENT.ACTION, handleGameAction);
      socket?.off(GAME_SERVER_TO_CLIENT.OVER, handleGameOver);
      socket?.off(GAME_SERVER_TO_CLIENT.ABORT, handleGameAbort);
    };
  }, [socket, connected, roomId]);

  return [gameState, makeMove, playAgain] as const;
}
