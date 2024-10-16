import React from 'react';
import Image from 'next/image';
import biblio from '@/public/biblio.jpg';
import livre1 from '@/public/livre1.jpg';
import livre2 from '@/public/livre2.jpg';
import livre3 from '@/public/livre3.jpg';
import livre4 from '@/public/livre4.jpg';
import livre5 from '@/public/livre5.jpg';
import livre6 from '@/public/livre6.jpg';
import { jost } from '@/src/utils/font';

const CharteDeGuilde = () => {
  return (
    <div id="charte">
      <div className="bloc_page bg-black text-black pt-10">
        <div className="bg-charte md:w-[960px] m-auto pb-20">
          <h1 className="text-3xl md:text-6xl font-bold text-center py-10">
            Charte de la guilde Edition Limitée
          </h1>
          <h2 className="px-6 py-3 text-3xl font-bold">Préface</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row items-end justify-between px-6 pb-6`}
          >
            <div className="text-left font-light text-lg">
              <p>
                Nous sommes une guilde conviviale et familiale. Nous visons le clean HM et selon
                votre motivation goûter au MM.
              </p>
              <p>
                L’humour et la camaraderie sont à l’ordre du jour, ainsi que le sérieux et
                l’application lors des try.
              </p>
              <p>
                La vie IRL est prioritaire tout en gardant à l’esprit qu’un groupe entier compte sur
                vous les soirs de raid.
              </p>
              <p>Nos règles sont plus une histoire de bon sens que de contraintes.</p>
            </div>
            <div className="pt-7 md:pt-0 pl-7">
              <Image width={500} src={biblio} alt="image bibliotèque" />
            </div>
          </div>

          <h2 className="px-6 pt-10 text-3xl font-bold">Chapitre 1</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row-reverse items-start justify-between px-6 py-4`}
          >
            <div className="text-left font-light text-lg">
              <h4 className="font-medium text-lg mb-2">Vie de guilde</h4>
              <p>
                Afin de garantir une bonne cohésion du groupe, nous demandons à nos membres de se
                joindre aux différentes activités proposées et ceci aussi souvent que leur temps de
                jeu le leur permet.
              </p>
              <p>
                Parmi ces activités, vous trouverez une soirée M+, le farm de guilde, la chasse aux
                montures, jouets, mascottes, transmos ou autres HF ainsi que les rerools.
              </p>
              <p>La présence aux deux soirs de raid est quant à elle obligatoire.</p>
              <p>
                WoW est le reflet de ce que ses joueurs en font. Nous demandons donc à nos membres
                de se comporter correctement en tout temps, que ce soit en guilde ou en dehors.
              </p>
              <p>
                Tout le monde ne peut pas être aussi loquace que certains de nos guildeux mais
                quelques mots sur le chat de guilde en arrivant et en partant sont plus
                qu’appréciés…
              </p>
            </div>
            <div className="flex justify-start pr-7 pt-7 m:pt-0">
              <Image width={600} src={livre1} alt="image livre 1" />
            </div>
          </div>
          <h2 className="px-6 pb-3 pt-10 text-3xl font-bold">Chapitre 2</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row items-start justify-between px-6`}
          >
            <div className="text-left font-light text-lg md:w-[1200px]">
              <h4 className="font-medium text-lg mb-2">Préparatifs</h4>

              <p>Une bonne préparation est la clé du succès.</p>
              <p>
                Nos membres doivent connaître leur perso, s’informer des changements afin de rester
                le plus optimisés possible.
              </p>
              <p>Ils se présentent en raid gemmés et enchantés.</p>
              <p>
                Des enchantements ainsi que des gemmes sont disponibles dans la BDG pour les membres
                du roster.
              </p>
              <p>
                Nos membres acceptent de recevoir des remarques constructives afin d’améliorer leur
                perso ou leur gameplay.
              </p>
              <p>
                Nous posons un chaudron pendant les soirs de raid. Néanmoins, nous vous demandons
                d’avoir toujours vos propres compos sur vous.
              </p>
              <p>
                L’installation de certains addons est obligatoire : DBM ou BigWigs, WeakAuras ou
                tout autre addon d’alerte (GTFO) et Method raid tools.
              </p>
              <p>
                l’ID du raid sur lequel nous sommes en progress doit être gardée pour les soirs de
                raid. Le mardi, vous en faites ce que vous voulez.
              </p>
            </div>
            <div className="justify-end font-light pl-7 pt-7 md:pt-0">
              <Image width={500} src={livre2} alt="image libre 2" />
            </div>
          </div>
        </div>
      </div>
      <div className="bloc_page bg-black text-black  py-10">
        <div className="bg-charte md:w-[960px] m-auto pb-10">
          <h1 className="text-3xl md:text-6xl font-bold text-center pt-10">
            Charte de la guilde Edition Limitée
          </h1>
          <h2 className="px-6 pb-3 pt-10 text-3xl font-bold">Chapitre 3</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row-reverse items-start justify-between px-6`}
          >
            <div className="text-left font-light text-lg">
              <h4 className="font-medium text-lg mb-2">Les raids</h4>

              <p>
                Les soirées raid ont lieu le mercredi et le lundi de 21h00 à 23h30. Nos membres sont
                attendus à 20h45. Les TP se font jusqu’à 20h55. Les retardataires viennent à pied à
                moins qu’ils aient une excellente excuse (aléas IRL) et que les officiers aient été
                prévenus.
              </p>
              <p>
                En raid, nos membres feront preuve de patience et de compréhension pendant les try.
                Nous avançons au rythme du groupe.
              </p>
              <p>
                Afin d&apos;intégrer les soirs de raid et de s&apos;assurer du maintient
                d&apos;équilibre entre les joueurs un pré-requis mm+ est défini par semaine.
              </p>
              <p>
                Sur les trashs, le vocal est libre. Pendant les try, le vocal est réservé au RL, aux
                officiers et aux tanks, éventuellement aux heals si besoin.
              </p>
              <p>
                Les loots sont soumis au système de rand wow, cependant vous devrez faire preuve de
                bon sens et de générosité afin d&apos;avoir une équité. Le groupe d’offis peut vous
                demander de remettre au rand un loot dans le cas ou vous seriez trop chanceux.
              </p>
              <p>
                Les LQE sont à proposer également. Si aucun raideur ne les need (en tant que BIS),
                la guilde ne les réclamera pas
              </p>
            </div>
            <div className="flex justify-start pr-7 pt-7 md:pt-3">
              <Image width={500} src={livre3} alt="image bibliotèque" />
            </div>
          </div>

          <h2 className="px-6 pb-3 pt-10 text-3xl font-bold">Chapitre 4</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row items-start justify-between px-6`}
          >
            <div className="text-left font-light text-lg">
              <h4 className="font-medium text-lg mb-2">Contacts</h4>

              <p>Les décisions importantes sont prises par Tweetÿ et les officiers.</p>
              <p>
                Ces mêmes personnes se réservent le droit de refuser de prendre un joueur en raid si
                les conditions minimales ne sont pas respectées.
              </p>
              <p>La présence aux deux soirs de raid est quant à elle obligatoire.</p>
              <p>
                C&apos;est également à l&apos;une de ces personnes que vous enverrez « Hakuna Matata
                » en tant que code secret dans votre postulation.
              </p>
              <p>Les guildeux enverront ce code pour valider la lecture des règles mises à jour.</p>
            </div>
            <div className="justify-end pl-7 pt-7 md:pt-0">
              <Image width={600} src={livre4} alt="image livre 1" />
            </div>
          </div>

          <h2 className="px-6 pb-3 pt-10 text-3xl font-bold">Chapitre 5</h2>
          <div
            className={`${jost.className} flex flex-col md:flex-row-reverse items-start justify-between px-6`}
          >
            <div className="text-left font-light text-lg">
              <h4 className="font-medium text-lg mb-2">Discord</h4>
              <p>
                Afin de partager de bons moments ensemble en faisant vivre notre Discord, nous vous
                demandons de :
              </p>
              <ul className="list-disc text-base pl-10 pt-2">
                <li>
                  Vous connecter au Discord pour toutes activités communes (à partir de 2) IG.
                </li>
                <li>Respecter les autres utilisateurs et ne pas les insulter.</li>
                <li>Ne pas partager de contenu illégal, dangereux ou offensant.</li>
                <li>
                  Éviter les conversations sensibles et ne pas partager d&apos;informations
                  personnelles.
                </li>
                <li>Ne pas spammer le chat avec des messages inutiles.</li>
                <li>Ne pas utiliser de langage vulgaire ou offensant.</li>
                <li>Éviter les conversations politiques ou religieuses.</li>
                <li>Ne pas partager de liens vers des sites malveillants.</li>
                <li>Respecter les modérateurs et les administrateurs du serveur.</li>
              </ul>
            </div>
            <div className="flex justify-start pr-7 pt-7 md:pt-3">
              <Image width={400} src={livre6} alt="image bibliotèque" />
            </div>
          </div>
          <h2 className="px-6 pb-3 pt-10 text-3xl font-bold">Epilogue</h2>
          <div className={`${jost.className} flex flex-col items-left px-6`}>
            <div className="text-left font-light text-lg pb-10">
              <p>
                L’histoire ne s’arrête pas là ! Rejoignez-nous pour écrire les nouveaux chapitres de
                notre aventure World of Warcraft !
              </p>
            </div>
            <div className="justify-end pl-7 m-auto">
              <Image width={500} src={livre5} alt="image libre 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharteDeGuilde;
