'use client';
import { MythicType } from '@/@type/type';
import { useSession } from 'next-auth/react';
import { Check, Settings, X, RotateCcw } from 'lucide-react';
import { useState } from 'react';
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
import { Role } from '@/@type/role.enum';
import MythicCard from './MythicCard';
import { useMemberStore } from '@/src/store/memberStore';
import { useGuildStore } from '@/src/store/guildStore';
import { useMythicStore } from '@/src/store/mythicStore';
import { useMythicsByBnet } from '@/src/hooks/useMythicsByBnet';
import { toast } from 'sonner';

export default function MythiqueList() {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState<boolean>(false);

  const setMember = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const guild = useGuildStore((state) => state.guild);
  const startWeek = useMythicStore((state) => state.startWeek);
  const endWeek = useMythicStore((state) => state.endWeek);
  const setMythic = useMythicStore((state) => state.setWeek);
  const period = useMythicStore((state) => state.period);

  const { updateMythicsByBnet } = useMythicsByBnet();

  function mythicDone(mythics: MythicType[], mythicTarget: number) {
    if (!mythics) {
      return <X className="text-red-500" />;
    }

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

  async function otherWeekMythic(periodChange: number) {
    const previousPeriod = (period + periodChange).toString();
    const res = await fetch(`/api/mythic-plus?period=${previousPeriod}`, {
      method: 'GET',
    });

    const response = await res.json();
    if (!res.ok) {
      return toast.error("Il n'y a pas de données pour cette période");
    }
    setMember(response.members);
    setMythic(response.startWeek, response.endWeek, response.period);
  }

  return (
    <>
      <div className="bg-[url('../public/parchment.webp')] bg-[length:120%_102%] bg-no-repeat bg-bottom	hidden md:block md:basis-1/6 text-xl text-stroke-light text-white text-left pt-5 pb-24">
        <div className="bg-[url('../public/parchment2.webp')] bg-[length:100%_100%] bg-no-repeat bg-bottom h-16 pt-4 flex flex-row justify-between">
          <span className="pl-5">Pseudo</span>
          <span className="pr-10">Obj.</span>
        </div>
        <div className="overflow-auto h-full pl-14 pr-12">
          <ul>
            {members.map((member) => (
              <li className="flex flex-row justify-between pr-4 py-1" key={member.id}>
                <p> {member.name}</p>
                <p>{mythicDone(member.mythics, guild.mythicTarget ?? 0)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-full md:basis-5/6 text-center">
        <div className="md:flex justify-around h-56 gap-3">
          {/* Description objectif + clé */}
          <div className="gap-2 md:basis-4/6 flex justify-center flex-col items-center">
            <div className="bg-[url('../public/parchment4.webp')] bg-[length:100%_100%] bg-no-repeat h-full flex justify-center flex-col items-center gap-2 md:gap-4 py-4 md:py-2 w-full">
              <p className="text-lg md:text-3xl font-bold">{guild.mythicDescription}</p>
              <p className="border-2 border-black px-2 text-base md:text-2xl font-bold">
                + {guild.mythicTarget}
              </p>
              <div className="flex">
                <Button
                  className="bg-[url('../public/fleche-mythic.webp')] bg-contain bg-no-repeat rotate-180 w-16 transform hover:scale-110 transition duration-150 ease-in-out active:scale-95 active:translate-y-1  "
                  variant={'none'}
                  onClick={() => otherWeekMythic(-1)}
                ></Button>
                <p className="text-base md:text-lg pt-1 px-2 md:px-6">
                  {startWeek} - {endWeek}
                </p>
                <Button
                  className="bg-[url('../public/fleche-mythic.webp')] bg-contain bg-no-repeat w-16 transform hover:scale-110 transition duration-150 ease-in-out active:scale-95 active:translate-y-1  "
                  variant={'none'}
                  onClick={() => otherWeekMythic(1)}
                ></Button>
              </div>
              {/* Barre filtrage / option */}
              {session?.character?.role === Role.Officier ? (
                <div className="w-3/4 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={'ghost'}
                          onClick={() => updateMythicsByBnet()}
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
              ) : null}
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
        <MythicCard members={members} />
      </div>
      {showForm && (
        <div className="absolute w-3/4 md:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MythicDescriptionForm
            mythicDescription={guild.mythicDescription || ''}
            mythicTarget={guild.mythicTarget || 0}
            guildId={guild.id || ''}
            setShowForm={setShowForm}
          />
        </div>
      )}
    </>
  );
}
