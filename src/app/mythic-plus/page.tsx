'use client';
import { MemberType } from '@/@type/type';
import { jost } from '@/src/utils/font';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function MythiquePlus() {
  const [members, setMembers] = useState<MemberType[]>([]);
  const { data: session } = useSession();

  async function updateMythic() {
    const res = await fetch('/api/mythic-plus', {
      method: 'POST',
    });

    const members: MemberType[] = await res.json();
    setMembers(members);
    // console.log(members);
  }

  return (
    <div className={`${jost.className} page-container min-h-screen h-full flex gap-3`}>
      <div className="custom-container text-xl basis-1/6 text-center pt-4">
        <ul>
          {members.map((member) => (
            <li className="mb-2" key={member.id}>
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 basis-5/6 text-center">
        <div className="flex gap-3">
          <button
            onClick={() => updateMythic()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
          <div className="custom-container h-36 basis-2/3 text-center">Titre et infos diverse</div>
          <div className="custom-container h-36 basis-1/3 text-center">Podium</div>
        </div>

        <div className="w-full grid grid-cols-4 gap-3 text-center overflow-auto">
          {/* <div className=""> */}
          {members.map((member) => (
            <div key={member.id} className="custom-container p-2">
              <div className="font-bold">{member.name}</div>
              {member.mythic.length ? (
                member.mythic.map((mythic) => (
                  <>
                    <ul key={mythic.id} className="flex flex-row gap-4 list-none">
                      <li>{mythic.name}</li>
                      <li>+{mythic.key}</li>
                    </ul>
                    <ul key={mythic.id} className="text-left mb-2">
                      <li>{mythic.dateTime.toString()}</li>
                    </ul>
                  </>
                ))
              ) : (
                <div className="mt-2">Aucun donjon mythique fait</div>
              )}
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
