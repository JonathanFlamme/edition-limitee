export enum Role {
  Officier = 'Officier',
  Membre = 'Membre',
  Guest = 'Invité',
}

export enum RoleEnum {
  Tank = 'TANK',
  Heal = 'HEAL',
  Distance = 'DISTANCE',
  Cac = 'CAC',
  Casu = 'CASU',
  Pu = 'PU',
}

export const roleMap: Record<RoleEnum, string> = {
  [RoleEnum.Tank]: 'Tank',
  [RoleEnum.Heal]: 'Heal',
  [RoleEnum.Distance]: 'Distance',
  [RoleEnum.Cac]: 'CaC',
  [RoleEnum.Casu]: 'Casu',
  [RoleEnum.Pu]: 'PU',
};
