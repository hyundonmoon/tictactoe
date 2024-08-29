import { useEffect, useReducer } from 'react';
import {
  ROOM_CLIENT_TO_SERVER,
  ROOM_SERVER_TO_CLIENT,
} from '../constants/socket.constants';
import { useSocket } from '../contexts/SocketContext';

interface MultiplayerRoomState {
  joined: boolean;
  passwordRequired?: boolean;
  rejected?: 'full' | 'wrong password' | 'not found';
}

type Action =
  | { type: 'success' }
  | { type: 'passwordRequired' }
  | { type: 'rejected'; reason: 'full' | 'wrong password' | 'not found' };

function multiplayerRoomReducer(
  state: MultiplayerRoomState,
  action: Action,
): MultiplayerRoomState {
  switch (action.type) {
    case 'success':
      return { joined: true };
    case 'passwordRequired':
      return {
        joined: false,
        passwordRequired: true,
      };
    case 'rejected':
      if (action.reason === 'wrong password') {
        return {
          joined: false,
          passwordRequired: true,
          rejected: action.reason,
        };
      }

      return {
        joined: false,
        rejected: action.reason,
      };
    default:
      return state;
  }
}

const INIT_STATE: MultiplayerRoomState = {
  joined: false,
};

export default function useMultiplayerRoom(gameRoomId: string | undefined) {
  const { socket, connected } = useSocket();
  const [state, dispatch] = useReducer(multiplayerRoomReducer, INIT_STATE);

  const handleRoomJoined = () => {
    dispatch({ type: 'success' });
  };

  const handleRoomFullError = () => {
    dispatch({ type: 'rejected', reason: 'full' });
  };

  const handleRoomNotFoundError = () => {
    dispatch({ type: 'rejected', reason: 'not found' });
  };

  const handlePasswordError = () => {
    dispatch({ type: 'rejected', reason: 'wrong password' });
  };

  const handlePasswordRequired = () => {
    dispatch({ type: 'passwordRequired' });
  };

  const submitPassword = (password: string) => {
    if (connected) {
      socket?.emit(ROOM_CLIENT_TO_SERVER.JOIN_PASSWORD, gameRoomId, password);
    }
  };

  useEffect(() => {
    if (connected && gameRoomId) {
      socket?.on(ROOM_SERVER_TO_CLIENT.JOINED, handleRoomJoined);
      socket?.on(ROOM_SERVER_TO_CLIENT.FULL, handleRoomFullError);
      socket?.on(
        ROOM_SERVER_TO_CLIENT.PASSWORD_REQUIRED,
        handlePasswordRequired,
      );
      socket?.on(ROOM_SERVER_TO_CLIENT.NOT_FOUND, handleRoomNotFoundError);
      socket?.on(ROOM_SERVER_TO_CLIENT.WRONG_PASSWORD, handlePasswordError);

      socket?.emit(ROOM_CLIENT_TO_SERVER.JOIN, gameRoomId);
    }

    return () => {
      socket?.off(ROOM_SERVER_TO_CLIENT.JOINED, handleRoomJoined);
      socket?.off(ROOM_SERVER_TO_CLIENT.FULL, handleRoomFullError);
      socket?.off(
        ROOM_SERVER_TO_CLIENT.PASSWORD_REQUIRED,
        handlePasswordRequired,
      );
      socket?.off(ROOM_SERVER_TO_CLIENT.NOT_FOUND, handleRoomNotFoundError);
      socket?.off(ROOM_SERVER_TO_CLIENT.WRONG_PASSWORD, handlePasswordError);
    };
  }, [gameRoomId, socket, connected]);

  useEffect(() => {
    return () => {
      socket?.emit(ROOM_CLIENT_TO_SERVER.LEAVE, gameRoomId);
    };
  }, []);

  return [state, submitPassword] as const;
}
