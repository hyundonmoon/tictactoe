import { useEffect, useState } from 'react';
import {
  GAME_CLIENT_TO_SERVER,
  GAME_SERVER_TO_CLIENT,
} from '../constants/socket.constants';
import { useSocket } from '../contexts/SocketContext';
import { BoardState } from '../types/boardState.model';
import { GameAction, GameplayData, Player } from '../types/socket.model';

export default function useMultiplayerGameState(roomId: string, myId: string) {
  const { socket, connected } = useSocket();
  const [boardState, setBoardState] = useState(
    Array.from({ length: 9 }).fill('') as BoardState,
  );
  const [currentTurn, setCurrentTurn] = useState<Player | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<
    { id: string; symbol: 'O' | 'X'; name: string }[]
  >([]);
  const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [isAborted, setAborted] = useState(false);

  const playAgain = () => {
    socket?.emit('GAME::PLAY_AGAIN');
  };

  const makeMove = (action: GameAction) => {
    if (socket && connected) {
      socket?.emit(GAME_SERVER_TO_CLIENT.ACTION, action);
    }
  };

  useEffect(() => {
    const handleGameStart = ({
      isStarted,
      isFinished,
      isAborted,
      isDraw,
      winner,
      board,
      players,
      currentTurn,
    }: GameplayData) => {
      setBoardState(board);
      setCurrentTurn(currentTurn);
      setPlayers(players);
      setWinner(winner);
      setIsGameOver(isFinished);
      setIsDraw(isDraw);
      setGameStarted(isStarted);
      setAborted(isAborted);

      const me = players.find((player) => player.id === myId);

      if (me && isStarted) {
        setMyPlayer(me);
        setGameStarted(true);
      }
    };

    const handleGameAction = ({
      isStarted,
      isFinished,
      isDraw,
      winner,
      board,
      players,
      currentTurn,
    }: GameplayData) => {
      setBoardState(board);
      setCurrentTurn(currentTurn);
      setPlayers(players);
      setWinner(winner);
      setIsGameOver(isFinished);
      setIsDraw(isDraw);
      setGameStarted(isStarted);
    };

    const handleGameOver = (winner: Player | null) => {
      console.log('game over!', winner);
      setIsGameOver(true);
      setWinner(winner);
    };

    const handleGameAbort = ({ isAborted }: GameplayData) => {
      setAborted(isAborted);
    };

    if (socket && connected) {
      socket?.on(GAME_SERVER_TO_CLIENT.START, handleGameStart);
      socket?.on(GAME_SERVER_TO_CLIENT.ACTION, handleGameAction);
      socket?.on(GAME_SERVER_TO_CLIENT.OVER, handleGameOver);
      socket?.on(GAME_SERVER_TO_CLIENT.ABORT, handleGameAbort);

      socket?.emit(
        GAME_CLIENT_TO_SERVER.READY,
        roomId,
        socket.id,
        localStorage.getItem('nickname') ?? '',
      );
    }

    return () => {
      socket?.off(GAME_SERVER_TO_CLIENT.START, handleGameStart);
      socket?.off(GAME_SERVER_TO_CLIENT.ACTION, handleGameAction);
      socket?.off(GAME_SERVER_TO_CLIENT.OVER, handleGameOver);
      socket?.off(GAME_SERVER_TO_CLIENT.ABORT, handleGameAbort);
    };
  }, [socket, connected, roomId, myId]);

  return {
    boardState,
    isGameOver,
    winner,
    isDraw,
    currentTurn,
    playAgain,
    isGameStarted,
    players,
    myPlayer,
    makeMove,
    isAborted,
  };
}
