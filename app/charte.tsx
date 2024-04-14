import React from 'react';
import Image from 'next/image';

const CharteDeGuilde = () => {
  return (
    <div className="bloc_page">
      <div className="bloc_chartedeguilde">
        <h1>Charte de la guilde Edition Limitée</h1>

        <h2>Préface</h2>
        <div className="charte">
          <p>
            Nous sommes une guilde conviviale et familiale. Nous visons le clean HM et selon votre
            motivation goûter au MM. L’humour et la camaraderie sont à l’ordre du jour, ainsi que le
            sérieux et l’application lors des try. La vie IRL est prioritaire tout en gardant à
            l’esprit qu’un groupe entier compte sur vous les soirs de raid. Nos règles sont plus une
            histoire de bon sens que de contraintes.
          </p>

          {/* <Image className="image_charte" src="image/biblio.jpg" alt="image bibliotèque" /> */}
        </div>

        <h2>Chapitre 1</h2>
        <div className="charte">
          {/* <Image className="image_charte" src="image/livre1.jpg" alt="image livre 1" /> */}
          <p>
            Afin de garantir une bonne cohésion du groupe, nous demandons à nos membres de se
            joindre aux différentes activités proposées et ceci aussi souvent que leur temps de jeu
            le leur permet. Parmi ces activités, vous trouverez une soirée M+, le farm de guilde, la
            chasse aux montures, jouets, mascottes, transmos ou autres HF ainsi que les rerools. La
            présence aux deux soirs de raid est quant à elle obligatoire. WoW est le reflet de ce
            que ses joueurs en font. Nous demandons donc à nos membres de se comporter correctement
            en tout temps, que ce soit en guilde ou en dehors. Tout le monde ne peut pas être aussi
            loquace que certains de nos guildeux mais quelques mots sur le chat de guilde en
            arrivant et en partant sont plus qu’appréciés…
          </p>
        </div>

        <h2>Chapitre 2</h2>
        <div className="charte">
          <p>
            Une bonne préparation est la clé du succès. Nos membres doivent connaître leur perso,
            s’informer des changements afin de rester le plus optimisés possible. Ils se présentent
            en raid gemmés et enchantés. Des enchantements ainsi que des gemmes sont disponibles
            dans la BDG pour les membres du roster. Nos membres acceptent de recevoir des remarques
            constructives afin d’améliorer leur perso ou leur gameplay. Nous posons un chaudron
            pendant les soirs de raid. Néanmoins, nous vous demandons d’avoir toujours vos propres
            compos sur vous. L’installation de 3 addons est obligatoire: DBM ou BigWigs, WeakAuras
            ou tout autre addon d’alerte (GTFO) et Best in slot redux ShadowLand. l’ID du raid sur
            lequel nous sommes en progress doit être gardée pour les soirs de raid. Le mardi, vous
            en faites ce que vous voulez.
          </p>
          {/* <Image className="image_charte" src="image/livre2.jpg" alt="image livre 2" /> */}
        </div>
      </div>

      <footer>
        <div id="postuler">
          <h1>Contact :</h1>
          <p>Tweetÿ : tweety#2358</p>
        </div>
        <div id="signature">
          <p>Joflamme</p>
        </div>
        <figure id="signature_jo">
          {/* <img id="treant" src="image/treant_jo2.jpg" alt="Logo treant" /> */}
          <figcaption>Joflamme</figcaption>
        </figure>
      </footer>
    </div>
  );
};

export default CharteDeGuilde;
