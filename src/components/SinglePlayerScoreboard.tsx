import { GameStats } from '../types/gameStats.model';

export default function SinglePlayerScoreboard({
  stats,
}: {
  stats: GameStats;
}) {
  return (
    <div className="flex justify-center items-center gap-8 font-bold text-gray-800 text-xl shadow-sm">
      <p className="tracking-widest">YOU</p>
      <div className="flex-1 bg-gray-50 px-4 py-2 shadow-md rounded-3xl">
        {stats.wins + stats.draws} - {stats.losses + stats.draws}
      </div>
      <p className="tracking-widest">AI</p>
    </div>
  );
}
