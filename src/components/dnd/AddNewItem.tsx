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
import { fetchPostPresentations } from '@/src/utils/landing';
import { Plus } from 'lucide-react';
import React from 'react';

export function AddNewItem({ addNewItem }: { addNewItem: any }) {
  const [itemName, setItemName] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (itemName.trim() === '') {
      return;
    }
    addNewItem(itemName);
    setItemName('');
    const response = await fetchPostPresentations(itemName);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Add new framework</DialogTitle>
          <DialogDescription>Enter the name of your new framework</DialogDescription>
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
