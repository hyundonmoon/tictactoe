import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default forwardRef<HTMLDialogElement>(function JoinRoomModal(_, ref) {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  return (
    <dialog
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12"
      ref={ref}
      onClose={() => {
        setRoomId('');
      }}
    >
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Join a room</h2>
      </header>
      <div>
        <form
          className="space-y-4"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();

            if (roomId.length) {
              navigate(`../play/${roomId}`);
            }
          }}
        >
          <div>
            <label
              htmlFor="room-id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room ID
            </label>
            <input
              name="roomId"
              id="room-id"
              type="text"
              minLength={36}
              maxLength={36}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value?.trim() ?? roomId);
              }}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
              disabled={roomId.length !== 36}
            >
              Join
            </button>

            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
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
      </div>
    </dialog>
  );
});
