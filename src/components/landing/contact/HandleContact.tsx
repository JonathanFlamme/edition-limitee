import { jost } from '@/src/utils/font';
import { Card, CardHeader } from '@nextui-org/react';
import { CardContent, CardTitle } from '../../ui/card';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableLinks from '../../dnd/SortableLinks';
import { ContactType, PresentationType, SearchMembersType } from '@/@type/type';
import { useState } from 'react';
import HandleItems from '../../dnd/HandleItems';
import { toast } from 'sonner';

async function PostContact(name: string, bnet: string): Promise<ContactType> {
  const promise = fetch('/api/landing/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, bnet }),
  });

  toast.promise(promise, {
    loading: 'Chargement en cours, veuillez patienter',
    success: 'La ligne a été ajoutée avec succès',
    error: "Une erreur est survenue lors de l'ajout de la ligne",
  });

  const res = await promise;
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }

  const data = await res.json();
  return data;
}

export default function HandleContact({
  handleDelete,
  handleEdit,
  addNewItem,
  handleValidation,
  items,
  setItems,
}: any) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // const [itemsList, setItems] = useState<PresentationType[] | ContactType[] | SearchMembersType[]>(
  //   contactsList,
  // );

  function handleDragEnd(event: DragEndEvent): void {
    throw new Error('Function not implemented.');
  }

  return <HandleItems items={items} setItems={setItems} PostItem={PostContact} />;
}
