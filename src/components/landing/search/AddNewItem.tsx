import { SearchType } from '@/@type/type';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { jost } from '@/src/utils/font';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface AddNewItemProps {
  addNewItem: (newItem: SearchType) => void;
  PostItem: (name: string, classes: string[]) => Promise<SearchType>;
}

export function AddNewItem({ addNewItem, PostItem }: AddNewItemProps) {
  const [itemName, setItemName] = useState<string>('');
  const [itemClasse, setItemClasse] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (itemName.trim() === '' || itemClasse.trim() === '') {
      return;
    }

    // transofrm string to array and remove white space
    const classesArray = itemClasse.split(',').map((classe) => classe.trim());

    const item = await PostItem(itemName, classesArray);
    addNewItem(item);
    setItemName('');
    setItemClasse('');
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`${jost.className} sm:max-w-[425px]`}>
        <DialogHeader className="text-start">
          <DialogTitle>Ajouter une ligne</DialogTitle>
          <DialogDescription>Ajouter une recherche</DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="name" className="text-sm pb-4">
            Titre
          </label>
          <Input id="name" value={itemName} onChange={(e: any) => setItemName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="classe" className="block text-sm">
            Classes
          </label>
          <Input
            id="classe"
            value={itemClasse}
            onChange={(e: any) => setItemClasse(e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-1">
            Veuillez entrer les classes séparées par des virgules,
          </p>
          <p className="text-gray-500 text-xs mt-1">Exemple: DK, DH, Paladin, Voleur.</p>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full mt-4">
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
