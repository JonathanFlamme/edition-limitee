import { MemberType } from '@/@type/type';

export const members: MemberType[] = [
  {
    id: '1',
    name: 'Joflamme',
    realm: 'Realm A',
    rank: 1,
    ilvl: 450,
    rankingMythic: 1200,
    mythic: [
      {
        id: 'm1',
        name: 'Mythic Dungeon 1',
        dateTime: new Date('2023-06-15T14:48:00.000Z'),
        key: 15,
      },
      {
        id: 'm2',
        name: 'Mythic Dungeon 2',
        dateTime: new Date('2023-06-18T14:48:00.000Z'),
        key: 17,
      },
    ],
  },
  {
    id: '2',
    name: 'Tweety',
    realm: 'Realm B',
    rank: 2,
    ilvl: 445,
    rankingMythic: 1100,
    mythic: [
      {
        id: 'm3',
        name: 'Mythic Dungeon 3',
        dateTime: new Date('2023-06-20T14:48:00.000Z'),
        key: 16,
      },
    ],
  },
  {
    id: '3',
    name: 'Istale',
    realm: 'Realm C',
    rank: 3,
    ilvl: 440,
    rankingMythic: 1050,
    mythic: [],
  },
  {
    id: '4',
    name: 'Ophite',
    realm: 'Realm D',
    rank: 4,
    ilvl: 430,
    rankingMythic: 1000,
    mythic: [
      {
        id: 'm4',
        name: 'Mythic Dungeon 4',
        dateTime: new Date('2023-06-25T14:48:00.000Z'),
        key: 18,
      },
    ],
  },
  {
    id: '5',
    name: 'Jepper',
    realm: 'Realm E',
    rank: 5,
    ilvl: 420,
    rankingMythic: 950,
    mythic: [
      {
        id: 'm5',
        name: 'Mythic Dungeon 5',
        dateTime: new Date('2023-06-27T14:48:00.000Z'),
        key: 14,
      },
      {
        id: 'm6',
        name: 'Mythic Dungeon 6',
        dateTime: new Date('2023-06-30T14:48:00.000Z'),
        key: 19,
      },
    ],
  },
];
