import React from "react";

import logo1 from "assets/images/logo1.png";
import moment from "moment";
import PropTypes from "prop-types";

export default function GenerateDech({ interventionStatus, destination }) {
  const toPrint = () => {
    var mywindow = window.open("", "PRINT", "height=400,width=600");
    const elem = document.getElementById("fichPrint").cloneNode(true);
    elem.querySelector("#impBtn").remove();
    mywindow.document.write("<html><head><title>Fiche</title>");
    mywindow.document.write(
      "<style>.flex{display:flex;}.justify-between{justify-content: space-between;}.text-center{text-align: center;}</style>"
    );
    mywindow.document.write("</head><body>");
    mywindow.document.write(elem.innerHTML);
    mywindow.document.write("</body></html>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;
  };
  const formatDate = (createdAt) => {
    return moment(createdAt).format("YYYY-MM-DD HH:mm:ss"); // Adjust the format as needed
  };

  return (
    <div id="fichPrint" className="w-full bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div style={{ width: "300px", height: "auto" }}>
          <img src={logo1} alt="Logo" style={{ width: "100%", height: "auto" }} />
        </div>
        <h2 style={{ width: "100%" }} className="font-bold text-center text-2xl flex-grow py-5">
          Decharge d envoi
        </h2>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Ref decharge :{" "}
            <span className="font-bold">
              {interventionStatus ? interventionStatus.id : "Loading..."}
            </span>
          </p>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Depart :{" "}
            <span className="font-bold">
              {interventionStatus ? interventionStatus.local : "Loading..."}boutique Bardo
            </span>
          </p>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Destination : <span className="font-bold">{destination}</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Date :{" "}
            <span className="font-bold">
              {new Date(
                interventionStatus ? formatDate(interventionStatus.createdAt) : "Loading..."
              ).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
      <table className="mt-5 w-full border-collapse">
        <tbody>
          <tr className="bg-gray-200">
            <td className="px-4 py-2 border text-center font-bold">Marque</td>
            <td className="px-4 py-2 border text-center font-bold">Modele</td>
            <td className="px-4 py-2 border text-center font-bold">Num Serie</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border text-center">
              {interventionStatus ? interventionStatus.brand : "Loading..."}
            </td>
            <td className="px-4 py-2 border text-center">
              {interventionStatus ? interventionStatus.model : "Loading..."}
            </td>
            <td className="px-4 py-2 border text-center">
              {interventionStatus ? interventionStatus.imei : "Loading..."}
            </td>
          </tr>
        </tbody>
      </table>
      <div id="impBtn" className="flex justify-center mt-4">
        <button onClick={toPrint} className="custom-btn btn-5" style={{ width: "300px" }}>
          Imprimer fiche / Export PDF
        </button>
      </div>
    </div>
  );
}
GenerateDech.propTypes = {
  interventionStatus: PropTypes.shape({
    id: PropTypes.number,
    local: PropTypes.string,
    createdAt: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    imei: PropTypes.string,
  }),
  destination: PropTypes.string.isRequired,
};
