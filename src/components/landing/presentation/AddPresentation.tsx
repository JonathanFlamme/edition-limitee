import { PresentationType } from '@/@type/type';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useState } from 'react';
import SortableLinks from '@/src/components/dnd/SortableLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { AddNewItem } from '@/src/components/landing/presentation/AddNewItem';
import { jost } from '@/src/utils/font';
import { useConfirm } from '@omit/react-confirm-dialog';

async function DeletePresentation(idToDelete: number) {
  const res = await fetch('/api/landing/presentations', {
    method: 'DELETE',
    body: JSON.stringify({ idToDelete }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch DELETE data');
  }
}
interface EditPresentationProps {
  presentationsProps: PresentationType[];
}

export default function AddPresentation({ presentationsProps }: EditPresentationProps) {
  const confirm = useConfirm();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [items, setItems] = useState<PresentationType[]>(presentationsProps);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  async function handleDelete(idToDelete: number) {
    const result = await confirm({
      title: 'Voulez vous supprimer cette ligne ?',
      description: 'Cette action est irréversible',
    });
    if (result) {
      console.log('Confirmed');
      await DeletePresentation(idToDelete);
      setItems((prevItems) => prevItems.filter((item) => item.id !== idToDelete));
    } else {
      console.log('Canceled');
    }
  }
  function handleEdit(idToEdit: number) {}

  function handleValidation() {
    // console.log(items);
  }

  async function addNewItem(newItem: PresentationType) {
    setItems((prevItems) => [...prevItems, { name: newItem.name, id: newItem.id }]);
  }

  return (
    <div
      className={`${jost.className}  flex justify-center items-center h-screen px-2 mx-auto select-non`}
    >
      <Card className="w-full md:max-w-lg">
        <CardHeader className="space-y-1 ">
          <CardTitle className="text-2xl flex justify-between">
            Ajouter d'une ligne
            <AddNewItem addNewItem={addNewItem} />
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
                  id={{ id: item.id, name: item.name }}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
              <button onClick={handleValidation}>Valider</button>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
