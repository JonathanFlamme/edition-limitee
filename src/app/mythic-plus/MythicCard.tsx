import { MemberType } from '@/@type/type';
import { DateTime } from 'luxon';
import Image from 'next/image';
import podium from '@/public/podium.jpg';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { cinzel } from '@/src/utils/font';

export default function MythicCard({ members }: { members: MemberType[] }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-3 justify-items-center text-center overflow-y-auto ">
      {/* PODIUM */}
      <Image className="md:hidden" src={podium} alt="podium" width={250} height={250} />
      {members?.map((member) => (
        <div key={member.id} className="relative">
          <Avatar className="absolute top-[2.1rem] left-[4.6rem] md:top-[2.25rem] md:left-[4.5rem] w-[3.25rem] h-[3.25rem] z-0 rounded-xl">
            <AvatarImage
              src={`https://render.worldofwarcraft.com/eu/character/${member.avatar}`}
              alt="image profil bnet"
            />
          </Avatar>
          {/* Title mythic Card */}

          <div className="bg-[url('../public/parchment3.webp')] bg-[length:100%_100%] bg-no-repeat bg-bottom relative h-[20rem] w-[21rem] md:w-[21rem] md:h-[21rem] py-5 px-8">
            <div className="relative flex justify-between text-2xl font-bold px-2 mb-20">
              <div
                className={`${cinzel.className} absolute left-28 top-3 text-[#daa520] text-stroke-light`}
              >
                {member.name}
              </div>
              <div
                style={{
                  color:
                    member.colorRating?.a === 0
                      ? 'white'
                      : `rgba(${member.colorRating?.r}, ${member.colorRating?.g}, ${member.colorRating?.b}, ${member.colorRating?.a})`,
                }}
                className="absolute left-44 top-11 text-stroke-light"
              >
                {member.mythicRating}
              </div>
            </div>
            {/* List mythics */}
            {member.mythics?.length ? (
              member.mythics.map((mythic) => (
                <div
                  key={mythic.id}
                  className="flex flex-col text-left text-sm md:text-base px-8 md:px-6 pb-2"
                >
                  <div className="flex text-stroke-light text-white flex-row justify-between">
                    <p>{mythic.name}</p>
                    <p>+{mythic.key}</p>
                  </div>
                  <p className="flex text-stroke-light text-white">
                    {DateTime.fromISO(mythic.date.toString()).toFormat('dd/MM/yyyy')}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-sm md:text-base my-2 pt-10 text-stroke-light text-white">
                Aucun donjon mythique fait
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
