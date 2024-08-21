import { Role } from '@/@type/role.enum';
import { Button } from '@/src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { useMythicsByBnet } from '@/src/hooks/useMythicsByBnet';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import MythicDescriptionForm from '../MythicDescriptionForm';
import { GuildType } from '@/@type/type';

export default function Setting({ guild }: { guild: Partial<GuildType> }) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState<boolean>(false);

  const { updateMythicsByBnet } = useMythicsByBnet();

  function updateTargetMythic() {
    setShowForm(!showForm);
  }

  return (
    <>
      <div>
        {session?.character?.role === Role.Officier ? (
          <div className="absolute top-28 left-3 md:top-44 md:left-10 text-left">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'ghost'}
                    onClick={() => updateMythicsByBnet()}
                    className="text-black font-bold py-1 px-3 rounded hover:bg-transparent"
                  >
                    <RotateCcw className="w-5 h-5 md:w-6 md:h-6 transform transition duration-300 ease-in-out hover:scale-125 hover:-rotate-180" />
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
                    <Settings className="w-5 h-5 md:w-6 md:h-6 transform transition duration-300 ease-in-out hover:scale-125 hover:rotate-90" />
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
      {showForm && (
        <div className="absolute w-3/4 md:w-2/4 top-1/2 z-10">
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
