'use client';

import { RoleEnum, roleMap } from '@/@type/role.enum';
import { MemberType } from '@/@type/type';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import RoleInGame from './RoleInGame';
import { RankMap } from '@/@type/member.map';

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: 'avatar',
    header: () => <div className="text-xl text-black font-bold">Avatar</div>,
    cell: ({ getValue }) => {
      const avatarPath = getValue();
      if (!avatarPath) return null;
      const fullUrl = `https://render.worldofwarcraft.com/eu/character/${avatarPath}`;
      return (
        <Avatar className="w-14 h-14 rounded-xl">
          <AvatarImage src={fullUrl || ''} alt="image profil bnet" />
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
  {
    accessorKey: 'realm',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Serveur
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Rang
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return <div className="text-lg text-black">{RankMap[value]}</div>;
    },
  },
  {
    accessorKey: 'class',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Classe
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue, row }) => {
      const value = getValue() as RoleEnum;
      const member = row.original as MemberType;
      return <RoleInGame value={value} memberId={member.id} />;
    },
  },
  {
    accessorKey: 'ilvl',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ilvl
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
  {
    accessorKey: 'mythicRating',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
  {
    accessorKey: 'achievements',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold p-0 m-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Hauts Faits
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-lg text-black">{value}</div>;
    },
  },
];
