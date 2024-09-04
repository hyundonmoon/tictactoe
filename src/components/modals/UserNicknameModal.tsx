import React, { forwardRef, useEffect, useState } from 'react';

interface UserNicknameModalProps {
  onSubmit?: () => void;
  disableIfNotChanged: boolean;
}

export default forwardRef<HTMLDialogElement, UserNicknameModalProps>(
  function UserNicknameModal(
    { onSubmit, disableIfNotChanged }: UserNicknameModalProps,
    ref,
  ) {
    const [nickname, setNickname] = useState('');
    const [prevNickname, setPrevNickname] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (nickname) {
        localStorage.setItem('nickname', nickname);
      }

      if (onSubmit) {
        onSubmit();
      }
    };

    useEffect(() => {
      if (localStorage.getItem('nickname')) {
        setNickname(localStorage.getItem('nickname') ?? '');
        setPrevNickname(localStorage.getItem('nickname') ?? '');
      }
    }, []);

    return (
      <dialog
        ref={ref}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12"
      >
        <header className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Enter your nickname
          </h2>
        </header>

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
              setNickname(e.target.value?.trim());
            }}
          />

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
            "
              disabled={
                nickname === '' ||
                (disableIfNotChanged && prevNickname === nickname)
              }
            >
              Confirm
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
              onClick={() => {
                if (typeof ref !== 'function') {
                  ref?.current?.close();
                }
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  },
);
