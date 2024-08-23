import { useState } from 'react';
import UserNicknameModal from '../components/modals/UserNicknameModal';

export default function MultiplayerLobby() {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);

  return (
    <>
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <div className="flex flex-col w-full max-w-4xl h-full max-h-[700px] bg-gray-100 p-8 rounded-lg shadow-lg overflow-hidden">
          <header className="mb-6">
            <h1 className="text-2xl text-gray-900 font-bold">
              Find & Join a Game
            </h1>
          </header>

          <div className="min-h-0 flex flex-col md:flex-row gap-6 flex-1">
            <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                  Room List
                </h2>
                <button className="text-sm hover:font-bold">Refresh</button>
              </div>

              <div className="flex-1 space-y-4 overflow-scroll">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 1</h3>
                  <p className="text-sm text-gray-600">Details about Room 1</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700">Room 2</h3>
                  <p className="text-sm text-gray-600">Details about Room 2</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col gap-4 h-full">
                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300">
                  Create a room
                </button>
                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300">
                  Join a room
                </button>
                <div className="flex-1 hidden md:block"></div>
                <button
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
                  onClick={() => {
                    setIsNicknameModalOpen(true);
                  }}
                >
                  Change nickname
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserNicknameModal
        isOpen={isNicknameModalOpen}
        closeModal={() => {
          setIsNicknameModalOpen(false);
        }}
        onSubmit={(nickname) => {
          localStorage.setItem('nickname', nickname);
          setIsNicknameModalOpen(false);
        }}
      />
    </>
  );
}
