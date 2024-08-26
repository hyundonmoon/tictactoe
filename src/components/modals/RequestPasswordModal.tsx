import { useState } from 'react';

interface RequestPasswordModalProps {
  onClose: (password: string) => void;
  onSubmit: (password: string) => void;
}

export default function RequestPasswordModal({
  onClose,
}: RequestPasswordModalProps) {
  const [password, setPassword] = useState('');

  return (
    <dialog
      onClose={() => {
        onClose(password);
      }}
    >
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
          disabled={roomName.length < 5}
        >
          Create
        </button>
      </div>
    </dialog>
  );
}
