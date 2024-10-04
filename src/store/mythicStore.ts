import { MythicObserverType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  week: { startWeek: string; endWeek: string; period: number };
  currentPeriod: number;
  mythicObjective: MythicObserverType[];
  setWeek: (week: State['week']) => void;
  setCurrentPeriod: (currentPeriod: State['currentPeriod']) => void;
  setMythicObjective: (mythicObjective: State['mythicObjective']) => void;
}
export const useMythicStore = create<State>((set) => ({
  week: { startWeek: '', endWeek: '', period: 0 },
  currentPeriod: 0,
  mythicObjective: [],
  setWeek: (week) => set({ week }),
  setCurrentPeriod: (currentPeriod) => set({ currentPeriod }),
  setMythicObjective: (mythicObjective) => set({ mythicObjective }),
}));
