import { Role } from '@/@type/role.enum';
import { MemberType, MythicType } from '@/@type/type';
import { authOptions } from '@/src/lib/auth';
import { HttpError } from '@/src/utils/customError';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse | undefined> {
  const session = await getServerSession(authOptions);
  if (session?.character?.role !== Role.Officier) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ---------- GET MEMBER GUILD ---------- //
  const res = await fetch(
    'https://eu.api.blizzard.com/data/wow/guild/elune/%C3%A9dition-limit%C3%A9e/roster?namespace=profile-eu',
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Battlenet-Namespace': 'profile-eu',
      },
    },
  );
  if (!res.ok) throw new HttpError('Failed to get guild roster', res.status);
  const guild = await res.json();

  // console.log('guild', guild.members);

  const rosters: MemberType[] = guild.members
    .filter(
      (member: MemberType) =>
        member.rank === 0 || member.rank === 2 || (member.rank >= 4 && member.rank <= 6),
    )
    .map((member: any) => ({
      id_character: member.character.id,
      name: member.character.name,
      realm: member.character.realm.slug,
    }));

  // ---------- GET BEST RUN MYTHIC PLUS ---------- //

  // console.log('roster', rosters);

  const rosterWithMythicPlus = await Promise.all(
    rosters.map(async (roster) => {
      const test = await fetch(
        `https://eu.api.blizzard.com/profile/wow/character/${roster.realm}/${roster.name.toLowerCase()}/mythic-keystone-profile?namespace=profile-eu`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Battlenet-Namespace': 'profile-eu',
          },
        },
      );
      const mythicPlus = await test.json();
      // console.log('mythicPLUS', mythicPlus.current_period?.best_runs);

      const mythics: any = (mythicPlus.current_period?.best_runs || [])
        .slice(0, 4)
        .map((mythic: any) => ({
          name: mythic.dungeon.name.fr_FR,
          dateTime: mythic.completed_timestamp,
          key: mythic.keystone_level,
        }));

      // console.log('mythics', mythics);
      return {
        ...roster,
        mythic: mythics,
      };
    }),
  );

  // console.log('rosterWithMythicPlus', rosterWithMythicPlus); // Afficher les données avec Mythic Plus intégrées
  // console.log('mythicPlus', rosterWithMythicPlus);

  // console.log('roster', roster);

  return NextResponse.json(rosterWithMythicPlus);
}
