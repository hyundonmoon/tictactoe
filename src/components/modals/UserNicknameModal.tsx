import React, { useEffect, useRef, useState } from 'react';

export default function UserNicknameModal({
  isOpen,
  closeModal,
  onSubmit,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (nickname: string) => void;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname) {
      onSubmit(nickname);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('nickname')) {
      setNickname(localStorage.getItem('nickname') ?? '');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="p-6 rounded-lg shadow-lg bg-white text-center max-w-md w-11/12"
      onClose={() => {
        closeModal();
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">Enter Your Nickname</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your nickname"
          autoFocus
          required
          className="p-2 border border-gray-300 rounded w-full mb-4"
          minLength={3}
          maxLength={20}
          value={nickname}
          onChange={(e) => {
            console.log(e.target.value);
            setNickname(e.target.value?.trim());
          }}
        />
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
            "
            disabled={nickname === ''}
          >
            Confirm
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
