import { ContactType, PresentationType } from '@/@type/type';
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
  itemToEdit: ContactType | null;
  editItem: (item: ContactType) => void;
}

export function EditItem({ editIsOpen, setEditIsOpen, itemToEdit, editItem }: EditItemProps) {
  const [itemName, setItemName] = React.useState('');
  const [itemBnet, setItemBnet] = React.useState('');

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setItemBnet(itemToEdit.bnet);
    }
  }, [itemToEdit]);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    if (!itemToEdit) return;
    const updatedItem = { ...itemToEdit, name: itemName, bnet: itemBnet };

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
        <div>
          <label htmlFor="name" className="text-sm pb-4">
            Nom
          </label>
          <Input id="name" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="bnet" className="block text-sm">
            Battle tag
          </label>
          <Input id="bnet" value={itemBnet} onChange={(e: any) => setItemBnet(e.target.value)} />
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
