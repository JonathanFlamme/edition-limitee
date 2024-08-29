import { MemberType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  members: MemberType[];
  roster: MemberType[];
}

interface Actions {
  setMembers: (members: State['members']) => void;
  setupdateMember: (memberId: string, updates: Partial<MemberType>) => void;
}

export const useMemberStore = create<State & Actions>((set, get) => ({
  members: [],
  roster: [],
  setMembers: (members) =>
    set({
      members,
      roster: members.filter(
        (member) =>
          member.rank === 0 || member.rank === 2 || (member.rank >= 4 && member.rank <= 6),
      ),
    }),
  setupdateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member,
      ),
    })),
}));
