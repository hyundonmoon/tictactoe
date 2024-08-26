import { useEffect, useState } from 'react';

export default function MultiplayerGameLoadingScreen() {
  const [loadingMessage, setLoadingMessage] = useState('Joining room.');

  useEffect(() => {
    const messages = ['Joining room.', 'Joining room..', 'Joining room...'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingMessage(messages[index]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-80  bg-gray-100 p-8 rounded-lg shadow-lg">
      <p className="text-gray-700 text-center">{loadingMessage}</p>
    </div>
  );
}
