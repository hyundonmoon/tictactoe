import { useEffect, useState } from 'react';

interface MultiplayerGameLoadingScreenProps {
  prevMessages?: string[];
  intervalMessages: string[];
  note?: string;
}

export default function MultiplayerGameLoadingScreen({
  prevMessages,
  intervalMessages,
  note,
}: MultiplayerGameLoadingScreenProps) {
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    setLoadingMessage(intervalMessages[0]);

    if (intervalMessages.length > 1) {
      interval = setInterval(() => {
        index = (index + 1) % intervalMessages.length;
        setLoadingMessage(intervalMessages[index]);
      }, 700);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [intervalMessages]);

  return (
    <div className="w-full max-w-80 bg-gray-100 p-8 rounded-lg shadow-lg text-gray-700 space-y-1">
      {prevMessages &&
        prevMessages.map((msg, idx) => <p key={`${msg}${idx}`}>{msg}</p>)}
      <p>{loadingMessage}</p>
      {note && <p className="text-gray-500 italic text-sm">{note}</p>}
    </div>
  );
}
