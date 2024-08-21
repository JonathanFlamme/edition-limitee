export enum Role {
  Officier = 'Officier',
  Membre = 'Membre',
  Guest = 'Invité',
}

export enum RoleEnum {
  Tank = 'TANK',
  Heal = 'HEAL',
  Dps = 'DPS',
  Cac = 'CAC',
  Casu = 'CASU',
  Pu = 'PU',
}

// Mapping object
export const roleMap: Record<RoleEnum, string> = {
  [RoleEnum.Tank]: 'Tanks',
  [RoleEnum.Heal]: 'Heals',
  [RoleEnum.Dps]: 'Distants',
  [RoleEnum.Cac]: 'Corp à corps',
  [RoleEnum.Casu]: 'Casu',
  [RoleEnum.Pu]: 'PU',
};
