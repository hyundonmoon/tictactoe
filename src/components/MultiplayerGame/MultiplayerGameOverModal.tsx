import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GAME_RESULTS from '../../constants/gameResult.constants';
import { GameResult } from '../../types/gameStats.model';
import { Player } from '../../types/socket.model';
import getGameOverGif from '../../utils/getGameOverGif';
import getGameOverMsg from '../../utils/getGameOverMsg';

interface MultiplayerGameOverModalProps {
  isOpen: boolean;
  isGameOver: boolean; // same value as isOpen, included just for clarity
  winner: Player | null;
  myPlayer: Player | null;
  handleSubmit: () => void;
}

export default function MultiplayerGameOverModal({
  isOpen,
  isGameOver,
  winner,
  myPlayer,
  handleSubmit,
}: MultiplayerGameOverModalProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement | null>(null);
  const [shouldNavigate, setShouldNavigate] = useState(true);
  const [result, setResult] = useState<GameResult | null>();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    }
  }, [ref.current, isOpen]);

  useEffect(() => {
    if (isGameOver && myPlayer !== null) {
      if (winner === null) {
        setResult(GAME_RESULTS.DRAW);
      } else if (winner.id === myPlayer?.id) {
        setResult(GAME_RESULTS.WIN);
      } else {
        setResult(GAME_RESULTS.LOSS);
      }
    } else {
      setResult(null);
    }
  }, [isGameOver, winner, myPlayer]);

  return (
    <dialog
      ref={ref}
      className="text-center w-10/12 max-w-lg p-6 bg-white rounded-xl shadow-lg border border-gray-200"
      onClose={() => {
        if (shouldNavigate) {
          navigate('../lobby');
        }
      }}
    >
      {result && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShouldNavigate(false);
            handleSubmit();
            ref.current?.close();
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
                ref?.current?.close();
              }}
            >
              Leave Room
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
