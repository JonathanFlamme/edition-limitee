'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { useSession } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { Role } from '@/@type/role.enum';
import { Button } from '@/src/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useMembersByBnet } from '@/src/hooks/useMembersByBnet';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: session } = useSession();
  const { updateMembersByBnet } = useMembersByBnet();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center py-2 gap-3">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="custom-container text-black max-w-sm"
        />
        {session?.character?.role === Role.Officier ? (
          <div className="custom-container text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'ghost'}
                    onClick={() => updateMembersByBnet()}
                    className="text-black font-bold py-1 px-3 rounded hover:bg-transparent"
                  >
                    <RotateCcw className="w-6 h-6 transform transition duration-300 ease-in-out hover:scale-125 hover:-rotate-180" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="z-40" side="right">
                  <p>Mettre à jour les membres</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : null}
      </div>
      <div className="z-0 overflow-auto rounded-md border ">
        <Table>
          <TableHeader className="custom-container sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="custom-container">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
