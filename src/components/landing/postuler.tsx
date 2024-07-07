import { useForm } from 'react-hook-form';
import { sendPostulation } from '@/src/utils/send-postulation';
import { PostulationType } from '@/@type/postulation';
import { jost } from '@/src/utils/font';
import { useRef, useState } from 'react';

const Postuler = () => {
  const { register, handleSubmit } = useForm<PostulationType>();
  const [afterSubmit, setAfterSubmit] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  async function onSubmit(formData: PostulationType) {
    const response = await sendPostulation(formData);
    if (response) {
      setAfterSubmit(true);
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Une erreur est survenue, veuillez réessayer');
    }
  }

  return (
    <div
      ref={divRef}
      id="postuler"
      className="m-auto bg-black bg-opacity-50 flex flex-col items-center justify-center py-20"
    >
      <div className=" text-white px-5 w-[360px] md:px-0 md:w-[960px] ">
        <h1 className={`${jost.className} text-4xl font-bold pb-10`}>Vos informations :</h1>
        {!afterSubmit ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <label htmlFor="pseudo" className="text-2xl">
              Pseudo IG :
            </label>
            <input
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-white"
              type="text"
              id="pseudo"
              placeholder="Votre pseudo en jeu"
              {...register('pseudo', { required: true })}
              required
            />
            <label htmlFor="btag" className="text-2xl pt-5">
              Battle Tag :
            </label>
            <input
              type="text"
              id="btag"
              placeholder="Pseudo#1234"
              {...register('btag', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-white"
            />
            <label htmlFor="raiderIo" className="text-2xl pt-5">
              Lien Raider.io :
            </label>
            <input
              type="text"
              id="raiderIo"
              placeholder="https://raider.io/characters/"
              {...register('raiderIo', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50 placeholder-white"
            />
            <label htmlFor="Classe" className="text-2xl pt-5">
              Classe :
            </label>
            <select
              id="classe"
              {...register('classe', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
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
            <label htmlFor="specialisation" className="text-2xl pt-5">
              Spécialisation :
            </label>
            <select
              id="specialisation"
              {...register('specialisation', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="tank">Tank</option>
              <option value="heal">Heal</option>
              <option value="dpscac">DPS Cac</option>
              <option value="dpsdistant">DPS Distant</option>
            </select>
            <label htmlFor="extension" className="text-2xl pt-5">
              Extension de démarrage :
            </label>
            <select
              id="extension"
              {...register('extension', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
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
            <label htmlFor="Difficulteraid" className="text-2xl pt-5">
              Difficulté Raid :
            </label>
            <select
              id="Difficulteraid"
              {...register('difficulteRaid', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
            >
              <option value="normal">Normal</option>
              <option value="heroique">Héroique</option>
              <option value="mythique">Mythique</option>
            </select>
            <label htmlFor="codeSecret" className="text-2xl pt-5">
              Code secret (dans la charte) :
            </label>
            <input
              type="text"
              id="codeSecret"
              {...register('codeSecret', { required: true })}
              className="text-black text-xl pl-2 h-10 border-2 border-black bg-white bg-opacity-50"
              required
            />
            <label htmlFor="presentezvous" className="text-2xl pt-5">
              Présentez vous en quelques lignes :
            </label>
            <textarea
              id="presentezvous"
              className="text-black text-xl pl-2 border-2 border-black bg-white bg-opacity-50"
              rows={4}
              cols={50}
              {...register('message', { required: true })}
            ></textarea>
            <div className="flex justify-end py-6">
              <button type="submit" value="Envoyer" className="border-4 border-white w-60 py-2">
                Soumettre ma candidature
              </button>
            </div>
          </form>
        ) : (
          <div className="text-4xl text-center py-60 text-white">
            <p>Merci de nous avoir contactés.</p>
            <p>Nous reviendrons vers vous dès que possible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Postuler;