import { useState } from 'react';
import { ModeSelector, type Mode } from '../components/ModeSelector';
import SetupMode from '../components/SetupMode';
import GameMode from '../components/GameMode';

const ControlPlane = () => {
  const [currentMode, setCurrentMode] = useState<Mode>('setup');

  return (
    <div>
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
