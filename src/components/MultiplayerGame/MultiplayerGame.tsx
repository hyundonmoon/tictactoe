import { useSocket } from '../../contexts/SocketContext';
import useMultiplayerGame from '../../hooks/useMultiplayerGame';
import AbortAlert from './AbortAlert';
import MultiplayerGameLoadingScreen from './LoadingScreen';
import MultiplayerBoard from './MultiplayerBoard';
import MultiplayerGameOverAlert from './MultiplayerGameOverAlert';

interface GameProps {
  roomId: string;
}

export default function MulitplayerGame({ roomId }: GameProps) {
  const { socket } = useSocket();
  const [gameState, makeMove, playAgain] = useMultiplayerGame(roomId);

  if (gameState.status === 'aborted') {
    return (
      <AbortAlert
        handleSubmit={() => {
          playAgain();
        }}
      />
    );
  }

  if (gameState.status === 'over') {
    return (
      <MultiplayerGameOverAlert
        winner={gameState.winner}
        handleSubmit={() => {
          playAgain();
        }}
      />
    );
  }

  if (gameState.status === 'pending') {
    return (
      <div className="h-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
        <MultiplayerGameLoadingScreen
          intervalMessages={[
            'Waiting for opponent.',
            'Waiting for opponent..',
            'Waiting for opponent...',
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <div className="flex justify-center gap-4 mb-4">
          {gameState.players.map((player, idx) => {
            const isCurrentTurn = player.id === gameState.currentTurn?.id;
            const isMe = player.id === socket?.id;

            return (
              <div
                key={player.id}
                className={`${idx === 0 ? 'text-right' : 'text-left'}`}
              >
                <p
                  className={`text-lg font-semibold mb-1 transition-all duration-300 truncate max-w-[80px] sm:max-w-[160px] md:max-w-[240px] lg:max-w-[320px]
                ${isCurrentTurn ? 'text-blue-600' : 'text-gray-800'}
              `}
                >
                  {player.name}
                </p>

                <p
                  className={`text-3xl font-bold transition-all duration-300
                ${isCurrentTurn ? 'text-blue-500' : 'text-gray-600'}
              `}
                >
                  {player.symbol}
                </p>
                {isCurrentTurn && (
                  <p className="mt-2 text-sm font-medium text-blue-500">
                    {isMe ? 'Your turn!' : "Opponent's turn"}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <MultiplayerBoard
          boardState={gameState.board}
          currentTurn={gameState.currentTurn}
          players={gameState.players}
          handleClick={makeMove}
          roomId={roomId}
        />
      </div>
    </>
  );
}
