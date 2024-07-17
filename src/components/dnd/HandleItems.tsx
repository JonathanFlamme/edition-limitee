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

interface HandleItemsProps {
  items: ContactType[];
  setItems: (value: (prevItems: ContactType[]) => ContactType[]) => void;
  PostItem: (name: string, btag: string) => Promise<ContactType>;
}

export default function HandleItems({ items, setItems, PostItem }: HandleItemsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent): void {
    throw new Error('Function not implemented.');
  }

  async function addNewItem(newItem: ContactType) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  async function handleDelete(id: string) {
    console.log('delete', id);
  }

  async function handleEdit(id: string) {
    console.log('edit', id);
  }

  async function handleValidation() {
    console.log('validation');
  }

  return (
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
                id={{ id: item.id, name: item.name, bnet: item.bnet }}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
            <button onClick={handleValidation}>Valider</button>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
