import React from 'react';

const Postuler = () => {
  return (
    <div id="bloc_postuler">
      <h1>Vos informations :</h1>
      {/* Formulaire pour postuler */}
      <form method="post" action="postuler.php">
        {/* Saisie du Pseudo */}
        <p>
          <label htmlFor="pseudo">Pseudo IG :</label>
          <br />
          <input type="text" name="pseudo" id="pseudo" required />
        </p>
        {/* Saisie du Battle tag */}
        <p>
          <label htmlFor="btag">Battle Tag :</label>
          <br />
          <input type="text" name="btag" id="btag" />
        </p>
        {/* Choix liste déroulante classe */}
        <p>
          <label htmlFor="classe">Classe :</label>
          <br />
          <select name="classe" id="classe">
            {/* Options pour la classe */}
          </select>
        </p>
        {/* Choix liste déroulante Spécialisation */}
        <p>
          <label htmlFor="specialisation">Spécialisation :</label>
          <br />
          <select name="specialisation" id="specialisation">
            {/* Options pour la spécialisation */}
          </select>
        </p>
        {/* Choix liste déroulante Extension de démarrage */}
        <p>
          <label htmlFor="extension">Extension de démarrage :</label>
          <br />
          <select name="extension" id="extension">
            {/* Options pour l'extension */}
          </select>
        </p>
        {/* Choix liste déroulante Difficulté Raid */}
        <p>
          <label htmlFor="Difficulteraid">Difficulté Raid :</label>
          <br />
          <select name="Difficulteraid" id="Difficulteraid">
            {/* Options pour la difficulté du raid */}
          </select>
        </p>
        {/* Saisie du Code Confidentiel */}
        <p>
          <label htmlFor="code">Code secret (dans la charte) :</label>
          <br />
          <input type="code" name="code" id="code" required />
        </p>
        {/* Zone de présentation */}
        <p>
          <label htmlFor="presentezvous">Présentez vous en quelques lignes :</label>
          <br />
          <textarea name="message" id="presentezvous" rows={4} cols={50}></textarea>
        </p>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default Postuler;
