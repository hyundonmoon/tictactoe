import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useParams } from 'react-router-dom';
import MultiplayerGameLoadingScreen from '../components/MultiplayerGame/LoadingScreen';
import RequestPassword from '../components/MultiplayerGame/RequestPassword';
import ErrorAlert from '../components/MultiplayerGame/ErrorAlert';
import {
  ROOM_CLIENT_TO_SERVER,
  ROOM_SERVER_TO_CLIENT,
} from '../constants/socket.constants';

export default function MultiplayerGame() {
  const { gameRoomId } = useParams();
  const { socket, connected } = useSocket();
  const [joined, setJoined] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [roomFull, setRoomFull] = useState(false);
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    const handleRoomJoinedEvt = ({ roomId }: { roomId: string }) => {
      if (roomId === gameRoomId) {
        setTimeout(() => {
          setJoined(true);
        }, 3000);
      }
    };
    const handleRoomFullEvt = () => {
      setRoomFull(true);
    };
    const handlePasswordRequired = () => {
      setNeedsPassword(true);
    };
    const handleRoomNotFound = () => {
      setRoomNotFound(true);
    };
    const handlePlayerLeft = ({ playerId }: { playerId: string }) => {
      // TODO: handle opponent leaving room
      console.log('player left', playerId);
    };
    const handleWrongPassword = () => {
      setWrongPassword(true);
    };

    if (connected) {
      socket?.on(ROOM_SERVER_TO_CLIENT.JOINED, handleRoomJoinedEvt);
      socket?.on(ROOM_SERVER_TO_CLIENT.FULL, handleRoomFullEvt);
      socket?.on(
        ROOM_SERVER_TO_CLIENT.PASSWORD_REQUIRED,
        handlePasswordRequired,
      );
      socket?.on(ROOM_SERVER_TO_CLIENT.NOT_FOUND, handleRoomNotFound);
      socket?.on(ROOM_SERVER_TO_CLIENT.PLAYER_LEFT, handlePlayerLeft);
      socket?.on(ROOM_SERVER_TO_CLIENT.WRONG_PASSWORD, handleWrongPassword);

      socket?.emit('joinRoom', gameRoomId);
    }

    return () => {
      socket?.off(ROOM_SERVER_TO_CLIENT.JOINED, handleRoomJoinedEvt);
      socket?.off(ROOM_SERVER_TO_CLIENT.FULL, handleRoomFullEvt);
      socket?.off(
        ROOM_SERVER_TO_CLIENT.PASSWORD_REQUIRED,
        handlePasswordRequired,
      );
      socket?.off(ROOM_SERVER_TO_CLIENT.NOT_FOUND, handleRoomNotFound);
      socket?.off(ROOM_SERVER_TO_CLIENT.PLAYER_LEFT, handlePlayerLeft);
      socket?.off(ROOM_SERVER_TO_CLIENT.WRONG_PASSWORD, handleWrongPassword);

      socket?.emit(ROOM_CLIENT_TO_SERVER.LEAVE, gameRoomId);
    };
  }, [socket, connected, gameRoomId]);

  if (!joined) {
    if (needsPassword) {
      return (
        <RequestPassword
          wrongPassword={wrongPassword}
          onSubmit={(password: string) => {
            if (connected) {
              socket?.emit(
                ROOM_CLIENT_TO_SERVER.JOIN_PASSWORD,
                gameRoomId,
                password,
              );
            }
          }}
        />
      );
    }

    if (roomFull) {
      return (
        <ErrorAlert
          title="Room Full"
          message="The room you are trying to join is already full. Please select a different room or create a new one."
        />
      );
    }

    if (roomNotFound) {
      return (
        <ErrorAlert
          title="Room Not Found"
          message="The room you are trying to join doesn't exist. Please select a different room or create a new one."
        />
      );
    }

    return (
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <MultiplayerGameLoadingScreen />
      </div>
    );
  }

  return (
    <>
      <div>Game screen</div>
    </>
  );
}
