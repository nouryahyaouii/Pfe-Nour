import React from "react";
import { clientInfoPropTypes } from "./FicheInterventionPropTypes"; // Import de la validation de type
import "index.css";
import "output.css";

export default function FicheIntervention({ clientInfo }) {
  const toPrint = () => {
    // Open a new window for printing
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    // Create a copy of the component element for printing
    const elem = document.getElementById("fichPrint").cloneNode(true);

    // Remove the button from the copied element
    elem.querySelector("#impBtn").remove();

    // Write the copied element content to the new window
    mywindow.document.write("<html><head><title>Fiche</title>");
    mywindow.document.write(
      "<style>.flex{display:flex;}.justify-between{justify-content: space-between;}.text-center{text-align: center;}</style>"
    );
    mywindow.document.write("</head><body>");
    mywindow.document.write(elem.innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

    return true;
  };

  return (
    <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <img
          src="/assets/img/logo1.png"
          alt="Logo"
          className="mr-4"
          style={{ width: "150px", height: "auto" }}
        />
        {/* Title */}
        <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">
          Fiche d Intervention
        </h2>
      </div>
      {/* Num Recu */}
      <div className="flex justify-between mb-4">
        <p className="text-sm font-medium text-gray-700">
          Num Recu : <span className="font-bold">value</span>
        </p>
        {/* Date and Boutique */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Date : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Boutique : <span className="font-bold">value</span>
          </p>
        </div>
      </div>
      {/* Informations client section */}
      <h2 className="font-bold mb-4">Informations client</h2>
      <div className="flex justify-between mb-4">
        {/* Left side */}
        <div className="w-1/2 pr-4">
          <p className="text-sm font-medium text-gray-700">
            Nom : <span className="font-bold">{clientInfo.nom}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Num Cin/passeport : <span className="font-bold">{clientInfo.numCin}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Num Tel 1 : <span className="font-bold">{clientInfo.numTel1}</span>
          </p>
        </div>
        {/* Right side */}
        <div className="w-1/2 pl-4">
          <p className="text-sm font-medium text-gray-700">
            Prénom : <span className="font-bold">{clientInfo.prenom}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Num Tel 2 : <span className="font-bold">{clientInfo.numTel2}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Email : <span className="font-bold">{clientInfo.email}</span>
          </p>
        </div>
      </div>
      {/* Material section */}
      <h2 className="font-bold mb-4">Material</h2>
      <div className="flex justify-between mb-4">
        {/* Left side */}
        <div className="w-1/2 pr-4">
          <p className="text-sm font-medium text-gray-700">
            Date d achat : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Marque : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Num serie/IMEI : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Num Serie Batterie : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Code de produit : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Sous garantie : <span className="font-bold">value</span>
          </p>
        </div>
        {/* Right side */}
        <div className="w-1/2 pl-4">
          <p className="text-sm font-medium text-gray-700">
            Modèle : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Produit en service : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Type de panne : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Etat terminal : <span className="font-bold">value</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Accessoires : <span className="font-bold">value</span>
          </p>
        </div>
      </div>
      {/* Signature section */}
      <div className="flex justify-between mb-4">
        {/* Client's signature */}
        <p className="text-sm font-medium text-gray-700 flex items-center">Signature Client :</p>
        {/* Responsable's signature */}
        <p className="text-sm font-medium text-gray-700 flex justify-end items-center">
          Signature Responsable :
        </p>
      </div>
      {/* Empty divs */}
      <div className="flex justify-between mb-4">
        {/* Empty div with flex start */}
        <div className="flex-start-box w-32 h-12 bg-white border border-black rounded"></div>
        {/* Empty div with flex end */}
        <div className="flex-end-box w-32 h-12 bg-white border border-black rounded"></div>
      </div>
      <div id="impBtn" className="flex justify-center mt-4">
        <button onClick={toPrint} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Imprimer
        </button>
      </div>
    </div>
  );
}
// Définir la validation de type pour clientInfo en important la validation de type depuis le fichier externe
FicheIntervention.propTypes = {
  clientInfo: clientInfoPropTypes,
};
