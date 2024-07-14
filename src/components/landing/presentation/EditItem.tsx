import { PresentationType } from '@/@type/type';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { jost } from '@/src/utils/font';
import React, { useEffect } from 'react';

interface EditItemProps {
  editIsOpen: boolean;
  setEditIsOpen: (value: boolean) => void;
  presentationToEdit: PresentationType | null;
  editItem: (item: PresentationType) => void;
}

export function EditItem({
  editIsOpen,
  setEditIsOpen,
  presentationToEdit,
  editItem,
}: EditItemProps) {
  const [itemName, setItemName] = React.useState('');

  useEffect(() => {
    if (presentationToEdit) {
      setItemName(presentationToEdit.name);
    }
  }, [presentationToEdit]);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    if (!presentationToEdit) return;
    const updatedItem = { ...presentationToEdit, name: itemName };

    editItem(updatedItem);
    setItemName('');
    setEditIsOpen(false);
  };
  return (
    <Dialog open={editIsOpen} onOpenChange={setEditIsOpen}>
      <DialogContent className={`${jost.className} sm:max-w-[425px]`}>
        <DialogHeader className="text-start">
          <DialogTitle>Modifier cette ligne</DialogTitle>
          <DialogDescription>Modifier cette ligne au texte de présentation</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-2">
          <Input id="name" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
