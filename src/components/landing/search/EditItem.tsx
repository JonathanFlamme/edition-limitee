import { SearchType } from '@/@type/type';
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
import React, { useEffect, useState } from 'react';

interface EditItemProps {
  editIsOpen: boolean;
  setEditIsOpen: (value: boolean) => void;
  itemToEdit: SearchType | null;
  editItem: (item: SearchType) => void;
}

export function EditItem({ editIsOpen, setEditIsOpen, itemToEdit, editItem }: EditItemProps) {
  const [itemName, setItemName] = useState<string>('');
  const [itemClasse, setItemClasse] = useState<string[]>([]);

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setItemClasse(itemToEdit.classes);
    }
  }, [itemToEdit]);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    if (!itemToEdit) return;
    const updatedItem = { ...itemToEdit, name: itemName, classes: itemClasse };

    editItem(updatedItem);
    setItemName('');
    setEditIsOpen(false);
  };
  return (
    <Dialog open={editIsOpen} onOpenChange={setEditIsOpen}>
      <DialogContent className={`${jost.className} sm:max-w-[425px]`}>
        <DialogHeader className="text-start">
          <DialogTitle>Modifier cette ligne</DialogTitle>
          <DialogDescription>Modifier cette recherche</DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="name" className="text-sm pb-4">
            Titre
          </label>
          <Input id="name" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="bnet" className="block text-sm">
            Classes
          </label>
          <Input
            id="bnet"
            value={itemClasse}
            onChange={(e: any) => setItemClasse(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
