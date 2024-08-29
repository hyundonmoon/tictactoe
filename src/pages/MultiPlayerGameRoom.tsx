import { useParams } from 'react-router-dom';
import ErrorAlert from '../components/MultiplayerGame/ErrorAlert';
import MultiplayerGameLoadingScreen from '../components/MultiplayerGame/LoadingScreen';
import MulitplayerGame from '../components/MultiplayerGame/MultiplayerGame';
import RequestPassword from '../components/MultiplayerGame/RequestPassword';
import useMultiplayerRoom from '../hooks/useMultiplayerRoom';

export default function MultiplayerGameRoom() {
  const { gameRoomId } = useParams();
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
        <MultiplayerGameLoadingScreen
          intervalMessages={[
            'Joining room.',
            'Joining room..',
            'Joining room...',
          ]}
        />
      </div>
    );
  }

  return <MulitplayerGame roomId={gameRoomId ?? ''} />;
}
