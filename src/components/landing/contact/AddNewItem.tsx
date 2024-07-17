import { ContactType } from '@/@type/type';
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
import React from 'react';
import { toast } from 'sonner';

interface AddNewItemProps {
  addNewItem: (newItem: ContactType) => void;
  PostItem: (name: string, bnet: string) => Promise<ContactType>;
}

export function AddNewItem({ addNewItem, PostItem }: AddNewItemProps) {
  const [itemName, setItemName] = React.useState('');
  const [itemBnet, setItemBnet] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    const item = await PostItem(itemName, itemBnet);
    addNewItem(item);
    setItemName('');
    setItemBnet('');
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
          <DialogDescription>Ajouter un contact</DialogDescription>
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
          <Button onClick={handleSubmit} className="w-full mt-4">
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
