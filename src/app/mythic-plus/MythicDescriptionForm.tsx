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

const key = Array.from({ length: 20 }, (_, index) => index);

interface MythicDescriptionFormProps {
  setGuild: (value: (prevGuild: Partial<GuildType>) => Partial<GuildType>) => void;
  guildId: string;
  mythicDescription: string;
  mythicTarget: number;
  setShowForm: (showForm: boolean) => void;
}

export default function MythicDescriptionForm({
  setGuild,
  guildId,
  mythicDescription,
  mythicTarget,
  setShowForm,
}: MythicDescriptionFormProps) {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = fetch(`/api/guild/${guildId}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });

    toast.promise(promise, {
      loading: 'Enregistrement en cours, veuillez patienter',
      success: 'Les objectifs ont été modifiés avec succès',
      error: 'Une erreur est survenue',
    });

    const res = await promise;
    if (!res.ok) {
      throw new Error('Failed to fetch PATCH data');
    }
    const updateGuild = await res.json();

    setGuild((prevGuild) => ({ ...prevGuild, ...updateGuild }));
    setShowForm(false);
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
