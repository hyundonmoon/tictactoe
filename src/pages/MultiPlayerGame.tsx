import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useParams } from 'react-router-dom';
import MultiplayerGameLoadingScreen from '../components/MultiplayerGame/LoadingScreen';
import RequestPassword from '../components/MultiplayerGame/RequestPassword';
import ErrorAlert from '../components/MultiplayerGame/ErrorAlert';

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
      socket?.on('roomJoined', handleRoomJoinedEvt);
      socket?.on('roomFull', handleRoomFullEvt);
      socket?.on('passwordRequired', handlePasswordRequired);
      socket?.on('roomNotFound', handleRoomNotFound);
      socket?.on('playerLeft', handlePlayerLeft);
      socket?.on('passwordWrong', handleWrongPassword);

      socket?.emit('joinRoom', gameRoomId);
    }

    return () => {
      socket?.off('roomJoined', handleRoomJoinedEvt);
      socket?.off('roomFull', handleRoomFullEvt);
      socket?.off('passwordRequired', handlePasswordRequired);
      socket?.off('roomNotFound', handleRoomNotFound);
      socket?.off('playerLeft', handlePlayerLeft);
      socket?.off('passwordWrong', handleWrongPassword);

      socket?.emit('leaveRoom', gameRoomId);
    };
  }, [socket, connected, gameRoomId]);

  if (!joined) {
    if (needsPassword) {
      return (
        <RequestPassword
          wrongPassword={wrongPassword}
          onSubmit={(password: string) => {
            if (connected) {
              socket?.emit('joinRoomWithPassword', gameRoomId, password);
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
