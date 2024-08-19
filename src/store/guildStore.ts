import { GuildType, MemberType } from '@/@type/type';
import { create } from 'zustand';

interface State {
  guild: Partial<GuildType>;
  isInitialized: boolean;
  setGuild: (guild: State['guild']) => void;
  setInitialized: (isInitialized: boolean) => void;
}
export const useGuildStore = create<State>((set) => ({
  guild: {
    id: '',
    mythicDescription: '',
    mythicTarget: 0,
  },
  setGuild: (guild) => set({ guild }),
  isInitialized: false,
  setInitialized: (isInitialized) => set({ isInitialized }),
}));
