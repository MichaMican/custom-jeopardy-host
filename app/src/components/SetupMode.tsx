const SetupMode = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Setup</h2>
        <p className="text-gray-600">Configure your Jeopardy game settings</p>
      </div>
      
      {/* Sections as headlines */}
      <div className="space-y-10">
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Categories &amp; Questions</h2>
          {/* Add your setup content here */}
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Teams &amp; Players</h2>
          {/* Add your team setup content here */}
        </section>
      </div>
    </div>
  );
};

export default SetupMode;
