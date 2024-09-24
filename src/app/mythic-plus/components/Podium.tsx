import { MemberType } from '@/@type/type';
import { cinzel } from '@/src/utils/font';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';

export default function Podium({ members }: { members: MemberType[] }) {
  const [bestMembersPodium, setBestMembersPodium] = useState<MemberType[]>([]);

  useEffect(() => {
    function podium() {
      const bestMembers = members
        .map((member) => {
          const bestMythic = member.mythics.reduce(
            (best, current) => {
              if (current.key > best.key) {
                return current;
              } else if (current.key === best.key) {
                // if same key, compare date
                return new Date(current.date) > new Date(best.date) ? current : best;
              } else {
                return best;
              }
            },
            member.mythics[0] || { key: 0, date: new Date() },
          );

          return {
            ...member,
            bestMyhic: bestMythic.key,
            bestMyhicDate: bestMythic.date,
          };
        })
        .sort((a, b) => {
          if (b.bestMyhic === a.bestMyhic) {
            return Number(new Date(b.bestMyhicDate)) + Number(new Date(a.bestMyhicDate));
          }
          return b.bestMyhic - a.bestMyhic;
        })
        .slice(0, 3);

      setBestMembersPodium(bestMembers);
    }

    podium();
  }, [members]);

  return (
    <div className="relative bg-[url('../public/podium.webp')] bg-contain bg-no-repeat h-56 hidden md:block mt-2 w-[20rem] ">
      <div
        style={{ animationDelay: '0.5s' }}
        className="absolute w-8 top-11 left-10 flex flex-col items-center animate-up-down"
      >
        <p className={`${cinzel.className} text-[#C0C0C0] text-stroke-light overflow-visible`}>
          {bestMembersPodium[1]?.name}
        </p>
        <Avatar className=" w-14 h-14 border border-gray-500 rounded-full overflow-hidden ">
          <AvatarImage
            src={`https://render.worldofwarcraft.com/eu/character/${bestMembersPodium[1]?.avatar}`}
            alt="image profil bnet"
            className="object-cover w-full h-full"
          />
        </Avatar>
      </div>
      <div className="absolute w-8 flex flex-col items-center top-8 left-[8.8rem] animate-up-down">
        <p className={`${cinzel.className} text-[#daa520] text-stroke-light`}>
          {bestMembersPodium[0]?.name}
        </p>
        <Avatar className="w-16 h-16 border border-gray-500 rounded-full overflow-hidden">
          <AvatarImage
            src={`https://render.worldofwarcraft.com/eu/character/${bestMembersPodium[0]?.avatar}`}
            alt="image profil bnet"
            className="object-cover w-full h-full"
          />
        </Avatar>
      </div>
      <div
        style={{ animationDelay: '1s' }}
        className="absolute w-8 top-14 left-[14.9rem] flex flex-col items-center animate-up-down"
      >
        <p className={`${cinzel.className} text-[#CD7F32] text-stroke-light`}>
          {bestMembersPodium[2]?.name}
        </p>
        <Avatar className="w-12 h-12 top-16 left-[13.5rem] border border-gray-500 rounded-full overflow-hidden">
          <AvatarImage
            src={`https://render.worldofwarcraft.com/eu/character/${bestMembersPodium[2]?.avatar}`}
            alt="image profil bnet"
            className="object-cover w-full h-full"
          />
        </Avatar>
      </div>
    </div>
  );
}
