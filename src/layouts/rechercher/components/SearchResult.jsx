import PropTypes from "prop-types";
import "index.css";
import "output.css";

export default function SearchResult({ action, data }) {
  const restgarante = Math.max(
    data.guarante -
      Math.floor((Date.now() - new Date(data.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30)),
    0
  );

  const formattedDate = new Date(data.purchaseDate).toISOString().slice(0, 10);

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-10  justify-center items-center">
      <h2 className="text-3xl">informations des produits</h2>
      <div className="flex flex-col justify-end items-center gap-3">
        <hr className="w-20 border-2 border-gray-600" />
        <div className="flex flex-col">
          <p>
            Etat: <b>{data.status}</b>
          </p>
          <p>
            Date dachat: <b>{formattedDate}</b>
          </p>
          <p>
            Durée de garantie:{" "}
            <b>
              {data.guarante} <span>mois</span>
            </b>
          </p>
          <p>
            Reste de la durée de garantie:{" "}
            <b>
              {restgarante} <span>mois</span>
            </b>
          </p>
          <p>
            Nombre de retour SAV: <b>{data.nbRetourSav}</b>
          </p>
          <p>
            Terminal Assuré: <b>{data.terminal}</b>
          </p>
        </div>
        <hr className="w-20 border-2 border-gray-600" />
      </div>
      <div className="flex justify-center">
        <button onClick={() => action()} className="custom-btn btn-5">
          Créer Fichier
        </button>
      </div>
    </div>
  );
}
// Définir la validation de type pour les props
SearchResult.propTypes = {
  action: PropTypes.func.isRequired,
  data: PropTypes.shape({
    //etat: PropTypes.string.isRequired,
    guarante: PropTypes.string.isRequired,
    purchaseDate: PropTypes.number.isRequired, //PropTypes.instanceOf(Date).isRequired,
    terminal: PropTypes.string.isRequired,
    nbRetourSav: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    // Ajoutez d'autres propriétés de data au besoin
  }).isRequired,
};
