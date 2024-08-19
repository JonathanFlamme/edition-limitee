'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { toast } from 'sonner';
import { GuildType } from '@/@type/type';
import { useGuildStore } from '@/src/store/guildStore';
import { useMutation } from '@tanstack/react-query';

const key = Array.from({ length: 20 }, (_, index) => index);

interface MythicDescriptionFormProps {
  guildId: string;
  mythicDescription: string;
  mythicTarget: number;
  setShowForm: (showForm: boolean) => void;
}

export default function MythicDescriptionForm({
  guildId,
  mythicDescription,
  mythicTarget,
  setShowForm,
}: MythicDescriptionFormProps) {
  const setGuild = useGuildStore((state) => state.setGuild);

  const formSchema = z.object({
    mythicDescription: z
      .string()
      .max(50, { message: 'La description doit contenir moins de 50 caractères' }),
    mythicTarget: z.number().int(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mythicDescription: mythicDescription,
      mythicTarget: mythicTarget,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: Partial<GuildType>) => {
      const promise = fetch(`/api/guild/${guildId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      toast.promise(promise, {
        loading: 'Mise à jour en cours, veuillez patienter',
      });
      const response = await promise;
      if (!response.ok) {
        throw new Error('Failed to update guild');
      }
      return response.json();
    },

    onSuccess: (updatedGuild) => {
      setGuild(updatedGuild);
      toast.success('Les objectifs ont été modifiés avec succès');
      setShowForm(false);
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la mise à jour');
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-3xl border border-black py-5 px-6 space-y-6"
      >
        <FormField
          control={form.control}
          name="mythicDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectifs</FormLabel>
              <FormControl>
                <Input placeholder="Objectif" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mythicTarget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clé</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selectionner le numéro de la clé" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {key.map((item) => (
                      <SelectItem key={item} value={item.toString()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" onClick={() => setShowForm(false)}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
