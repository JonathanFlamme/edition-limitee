import { SearchType } from '@/@type/type';
import HandleItems from './HandleItems';
import { toast } from 'sonner';

async function PostSearch(name: string, classes: string[]): Promise<SearchType> {
  const promise = fetch('/api/landing/searches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, classes }),
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
  return await res.json();
}

async function DeleteSearch(searchId: string): Promise<void> {
  toast.promise(
    async () => {
      const res = await fetch(`/api/landing/searches/${searchId}`, {
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

async function PatchSearchId(item: SearchType): Promise<SearchType> {
  const promise = fetch(`/api/landing/searches/${item.id}`, {
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

async function PatchSearch(items: SearchType[]): Promise<SearchType[]> {
  const promise = fetch(`/api/landing/searches`, {
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

export default function HandleSearch({ items, setItems, setShowEdit }: any) {
  return (
    <HandleItems
      items={items}
      setItems={setItems}
      setShowEdit={setShowEdit}
      PostItem={PostSearch}
      DeleteItem={DeleteSearch}
      PatchItemId={PatchSearchId}
      PatchItems={PatchSearch}
    />
  );
}
