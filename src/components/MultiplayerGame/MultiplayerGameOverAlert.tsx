import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GAME_RESULTS from '../../constants/gameResult.constants';
import { useSocket } from '../../contexts/SocketContext';
import { GameResult } from '../../types/gameStats.model';
import { Player } from '../../types/socket.model';
import getGameOverGif from '../../utils/getGameOverGif';
import getGameOverMsg from '../../utils/getGameOverMsg';

interface MultiplayerGameOverModalProps {
  winner: Player | null;
  handleSubmit: () => void;
}

export default function MultiplayerGameOverAlert({
  winner,
  handleSubmit,
}: MultiplayerGameOverModalProps) {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [result, setResult] = useState<GameResult | null>();

  useEffect(() => {
    if (socket) {
      console.log({ winner, socket });
      if (winner === null) {
        setResult(GAME_RESULTS.DRAW);
      } else if (winner.id === socket?.id) {
        setResult(GAME_RESULTS.WIN);
      } else {
        setResult(GAME_RESULTS.LOSS);
      }
    }
  }, [winner, socket]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      {result && (
        <form
          className="bg-white rounded-lg shadow-lg p-6 w-96"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getGameOverMsg(result)}
          </h2>
          <img
            src={getGameOverGif(result)}
            alt={getGameOverMsg(result)}
            className="mx-auto my-4 w-full max-h-64 object-contain rounded aspect-square"
            width={256}
            height={256}
          />{' '}
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Play again
            </button>
            <button
              type="button"
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={() => {
                navigate('../lobby');
              }}
            >
              Leave Room
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
