import { useState } from 'react';
import { ModeSelector, type Mode } from '../components/ModeSelector';
import SetupMode from '../components/SetupMode';
import GameMode from '../components/GameMode';
import { useGameData, normalizeGameData } from '../state/GameDataContext';

const STORAGE_KEY = 'jeopardy-game-data';

const ControlPlane = () => {
  const [currentMode, setCurrentMode] = useState<Mode>('setup');
  const { data, replaceAll } = useGameData();

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save data', e);
      alert('Failed to save to localStorage.');
    }
  };

  const handleLoad = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        alert('No saved data found.');
        return;
      }
      const parsed = JSON.parse(raw);
      replaceAll(normalizeGameData(parsed));
    } catch (e) {
      console.error('Failed to load data', e);
      alert('Failed to load from localStorage.');
    }
  };

  return (
    <div>
      {/* Top-right save/load controls */}
      <div className="flex justify-end mt-4 pr-2">
        <div className="flex items-center gap-2">
          <button onClick={handleLoad} className="cursor-pointer px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Load</button>
          <button onClick={handleSave} className="cursor-pointer px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Save</button>
        </div>
      </div>

      <ModeSelector 
        currentMode={currentMode} 
        onModeChange={setCurrentMode} 
      />

      {/* Content based on current mode */}
      <div className="mt-8">
        {currentMode === 'setup' && <SetupMode />}
        {currentMode === 'game' && <GameMode />}
      </div>
    </div>
  );
};

export default ControlPlane;
