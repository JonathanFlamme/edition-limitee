import { ContactType } from '@/@type/type';
import HandleItems from '../../dnd/HandleItems';
import { toast } from 'sonner';

async function PostContact(name: string, bnet: string): Promise<ContactType> {
  const promise = fetch('/api/landing/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, bnet }),
  });

  toast.promise(promise, {
    loading: 'Chargement en cours, veuillez patienter',
    success: 'La ligne a été ajoutée avec succès',
    error: "Une erreur est survenue lors de l'ajout de la ligne",
  });

  const res = await promise;
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }

  const data = await res.json();
  return data;
}

async function DeleteContact(contactId: string) {
  toast.promise(
    async () => {
      const res = await fetch(`/api/landing/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch DELETE data');
      }
      return res.json();
    },
    {
      loading: 'Chargement en cours, veuillez patienter',
      success: 'La ligne a été supprimée avec succès',
      error: 'Une erreur est survenue lors de la suppression de la ligne',
    },
  );
}

async function PatchContactId(item: ContactType): Promise<ContactType> {
  const promise = fetch(`/api/landing/contacts/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
  });

  toast.promise(promise, {
    loading: 'Chargement en cours, veuillez patienter',
    success: 'La ligne a été modifiée avec succès',
    error: 'Une erreur est survenue lors de la modification de la ligne',
  });

  const res = await promise;
  if (!res.ok) {
    throw new Error('Failed to fetch PATCH data');
  }
  return res.json();
}

async function PatchContact(items: ContactType[]) {
  const promise = fetch(`/api/landing/contacts`, {
    method: 'PATCH',
    body: JSON.stringify(items),
  });
  toast.promise(promise, {
    loading: 'Chargement en cours, veuillez patienter',
    success: 'Les lignes ont été modifiées avec succès',
    error: 'Une erreur est survenue lors de la modification des lignes',
  });
  const res = await promise;
  if (!res.ok) {
    throw new Error('Failed to fetch PATCH datas');
  }
  return res.json();
}

export default function HandleContact({
  handleDelete,
  handleEdit,
  addNewItem,
  handleValidation,
  items,
  setItems,
  setShowEdit,
}: any) {
  return (
    <HandleItems
      items={items}
      setItems={setItems}
      setShowEdit={setShowEdit}
      PostItem={PostContact}
      DeleteItem={DeleteContact}
      PatchItemId={PatchContactId}
      PatchItems={PatchContact}
    />
  );
}
