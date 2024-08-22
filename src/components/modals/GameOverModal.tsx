import { useEffect, useRef, useState } from 'react';
import getGameOverMsg from '../../utils/getGameOverMsg';
import GAME_RESULTS from '../../constants/gameResult.constants';

import { GameResult } from '../../types/gameStats.model';
import getGameOverGif from '../../utils/getGameOverGif';

export default function GameOverModal({
  isGameOver,
  winner,
  currentPlayer,
  onClose,
}: {
  isGameOver: boolean;
  winner: 'O' | 'X' | '';
  currentPlayer: 'O' | 'X';
  onClose: () => void;
}) {
  const [result, setResult] = useState<GameResult | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleClose = () => {
    onClose();
    setResult(null);
  };

  useEffect(() => {
    if (isGameOver) {
      if (winner === '') {
        setResult(GAME_RESULTS.DRAW);
      } else if (winner === currentPlayer) {
        setResult(GAME_RESULTS.WIN);
      } else {
        setResult(GAME_RESULTS.LOSS);
      }

      modalRef.current?.showModal();
    } else {
      setResult(null);
      modalRef.current?.close();
    }
  }, [isGameOver, winner, currentPlayer]);

  return (
    <dialog
      ref={modalRef}
      onClose={handleClose}
      className="text-center w-10/12 max-w-lg p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      {result && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getGameOverMsg(result)}
          </h2>
          <img
            src={getGameOverGif(result)}
            alt={getGameOverMsg(result)}
            className="mx-auto my-4 w-full max-h-64 object-contain rounded aspect-square"
            width={256}
            height={256}
          />
          <button
            onClick={handleClose}
            className="mt-4 bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600
 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Play again
          </button>
        </>
      )}
    </dialog>
  );
}
