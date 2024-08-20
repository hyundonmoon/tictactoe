import { useEffect, useRef } from 'react';

export default function ResetConfirmModal({
  isResetConfirmModalOpen,
  reset,
  closeModal,
}: {
  isResetConfirmModalOpen: boolean;
  reset: () => void;
  closeModal: () => void;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isResetConfirmModalOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isResetConfirmModalOpen]);

  return (
    <dialog
      ref={ref}
      className="text-center w-10/12 max-w-lg p-6 bg-white rounded-xl shadow-lg border border-gray-200"
      onClose={closeModal}
    >
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to reset the game?
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
          onClick={() => {
            reset();
            closeModal();
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </dialog>
  );
}
