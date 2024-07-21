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
import { Label } from '@/src/components/ui/label';
import { jost } from '@/src/utils/font';
import { PencilLine, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

async function PatchMails(mails: string[]): Promise<string[]> {
  const promise = fetch(`/api/settings/mails`, {
    method: 'PATCH',
    body: JSON.stringify(mails),
  });

  toast.promise(promise, {
    success: 'Les mails ont été modifiés',
    error: 'Une erreur est survenue lors de la modification des mails',
    loading: 'Chargement en cours, veuillez patienter',
  });
  const res = await promise;
  if (!res.ok) {
    throw new Error('Failed to fetch PATCH datas');
  }
  return res.json();
}

interface EditMailsProps {
  IsOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mailsList: string[];
  setMailsList: (value: string[]) => void;
}

export function EditMails({ IsOpen, setIsOpen, mailsList, setMailsList }: EditMailsProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState<string>('');

  useEffect(() => {
    if (mailsList) {
      setEmails(mailsList);
    }
  }, [mailsList]);

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    if (newEmail.trim() !== '') {
      setEmails([...emails, newEmail.trim()]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const handleSubmit = async () => {
    const data = await PatchMails(emails);
    setMailsList(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={IsOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <PencilLine className="absolute cursor-pointer right-5 text-black" width={20} />
      </DialogTrigger>
      <DialogContent className={`${jost.className} sm:max-w-[425px]`}>
        <DialogHeader>
          <DialogTitle>Modifier les mails</DialogTitle>
          <DialogDescription>Modifier les mails de réceptions des candidatures</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="mails" className="text-right">
            Emails
          </Label>
          {emails.map((email, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="col-span-3 flex-1 mr-2"
              />
              <Trash
                className="cursor-pointer text-red-500"
                width={20}
                onClick={() => handleRemoveEmail(index)}
              />
            </div>
          ))}
          <div className="flex items-center mb-4">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Ajouter un email"
              className="col-span-3 flex-1 mr-2"
            />
            <Plus className="cursor-pointer text-green-500" width={20} onClick={handleAddEmail} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
