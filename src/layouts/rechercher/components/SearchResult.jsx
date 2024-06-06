import PropTypes from "prop-types";
import "index.css";
import "output.css";

export default function SearchResult({ action, data }) {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-10  justify-center items-center">
      <h2 className="text-2xl">information produits</h2>
      <div className="flex flex-col justify-end items-center gap-3">
        <hr className="w-20 border-2 border-gray-600" />
        <div className="flex flex-col">
          <p>
            Etat: <b>{data.etat}</b>
          </p>
          <p>
            Date d achat: <b>value</b>
          </p>
          <p>
            Durée de garantie: <b>value</b>
          </p>
          <p>
            Reste de la durée de garantie: <b>value</b>
          </p>
          <p>
            Nombre de retour SAV: <b>value</b>
          </p>
          <p>
            Terminal Assuré: <b>value</b>
          </p>
        </div>
        <hr className="w-20 border-2 border-gray-600" />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => action()}
          className="bg-green-500 px-4 py-2.5 rounded-lg  text-white text-sm font-bold"
        >
          Creer Fichier
        </button>
      </div>
    </div>
  );
}
// Définir la validation de type pour les props
SearchResult.propTypes = {
  action: PropTypes.func.isRequired,
  data: PropTypes.shape({
    etat: PropTypes.string.isRequired,
    // Ajoutez d'autres propriétés de data au besoin
  }).isRequired,
};
