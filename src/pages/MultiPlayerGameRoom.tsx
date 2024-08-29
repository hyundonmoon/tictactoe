import { useParams } from 'react-router-dom';
import ErrorAlert from '../components/MultiplayerGame/ErrorAlert';
import Game from '../components/MultiplayerGame/Game';
import MultiplayerGameLoadingScreen from '../components/MultiplayerGame/LoadingScreen';
import RequestPassword from '../components/MultiplayerGame/RequestPassword';
import { useSocket } from '../contexts/SocketContext';
import useMultiplayerRoom from '../hooks/useMultiplayerRoom';

export default function MultiplayerGameRoom() {
  const { gameRoomId } = useParams();
  const { socket } = useSocket();
  const [{ joined, passwordRequired, rejected }, submitPassword] =
    useMultiplayerRoom(gameRoomId);

  if (!joined) {
    if (passwordRequired) {
      return (
        <RequestPassword
          wrongPassword={rejected === 'wrong password'}
          onSubmit={submitPassword}
        />
      );
    }

    if (rejected === 'full') {
      return (
        <ErrorAlert
          title="Room Full"
          message="The room you are trying to join is already full. Please select a different room or create a new one."
        />
      );
    }

    if (rejected === 'not found') {
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

  return <Game roomId={gameRoomId ?? ''} myId={socket?.id ?? ''} />;
}
