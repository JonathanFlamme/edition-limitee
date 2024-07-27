'use client';

import { useForm } from 'react-hook-form';
import { PostulationType } from '@/@type/postulation';
import { jost, shadowsIntoLight } from '@/src/utils/font';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Image from 'next/image';
import merlin from '@/assets/gif/merlin.gif';
import TextareaAutosize from 'react-textarea-autosize';

const Postuler = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostulationType>({
    defaultValues: {
      pseudo: '',
      btag: '',
      raiderIo: '',
      classe: '',
      specialisation: '',
      extension: '',
      difficulteRaid: '',
      codeSecret: '',
      message: '',
    },
  });
  const [afterSubmit, setAfterSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    setValue('pseudo', session?.character?.name || '');
    setValue('btag', session?.user?.name || '');
    setValue(
      'raiderIo',
      `https://raider.io/characters/eu/${session?.character?.realm}/${session?.character?.name}` ||
        '',
    );
  }, [session, setValue]);

  async function onSubmit(formData: PostulationType) {
    setIsLoading(true);
    setAfterSubmit(true);
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
    const promise = fetch('/api/postulation', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    toast.promise(promise, {
      loading: 'Envoi en cours, veuillez patienter',
      success: 'Votre candidature a bien été envoyée',
      error: "Une erreur est survenue lors de l'envoi de votre candidature",
    });
    const res = await promise;
    if (res.ok) {
      setIsLoading(false);
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
      reset();
    } else {
      setIsLoading(false);
      setIsError(true);
      throw new Error('Failed to send postulation');
    }
  }

  return (
    <div
      ref={divRef}
      id="postuler"
      className={`${shadowsIntoLight.className} m-auto bg-black bg-opacity-50 flex flex-col items-center justify-center py-20`}
    >
      <div className=" text-white px-5 w-[360px] md:px-0 md:w-[960px] ">
        <h1 className={`${jost.className} text-4xl font-bold pb-10`}>Vos informations :</h1>
        {!afterSubmit ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            {/* PSEUDO */}
            <label htmlFor="pseudo" className="text-2xl">
              Pseudo IG :
            </label>
            <input
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-black"
              type="text"
              id="pseudo"
              placeholder="Votre pseudo en jeu"
              {...register('pseudo', { required: true })}
              defaultValue={session?.character?.name || ''}
            />
            {errors.pseudo && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* BATTLE TAG */}
            <label htmlFor="btag" className="text-2xl pt-5">
              Battle Tag :
            </label>
            <input
              type="text"
              id="btag"
              placeholder="Pseudo#1234"
              {...register('btag', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-black"
              defaultValue={session?.user?.name || ''}
            />
            {errors.btag && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* RAIDER IO */}
            <label htmlFor="raiderIo" className="text-2xl pt-5">
              Lien Raider.io :
            </label>
            <input
              type="text"
              id="raiderIo"
              placeholder="https://raider.io/characters/"
              {...register('raiderIo', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-black"
              defaultValue={
                `https://raider.io/characters/eu/${session?.character?.realm}/${session?.character?.name}` ||
                ''
              }
            />
            {errors.raiderIo && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* CLASSE */}
            <label htmlFor="classe" className="text-2xl pt-5">
              Classe :
            </label>
            <select
              id="classe"
              {...register('classe', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="" disabled hidden>
                Sélectionnez votre classe
              </option>
              <option value="druide">Druide</option>
              <option value="guerrier">Guerrier</option>
              <option value="demoniste">Démoniste</option>
              <option value="voleur">Voleur</option>
              <option value="paladin">Paladin</option>
              <option value="pretre">Prêtre</option>
              <option value="chasseur">Chasseur</option>
              <option value="mage">Mage</option>
              <option value="chaman">Chaman</option>
              <option value="moine">Moine</option>
              <option value="dh">Chasseur de démon</option>
              <option value="dk">Chevalier de la mort</option>
              <option value="evocateur">Evocateur</option>
            </select>
            {errors.classe && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* SPECIALISATION */}
            <label htmlFor="specialisation" className="text-2xl pt-5">
              Spécialisation :
            </label>
            <select
              id="specialisation"
              {...register('specialisation', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="" disabled hidden>
                Sélectionnez votre spécialisation
              </option>
              <option value="tank">Tank</option>
              <option value="heal">Heal</option>
              <option value="dpscac">DPS Cac</option>
              <option value="dpsdistant">DPS Distant</option>
            </select>
            {errors.specialisation && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/*Extension de démarrage */}
            <label htmlFor="extension" className="text-2xl pt-5">
              Extension de démarrage :
            </label>
            <select
              id="extension"
              {...register('extension', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="" disabled hidden>
                Sélectionnez l&apos;extension de démarrage
              </option>
              <option value="vanilla">Vanilla</option>
              <option value="bc">Burning Crusade</option>
              <option value="wotlk">Wrath of the Lich King</option>
              <option value="cataclysme">Cataclysme</option>
              <option value="mop">Mist of Pandaria</option>
              <option value="wod">World of Draenor</option>
              <option value="legion">Légion</option>
              <option value="bfa">Battle for Azeroth</option>
              <option value="shadowlands">Shadowlands</option>
              <option value="dragonflight">Dragonflight</option>
              <option value="theWarWithin">The War Within</option>
            </select>
            {errors.extension && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* Difficulté Raid */}
            <label htmlFor="difficulteraid" className="text-2xl pt-5">
              Difficulté Raid :
            </label>
            <select
              id="difficulteraid"
              {...register('difficulteRaid', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="" disabled hidden>
                Selectionner la difficulté du raid
              </option>
              <option value="normal">Normal</option>
              <option value="heroique">Héroique</option>
              <option value="mythique">Mythique</option>
            </select>
            {errors.difficulteRaid && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* Code Secret */}
            <label htmlFor="codeSecret" className="text-2xl pt-5">
              Code secret (dans la charte) :
            </label>
            <input
              type="text"
              id="codeSecret"
              {...register('codeSecret', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            />
            {errors.codeSecret && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* Message */}
            <label htmlFor="message" className="text-2xl pt-5">
              Présentez vous en quelques lignes :
            </label>
            <TextareaAutosize
              id="message"
              className="text-black text-xl pl-2 border-2 border-black bg-white bg-opacity-50"
              minRows={4}
              cols={50}
              {...register('message', { required: true })}
            ></TextareaAutosize>
            {errors.message && (
              <p className="text-white bg-red-700 p-2 mt-1 rounded w-fit">
                Vous devez remplir ce champ
              </p>
            )}
            {/* Submit */}
            <div className="flex justify-end py-6">
              <button
                type="submit"
                value="Envoyer"
                className="border-4 border-white w-60 py-2"
                disabled={isLoading}
              >
                Soumettre ma candidature
              </button>
            </div>
          </form>
        ) : (
          <>
            {isLoading ? (
              <>
                <Image src={merlin} alt="Loading..." className="m-auto" width={700} />
                <p className="text-center md:text-2xl mt-4">
                  Merlin envoie votre candidature, un peu de patience...
                </p>
              </>
            ) : (
              <div className="text-4xl text-center py-60 text-white">
                {isError ? (
                  <>
                    <p>Votre candidature n&apos;a pas été envoyée.</p>
                    <p>Une erreur est survenue lors de l&apos;envoi. Veuillez réessayer.</p>
                  </>
                ) : (
                  <>
                    <p>Merci de nous avoir contactés.</p>
                    <p>Nous reviendrons vers vous dès que possible.</p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Postuler;
