export type Mode = 'setup' | 'game';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1">
        <button
          onClick={() => onModeChange('setup')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            currentMode === 'setup'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Setup
        </button>
        <button
          onClick={() => onModeChange('game')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            currentMode === 'game'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Game
        </button>
      </div>
    </div>
  );
};

export { ModeSelector };
