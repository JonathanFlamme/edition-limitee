import { create } from 'zustand';

interface State {
  startWeek: string;
  endWeek: string;
  period: number;
  setWeek: (
    startWeek: State['startWeek'],
    endWeek: State['endWeek'],
    period: State['period'],
  ) => void;
}
export const useMythicStore = create<State>((set) => ({
  startWeek: '',
  endWeek: '',
  period: 0,
  setWeek: (startWeek, endWeek, period) => set({ startWeek, endWeek, period }),
}));
