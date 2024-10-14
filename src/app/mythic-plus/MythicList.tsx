'use client';
import { GuildResponse, MythicType } from '@/@type/type';
import XIcon from '@/assets/icons/x.svg';
import CheckIcon from '@/assets/icons/check.svg';
import { Button } from '@/src/components/ui/button';
import MythicCard from './MythicCard';
import { useMemberStore, useGuildStore, useMythicStore } from '@/src/store';
import { toast } from 'sonner';
import Podium from './components/Podium';
import Setting from './components/Setting';

export default function MythiqueList() {
  const setMember = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.roster);
  const guild = useGuildStore((state) => state.guild);
  const mythicObjective = useMythicStore((state) => state.mythicObjective);
  const week = useMythicStore((state) => state.week);
  const setMythic = useMythicStore((state) => state.setWeek);
  const currentPeriod = useMythicStore((state) => state.currentPeriod);
  const setMythicObjective = useMythicStore((state) => state.setMythicObjective);

  function mythicDone(mythics: MythicType[], target: number) {
    if (!mythics) {
      return <XIcon />;
    }

    const count = mythics.filter((mythic) => {
      return mythic.key >= target;
    }).length;

    if (count >= 4) {
      return <CheckIcon />;
    } else {
      return <XIcon />;
    }
  }

  async function otherWeekMythic(periodChange: number) {
    const previousPeriod = periodChange.toString();
    const res = await fetch(`/api/mythic-plus?period=${previousPeriod}`, {
      method: 'GET',
    });

    if (!res.ok) {
      return toast.error("Il n'y a pas de données pour cette période");
    }
    const response: GuildResponse = await res.json();
    setMember(response.members);
    setMythic(response.week);
    setMythicObjective(response.mythicObjective);
  }

  return (
    <>
      <div className="bg-[url('../public/parchment.webp')] bg-[length:120%_102%] bg-no-repeat bg-bottom	hidden md:block md:basis-1/6 text-xl text-stroke-light text-white text-left pt-5 pb-24">
        <div className="bg-[url('../public/parchment2.webp')] bg-[length:100%_100%] bg-no-repeat bg-bottom h-16 pt-4 flex flex-row justify-between">
          <span className="pl-5">Pseudo</span>
          <span className="pr-10">Obj.</span>
        </div>
        <div className="overflow-y-auto hidden-scroll h-full pl-14 pr-16 ">
          <ul className="w-full">
            {members.map((member) => (
              <li className="flex flex-row justify-between py-1" key={member.id}>
                <p> {member.name}</p>
                <p>{mythicDone(member.mythics || [], mythicObjective[0]?.key ?? 0)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 basis-full md:basis-5/6 text-center">
        <div className="md:flex md:justify-around gap-3">
          {/* Description objectif + clé */}
          <div className="gap-2 md:basis-4/6 flex justify-center flex-col items-center">
            <div className="relative bg-[url('../public/parchment4.webp')] bg-[length:100%_100%] bg-no-repeat h-48 flex justify-center flex-col items-center gap-3 md:gap-2 pt-5 w-full">
              <p className="text-base md:text-2xl font-bold">
                {mythicObjective[0]?.description ?? 'Objectif des 4 mythiques de la semaine'}
              </p>
              <p className="border-2 border-black px-2 text-base md:text-2xl font-bold">
                + {mythicObjective[0]?.key ?? 0}
              </p>
              <div className="flex">
                <Button
                  className="bg-[url('../public/fleche-mythic.webp')] bg-contain bg-no-repeat rotate-180 w-16 transform hover:scale-110 transition duration-150 ease-in-out active:scale-95 active:translate-y-1  "
                  variant={'none'}
                  onClick={() => otherWeekMythic(week.period - 1)}
                ></Button>
                <div>
                  <p className="text-base md:text-lg pt-2 px-2 md:px-6">
                    {week.startWeek} - {week.endWeek}
                  </p>
                  <Button
                    className={`text-sm md:text-lg cursor-pointer transform transition duration-150 ease-in-out ${week.period !== currentPeriod ? 'visible hover:scale-110 active:scale-95 active:translate-y-1' : 'invisible'}`}
                    onClick={() => week.period !== currentPeriod && otherWeekMythic(currentPeriod)}
                    variant={'none'}
                  >
                    Revenir à cette semaine
                  </Button>
                </div>
                <Button
                  className="bg-[url('../public/fleche-mythic.webp')] bg-contain bg-no-repeat w-16 transform hover:scale-110 transition duration-150 ease-in-out active:scale-95 active:translate-y-1  "
                  variant={'none'}
                  onClick={() => otherWeekMythic(week.period + 1)}
                ></Button>
              </div>
              {/* Barre filtrage / option */}
              <Setting
                guildId={guild.id ?? ''}
                mythicObjective={mythicObjective[0]}
                isCurrentPeriod={week.period === currentPeriod}
              />
            </div>
          </div>
          {/* PODIUM */}
          <Podium members={members} />
        </div>

        {/* Card members mythics */}
        <MythicCard members={members} />
      </div>
    </>
  );
}
