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

async function PostPresentation(name: string) {
  const res = await fetch('/api/landing/presentations', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return res.json();
}

export function AddNewItem({ addNewItem }: { addNewItem: any }) {
  const [itemName, setItemName] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    const data = await PostPresentation(itemName);
    addNewItem(data.presentation);
    setItemName('');
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
          <DialogDescription>Ajouter une ligne au texte de présentation</DialogDescription>
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
