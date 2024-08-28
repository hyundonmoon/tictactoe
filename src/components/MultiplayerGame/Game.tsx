import useMultiplayerGameState from '../../hooks/useMultiplayerGameState';
import AbortAlert from './AbortAlert';
import MultiplayerBoard from './MultiplayerBoard';
import MultiplayerGameOverModal from './MultiplayerGameOverModal';

interface GameProps {
  roomId: string;
  myId: string;
}

export default function Game({ roomId, myId }: GameProps) {
  const {
    boardState,
    isGameOver,
    winner,
    currentTurn,
    playAgain,
    isGameStarted,
    players,
    myPlayer,
    makeMove,
    isAborted,
  } = useMultiplayerGameState(roomId, myId);

  if (isAborted) {
    return (
      <AbortAlert
        handleSubmit={() => {
          playAgain();
        }}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <div className="flex justify-center gap-4 mb-4">
          {players.map((player, idx) => {
            const isCurrentTurn = player.id === currentTurn?.id;
            const isMe = player.id === myId;

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
          boardState={boardState}
          isGameStarted={isGameStarted}
          isGameOver={isGameOver}
          myPlayer={myPlayer}
          currentTurn={currentTurn}
          handleClick={makeMove}
          roomId={roomId}
        />
      </div>

      <MultiplayerGameOverModal
        isOpen={isGameOver}
        isGameOver={isGameOver}
        winner={winner}
        myPlayer={myPlayer}
        handleSubmit={() => {
          playAgain();
        }}
      />
    </>
  );
}
