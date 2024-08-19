import { create } from 'zustand';

interface State {
  startWeek: string;
  endWeek: string;
  setWeek: (startWeek: State['startWeek'], ndWeek: State['endWeek']) => void;
}
export const useMythicStore = create<State>((set) => ({
  startWeek: '',
  endWeek: '',
  setWeek: (startWeek, endWeek) => set({ startWeek, endWeek }),
}));
