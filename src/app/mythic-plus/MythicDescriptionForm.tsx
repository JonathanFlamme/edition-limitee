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
import { MythicObserverType } from '@/@type/type';
import { useGuildStore } from '@/src/store/guildStore';
import { useMutation } from '@tanstack/react-query';
import { useMythicStore } from '@/src/store';

const keyItems = Array.from({ length: 20 }, (_, index) => index);

interface MythicDescriptionFormProps {
  guildId: string;
  mythicObjective: MythicObserverType;
  setShowForm: (showForm: boolean) => void;
}

export default function MythicDescriptionForm({
  guildId,
  mythicObjective,
  setShowForm,
}: MythicDescriptionFormProps) {
  const setMythicObjective = useMythicStore((state) => state.setMythicObjective);
  const currentPeriod = useMythicStore((state) => state.currentPeriod);

  const formSchema = z.object({
    description: z
      .string()
      .max(50, { message: 'La description doit contenir moins de 50 caractères' }),
    key: z.number().int(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: mythicObjective?.description ?? '',
      key: mythicObjective?.key ?? 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: Partial<MythicObserverType>) => {
      const method = mythicObjective ? 'PATCH' : 'POST';
      const url = mythicObjective
        ? `/api/mythic-objective/${mythicObjective.id}`
        : '/api/mythic-objective';

      const promise = fetch(url, {
        method,
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

    onSuccess: (mythicObjectiveUpdate) => {
      setMythicObjective([mythicObjectiveUpdate]);
      toast.success('Les objectifs ont été modifiés avec succès');
      setShowForm(false);
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la mise à jour');
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ ...values, period: currentPeriod });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-3xl border border-black py-5 px-6 space-y-6"
      >
        <FormField
          control={form.control}
          name="description"
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
          name="key"
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
                    {keyItems.map((item) => (
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
