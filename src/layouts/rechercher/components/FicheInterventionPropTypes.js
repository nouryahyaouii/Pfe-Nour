import PropTypes from "prop-types";

export const clientInfoPropTypes = PropTypes.shape({
  nom: PropTypes.string.isRequired,
  numCin: PropTypes.string.isRequired,
  numTel1: PropTypes.string.isRequired,
  prenom: PropTypes.string.isRequired,
  numTel2: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // Ajoutez d'autres propriétés au besoin
}).isRequired;
