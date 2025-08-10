import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type PointValue = 100 | 200 | 300 | 600 | 1000;
export const POINT_VALUES: PointValue[] = [100, 200, 300, 600, 1000];

export type Question = {
  prompt: string;
  notes: string;
};

export type Category = {
  name: string;
  questions: Record<PointValue, Question>;
};

export type Player = {
  id: string;
  name: string;
  color: string; // hex color, e.g. #ff0000
};

export type GameData = {
  categories: Category[];
  players: Player[];
};

const defaultQuestion: Question = { prompt: '', notes: '' };

const createEmptyCategory = (name = ''): Category => ({
  name,
  questions: {
    100: { ...defaultQuestion },
    200: { ...defaultQuestion },
    300: { ...defaultQuestion },
    600: { ...defaultQuestion },
    1000: { ...defaultQuestion },
  },
});

const createDefaultGameData = (): GameData => ({
  categories: Array.from({ length: 6 }, (_, i) => createEmptyCategory(`Category ${i + 1}`)),
  players: [],
});

function genId() {
  return `player-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function randomColor() {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#22c55e', '#eab308'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export type GameDataContextType = {
  data: GameData;
  setCategoryName: (index: number, name: string) => void;
  setQuestion: (categoryIndex: number, value: PointValue, update: Partial<Question>) => void;
  resetAll: () => void;
  addPlayer: () => void;
  updatePlayer: (id: string, update: Partial<Player>) => void;
  removePlayer: (id: string) => void;
};

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export function GameDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GameData>(() => createDefaultGameData());

  const api = useMemo<GameDataContextType>(() => ({
    data,
    setCategoryName: (index, name) => {
      setData(prev => {
        const categories = [...prev.categories];
        categories[index] = { ...categories[index], name };
        return { ...prev, categories };
      });
    },
    setQuestion: (categoryIndex, value, update) => {
      setData(prev => {
        const categories = [...prev.categories];
        const cat = { ...categories[categoryIndex] };
        const q = { ...cat.questions[value], ...update };
        cat.questions = { ...cat.questions, [value]: q } as Category['questions'];
        categories[categoryIndex] = cat;
        return { ...prev, categories };
      });
    },
    resetAll: () => setData(createDefaultGameData()),
    addPlayer: () => {
      setData(prev => {
        const nextIndex = prev.players.length + 1;
        const player: Player = { id: genId(), name: `Player ${nextIndex}`, color: randomColor() };
        return { ...prev, players: [...prev.players, player] };
      });
    },
    updatePlayer: (id, update) => {
      setData(prev => {
        const players = prev.players.map(p => (p.id === id ? { ...p, ...update } : p));
        return { ...prev, players };
      });
    },
    removePlayer: (id) => {
      setData(prev => ({ ...prev, players: prev.players.filter(p => p.id !== id) }));
    },
  }), [data]);

  return (
    <GameDataContext.Provider value={api}>{children}</GameDataContext.Provider>
  );
}

export function useGameData() {
  const ctx = useContext(GameDataContext);
  if (!ctx) throw new Error('useGameData must be used within a GameDataProvider');
  return ctx;
}
