import { create } from 'zustand';

interface State {
  week: { startWeek: string; endWeek: string; period: number };
  currentPeriod: number;
  setWeek: (week: State['week']) => void;
  setCurrentPeriod: (currentPeriod: State['currentPeriod']) => void;
}
export const useMythicStore = create<State>((set) => ({
  week: { startWeek: '', endWeek: '', period: 0 },
  currentPeriod: 0,
  setWeek: (week) => set({ week }),
  setCurrentPeriod: (currentPeriod) => set({ currentPeriod }),
}));
