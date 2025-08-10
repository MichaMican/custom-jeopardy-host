import { useMemo, useState } from 'react';
import { POINT_VALUES, type PointValue, useGameData } from '../state/GameDataContext';

const CategoriesQuestions = () => {
  const { data, setCategoryName, setQuestion } = useGameData();
  const [active, setActive] = useState<{ cat: number; value: PointValue } | null>(null);

  const tableHeaders = useMemo(() => ['Category', ...POINT_VALUES.map(v => `$${v}`)], []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              {tableHeaders.map(h => (
                <th key={h} className="px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.categories.map((cat, cIdx) => (
              <tr key={cIdx} className="border-t">
                <td className="px-3 py-2 align-top w-56">
                  <input
                    value={cat.name}
                    onChange={e => setCategoryName(cIdx, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                {POINT_VALUES.map((val) => {
                  const q = cat.questions[val];
                  const isConfigured = q.prompt.trim().length > 0;
                  return (
                    <td key={val} className="px-3 py-2">
                      <button
                        onClick={() => setActive({ cat: cIdx, value: val })}
                        className={`relative w-full rounded-md border px-2 py-1 text-sm cursor-pointer transition-colors ${
                          isConfigured
                            ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-opacity ${isConfigured ? 'text-green-600 opacity-100' : 'opacity-0'}`}
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0L3.296 9.47a1 1 0 011.414-1.414l3.03 3.03 6.536-6.536a1 1 0 011.428-.001z" clipRule="evenodd" />
                        </svg>
                        <span className="block w-full text-center">Edit</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {active && (
        <QuestionModal
          categoryIndex={active.cat}
          value={active.value}
          onClose={() => setActive(null)}
          onSave={(update) => {
            setQuestion(active.cat, active.value, update);
            setActive(null);
          }}
        />
      )}
    </div>
  );
};

function QuestionModal({
  categoryIndex,
  value,
  onClose,
  onSave,
}: {
  categoryIndex: number;
  value: PointValue;
  onClose: () => void;
  onSave: (update: { prompt: string; notes: string }) => void;
}) {
  const { data } = useGameData();
  const q = data.categories[categoryIndex].questions[value];
  const [prompt, setPrompt] = useState(q.prompt);
  const [notes, setNotes] = useState(q.notes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg">
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit ${value} – {data.categories[categoryIndex].name}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gamemaster Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="border-t px-4 py-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ prompt, notes })}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesQuestions;
