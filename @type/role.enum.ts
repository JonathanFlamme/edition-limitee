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

export const roleMap: Record<RoleEnum, string> = {
  [RoleEnum.Tank]: 'Tank',
  [RoleEnum.Heal]: 'Heal',
  [RoleEnum.Dps]: 'Distant',
  [RoleEnum.Cac]: 'Corp à corp',
  [RoleEnum.Casu]: 'Casu',
  [RoleEnum.Pu]: 'PU',
};
