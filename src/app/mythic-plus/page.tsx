'use client';
import { GuildType, MemberType, MythicType } from '@/@type/type';
import { jost } from '@/src/utils/font';
import { useSession } from 'next-auth/react';
import { Check, LoaderIcon, Settings, X, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import podium from '@/public/podium.jpg';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { Button } from '@/src/components/ui/button';
import MythicDescriptionForm from './MythicDescriptionForm';
import { toast } from 'sonner';

export default function MythiquePlus() {
  const [guild, setGuild] = useState<Partial<GuildType>>({});

  const [startWeek, setStartWeek] = useState<string>('');
  const [endWeek, setEndWeek] = useState<string>('');
  const [isLoading, setIsLoader] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  async function updateMythic() {
    const promise = fetch('/api/mythic-plus', {
      method: 'POST',
    });

    toast.promise(promise, {
      loading: 'Mise à jour en cours, veuillez patienter',
      success: 'Les mythiques ont été modifiés avec succès',
      error: 'Une erreur est survenue',
    });

    const res = await promise;
    if (!res.ok) {
      throw new Error('Failed to fetch PATCH data');
    }

    const guild: GuildType = await res.json();
    setGuild(guild);
  }

  useEffect(() => {
    setIsLoader(true);

    async function getMembers() {
      const res = await fetch('/api/mythic-plus', {
        method: 'GET',
        cache: 'no-cache',
      });

      const { guild, start_timestamp, end_timestamp } = await res.json();

      setGuild(guild);

      const startDateTime = DateTime.fromMillis(start_timestamp);
      const startWeek = startDateTime.toFormat('dd/MM/yyyy');
      setStartWeek(startWeek);

      const endDateTime = DateTime.fromMillis(end_timestamp);
      const endWeek = endDateTime.toFormat('dd/MM/yyyy');
      setEndWeek(endWeek);

      setIsLoader(false);
    }

    getMembers();
  }, []);

  function mythicDone(mythics: MythicType[], mythicTarget: number) {
    const count = mythics.filter((mythic) => {
      return mythic.key >= mythicTarget;
    }).length;

    if (count >= 4) {
      return <Check className="text-green-500" />;
    } else {
      return <X className="text-red-500" />;
    }
  }

  function updateTargetMythic() {
    setShowForm(!showForm);
  }

  return (
    <div className={`${jost.className} page-container flex gap-3`}>
      {isLoading ? (
        <div className="m-auto flex flex-col justify-center items-center text-stroke text-white text-2xl">
          <LoaderIcon color="white" className="animate-spin w-32 h-32" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <>
          <div className="custom-container hidden md:block md:basis-1/6 text-xl text-left px-6 pt-3 overflow-y-auto">
            <ul>
              {guild.members?.map((member) => (
                <li className="flex flex-row justify-between py-1" key={member.id}>
                  <p> {member.name}</p>
                  <p>{mythicDone(member.mythics, guild.mythicTarget ?? 0)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 md:basis-5/6 text-center">
            <div className="md:flex gap-3">
              {/* Description objectif + clé */}
              <div className="gap-2 md:basis-5/6 flex justify-center flex-col items-center">
                <div className="custom-container h-full flex justify-center flex-col items-center gap-4 py-2 w-full">
                  <p className="text-lg md:text-3xl font-bold">{guild.mythicDescription}</p>
                  <p className="border-2 border-black px-2 text-base md:text-2xl font-bold">
                    + {guild.mythicTarget}
                  </p>
                  <p className="text-base md:text-lg">
                    {startWeek} - {endWeek}
                  </p>
                </div>
                {/* Barre filtrage / option */}
                <div className="custom-container flex justify-between w-full text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={'ghost'}
                          onClick={() => updateMythic()}
                          className="text-black font-bold py-1 px-3 rounded hover:bg-transparent"
                        >
                          <RotateCcw className="w-6 h-6 transform transition duration-300 ease-in-out hover:scale-125 hover:-rotate-180" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mettre à jour les mythiques</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={'ghost'}
                          onClick={() => updateTargetMythic()}
                          className="text-black font-bold py-1 px-3 rounded hover:bg-transparent"
                        >
                          <Settings className="w-6 h-6 transform transition duration-300 ease-in-out hover:scale-125 hover:rotate-90" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Paramètre des mythiques</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              {/* PODIUM */}
              <Image
                className="hidden md:block basis-1/6"
                src={podium}
                alt="podium"
                width={250}
                height={250}
              />
            </div>

            {/* Card members mythics */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-3 text-center overflow-y-auto">
              {guild.members?.map((member) => (
                <div key={member.id} className="custom-container p-2">
                  <div className="flex justify-between md:text-xl font-bold px-2 mb-4">
                    <div>{member.name}</div>
                    <div
                      style={{
                        color:
                          member.colorRating?.a === 0
                            ? 'white'
                            : `rgba(${member.colorRating?.r}, ${member.colorRating?.g}, ${member.colorRating?.b}, ${member.colorRating?.a})`,
                      }}
                    >
                      {member.mythicRating}
                    </div>
                  </div>

                  {/* List mythics */}
                  {member.mythics?.length ? (
                    member.mythics.map((mythic) => (
                      <div
                        key={mythic.id}
                        className="flex flex-col text-left text-sm md:text-base md:px-2 pb-2"
                      >
                        <div className="flex flex-row justify-between">
                          <p>{mythic.name}</p>
                          <p>+{mythic.key}</p>
                        </div>
                        <p className="flex">
                          {DateTime.fromISO(mythic.date.toString()).toFormat('dd/MM/yyyy')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm md:text-base my-2">Aucun donjon mythique fait</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {showForm && (
        <div className="absolute w-3/4 md:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MythicDescriptionForm
            setGuild={setGuild}
            mythicDescription={guild.mythicDescription || ''}
            mythicTarget={guild.mythicTarget || 0}
            guildId={guild.id || ''}
            setShowForm={setShowForm}
          />
        </div>
      )}
    </div>
  );
}
