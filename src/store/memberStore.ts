import { MemberType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  members: MemberType[];
  setMembers: (members: State['members']) => void;
}
export const useMemberStore = create<State>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
