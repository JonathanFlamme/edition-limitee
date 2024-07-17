import { jost } from '@/src/utils/font';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  arrayMove,
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
  PatchItems: (items: ContactType[]) => Promise<ContactType[]>;
  setShowEdit: (value: boolean) => void;
}

export default function HandleItems({
  items,
  setItems,
  PostItem,
  DeleteItem,
  PatchItemId,
  PatchItems,
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
  const [editDnD, setEditDnD] = useState(false);

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

  // ---------- DRAG AND DROP PATCH ITEMS ---------- //
  function handleDragEnd(event: any) {
    const { active, over } = event;
    setEditDnD(true);

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        // Change index of each item
        const updatedItems = arrayMove(prevItems, oldIndex, newIndex);

        // Changer order of each item by order = index
        const reOrderItems = updatedItems.map((item, index) => {
          return { ...item, order: index };
        });
        return reOrderItems;
      });
    }
  }
  async function handleValidation() {
    if (editDnD) {
      const data = await PatchItems(items);
    }
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
