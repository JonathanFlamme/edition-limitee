import { MemberType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  members: MemberType[];
  roster: MemberType[];
  filterMembers: MemberType[];
}

interface Actions {
  setMembers: (members: State['members']) => void;
  setupdateMember: (memberId: string, updates: Partial<MemberType>) => void;
  setFilterMembers: (rank: number) => void;
}

export const useMemberStore = create<State & Actions>((set, get) => ({
  members: [],
  roster: [],
  filterMembers: [],
  setMembers: (members) =>
    set({
      members,
      roster: members.filter(
        (member) =>
          member.rank === 0 || member.rank === 2 || (member.rank >= 4 && member.rank <= 6),
      ),
      filterMembers: members,
    }),
  setupdateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member,
      ),
    })),
  setFilterMembers: (rank: number) =>
    rank === -1
      ? set({ filterMembers: get().members })
      : set({ filterMembers: get().members.filter((member) => member.rank === rank) }),
}));
