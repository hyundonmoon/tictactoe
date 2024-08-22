import { useEffect, useRef } from 'react';

export default function GoBackConfirmModal({
  isOpen,
  closeModal,
  onConfirm,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen, ref.current]);

  return (
    <dialog
      ref={ref}
      className="text-center w-10/12 max-w-lg p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4">
        Are you sure you want to go back to the main page?
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
          onClick={() => {
            closeModal();
            onConfirm();
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
