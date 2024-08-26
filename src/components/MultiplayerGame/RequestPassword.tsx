import { useState } from 'react';

interface RequestPasswordProps {
  onSubmit: (password: string) => void;
  wrongPassword: boolean;
}

export default function RequestPassword({
  onSubmit,
  wrongPassword,
}: RequestPasswordProps) {
  const [password, setPassword] = useState('');
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        <header className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Enter Room Password
          </h2>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (password) {
              onSubmit(password);
            }
          }}
        >
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {wrongPassword && (
              <p className="text-red-500 mt-2">
                Incorrect password, please try again.
              </p>
            )}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              disabled={password.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
