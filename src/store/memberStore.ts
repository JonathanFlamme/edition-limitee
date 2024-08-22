import { MemberType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  members: MemberType[];
  setMembers: (members: State['members']) => void;
  setupdateMember: (memberId: string, updates: Partial<MemberType>) => void;
}
export const useMemberStore = create<State>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
  setupdateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member,
      ),
    })),
}));
