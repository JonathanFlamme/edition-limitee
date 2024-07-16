import React, { FC } from 'react';
import { Card } from '@/src/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PresentationType } from '@/@type/type';

interface Item {
  id: string;
  name: string;
}

interface SortableLinkCardProps {
  id: Item;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const SortableLinks: FC<SortableLinkCardProps> = ({ id, onDelete, onEdit }) => {
  const uniqueId = id.id;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: uniqueId,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleButtonClick = () => {
    onDelete(uniqueId);
  };

  const handleButtonEditClick = () => {
    onEdit(uniqueId);
  };

  const isCursorGrabbing = attributes['aria-pressed'];

  return (
    <div ref={setNodeRef} style={style} key={uniqueId}>
      <Card className="p-4 relative flex justify-between gap-5 group">
        <div>{id.name}</div>
        <div className="flex justify-center items-center gap-4">
          <button className="hidden group-hover:block" onClick={handleButtonEditClick}>
            <svg
              className="text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>

          <button className="hidden group-hover:block" onClick={handleButtonClick}>
            <svg
              className="text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <button
            {...attributes}
            {...listeners}
            className={` ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
            aria-describedby={`DndContext-${uniqueId}`}
          >
            <svg viewBox="0 0 20 20" width="15">
              <path
                d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SortableLinks;
