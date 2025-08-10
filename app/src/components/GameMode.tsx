const GameMode = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Control</h2>
        <p className="text-gray-600">Control the game flow and manage the current round</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Question</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 text-center">No active question</p>
              {/* Current question content will go here */}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Board</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600 text-center">Game board preview</p>
              {/* Game board preview will go here */}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Scores</h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-center">No teams configured</p>
              {/* Team scores will go here */}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Controls</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Start Round
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Correct Answer
              </button>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Wrong Answer
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                Skip Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
