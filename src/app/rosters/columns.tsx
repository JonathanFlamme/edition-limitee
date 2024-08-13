'use client';

import { MemberType } from '@/@type/type';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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
        className="text-xl text-black font-bold"
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
        className="text-xl text-black font-bold"
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
    accessorKey: 'ilvl',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xl text-black font-bold"
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
        className="text-xl text-black font-bold"
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
];
