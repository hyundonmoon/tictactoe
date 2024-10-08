import { forwardRef, useState } from 'react';

interface CreateMultiplayerRoomProps {
  onSubmit: (name: string, password: string, isPrivate: boolean) => void;
}

export default forwardRef<HTMLDialogElement, CreateMultiplayerRoomProps>(
  function CreateMultiplayerRoom(
    { onSubmit }: CreateMultiplayerRoomProps,
    ref,
  ) {
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [makePrivate, setMakePrivate] = useState(false);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      onSubmit(roomName.trim(), password, makePrivate);
    };

    return (
      <dialog
        ref={ref}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12"
        onClose={() => {
          setRoomName('');
          setPassword('');
          setMakePrivate(false);
        }}
      >
        <header className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Create a room</h2>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label
              htmlFor="room-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Name
            </label>
            <input
              name="roomName"
              id="room-name"
              type="text"
              minLength={5}
              maxLength={50}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value ?? '');
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password (optional)
            </label>
            <input
              id="password"
              type="password"
              name="password"
              maxLength={10}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value?.trim() ?? password);
              }}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-medium">
              <input
                type="checkbox"
                name="private"
                checked={makePrivate}
                onChange={() => {
                  setMakePrivate((prev) => !prev);
                }}
                className="accent-blue-500 mr-2"
              />
              Make Private
            </label>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          "
              disabled={roomName.trim().length < 5}
            >
              Create
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
      </dialog>
    );
  },
);
