import { jost } from '@/src/utils/font';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableLinks from './SortableLinks';
import { ContactType } from '@/@type/type';
import { AddNewItem } from './AddNewItem';
import { useConfirm } from '@omit/react-confirm-dialog';
import { useState } from 'react';
import { EditItem } from '../landing/contact/EditItem';

interface HandleItemsProps {
  items: ContactType[];
  setItems: (value: (prevItems: ContactType[]) => ContactType[]) => void;
  PostItem: (name: string, btag: string) => Promise<ContactType>;
  DeleteItem: (id: string) => void;
  PatchItemId: (item: ContactType) => Promise<ContactType>;
  setShowEdit: (value: boolean) => void;
}

export default function HandleItems({
  items,
  setItems,
  PostItem,
  DeleteItem,
  PatchItemId,
  setShowEdit,
}: HandleItemsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const confirm = useConfirm();
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ContactType | null>(null);

  function handleDragEnd(event: DragEndEvent): void {
    throw new Error('Function not implemented.');
  }

  async function addNewItem(newItem: ContactType) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  async function handleDelete(id: string) {
    const result = await confirm({
      title: 'Voulez vous supprimer cette ligne ?',
      description: 'Cette action est irréversible',
    });
    if (!result) {
      return;
    }
    DeleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // ---------- EDIT ITEM ---------- //
  async function editItem(updatedItem: ContactType) {
    const data = await PatchItemId(updatedItem);
    console.log(data);
    setItems((prevItems) => prevItems.map((item) => (item.id === data.id ? data : item)));
  }

  async function handleEdit(id: string) {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    setItemToEdit(item);
    setEditIsOpen(true);
  }

  async function handleValidation() {
    setShowEdit(false);
  }

  return (
    <>
      <Card className={`${jost.className} w-full md:max-w-lg`}>
        <CardHeader className="space-y-1 ">
          <CardTitle className="text-2xl flex flex-row justify-between">
            Ajouter d&apos;une ligne
            <AddNewItem addNewItem={addNewItem} PostItem={PostItem} />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableLinks
                  key={item.id}
                  id={{ ...item }}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
              <button onClick={handleValidation}>Valider</button>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
      {editIsOpen && (
        <EditItem
          editIsOpen={editIsOpen}
          setEditIsOpen={setEditIsOpen}
          itemToEdit={itemToEdit}
          editItem={editItem}
        />
      )}
    </>
  );
}
