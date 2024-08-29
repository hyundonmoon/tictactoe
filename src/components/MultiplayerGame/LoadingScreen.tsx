import { useEffect, useState } from 'react';

interface MultiplayerGameLoadingScreenProps {
  prevMessages?: string[];
  intervalMessages: string[];
}

export default function MultiplayerGameLoadingScreen({
  prevMessages,
  intervalMessages,
}: MultiplayerGameLoadingScreenProps) {
  const [loadingMessage, setLoadingMessage] = useState('Joining room.');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % intervalMessages.length;
      setLoadingMessage(intervalMessages[index]);
    }, 700);

    return () => clearInterval(interval);
  }, [intervalMessages]);

  return (
    <div className="w-full max-w-80  bg-gray-100 p-8 rounded-lg shadow-lg text-gray-700 space-y-1">
      {prevMessages &&
        prevMessages.map((msg, idx) => (
          <p className="" key={`${msg}${idx}`}>
            {msg}
          </p>
        ))}
      <p>{loadingMessage}</p>
    </div>
  );
}
