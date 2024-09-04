import React, { forwardRef, useEffect, useState } from 'react';

export default forwardRef<HTMLDialogElement>(
  function UserNicknameModal(_, ref) {
    const [nickname, setNickname] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (nickname) {
        localStorage.setItem('nickname', nickname);
      }
    };

    useEffect(() => {
      if (localStorage.getItem('nickname')) {
        setNickname(localStorage.getItem('nickname') ?? '');
      }
    }, []);

    return (
      <dialog
        ref={ref}
        className="p-6 rounded-lg shadow-lg bg-white text-center max-w-md w-11/12"
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
