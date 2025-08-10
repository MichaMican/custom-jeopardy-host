import { useGameData } from "../state/GameDataContext";

const PlayersSetup = () => {
  const { data, addPlayer, updatePlayer, removePlayer } = useGameData();

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Players</h3>
        <button
          onClick={addPlayer}
          className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <span className="text-lg leading-none">＋</span>
          Add Player
        </button>
      </div>

      {data.players.length === 0 ? (
        <p className="text-gray-600">
          No players yet. Click "Add Player" to create one.
        </p>
      ) : (
        <ul className="space-y-3">
          {data.players.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <input
                type="color"
                value={p.color}
                onChange={(e) => updatePlayer(p.id, { color: e.target.value })}
                className="h-9 w-9 rounded cursor-pointer border border-gray-300"
                title="Player color"
              />
              <input
                value={p.name}
                onChange={(e) => updatePlayer(p.id, { name: e.target.value })}
                placeholder="Player name"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removePlayer(p.id)}
                className="cursor-pointer px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                title="Remove player"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayersSetup;
