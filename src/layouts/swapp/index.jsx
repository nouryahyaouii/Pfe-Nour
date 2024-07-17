import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import moment from "moment";

export default function SwapItems({ data, onReplaceTerminal }) {
  const [interventionData, setInterventionData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const printRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8089/api/v1/springfever/api/user/getallSwapps")
      .then((response) => {
        console.log(response.data);
        setInterventionData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && data.imei) {
          const response = await axios.get(
            `http://localhost:8089/api/v1/springfever/api/intervention/getInterventionbyImei/${data.imei}`
          );
          setInterventionData(response.data);
        }
      } catch (error) {
        console.error("Error fetching intervention information:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleReplaceTerminal = (device) => {
    setSelectedDevice(device);
    setShowPopup(true);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setShowForm(false);
  };

  const handleConfirm = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIMEI = formData.get("newIMEI");

    setShowPopup(false);
    setShowForm(false);
    onReplaceTerminal({ newIMEI });
  };

  const handleGenerateTicket = () => {
    const ticketDetails = {
      imei: selectedDevice.imei,
      marque: selectedDevice.brand,
      modele: selectedDevice.model,
      date: new Date().toLocaleDateString(),
      prix: selectedDevice.price,
    };
    setTicketData(ticketDetails);
    setShowTicket(true);
  };

  const toPrint = () => {
    const content = printRef.current;
    if (content) {
      const pri = document.createElement("iframe");
      document.body.appendChild(pri);
      pri.style.display = "none";
      pri.contentDocument.write(content.outerHTML);
      pri.contentWindow.print();
      document.body.removeChild(pri);
    } else {
      console.error("Print content is not available");
    }
  };

  const formatDate = (createdAt) => {
    return moment(createdAt).format("YYYY-MM-DD"); // Adjust the format as needed
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!showTicket ? (
        <>
          <div className="mt-8 flex justify-center">
            <div className="w-full bg-white p-4 rounded-lg">
              <h2 className="text-3xl font-bold text-center">
                Suivi des terminaux en attente de swap
              </h2>
              <table className="mt-5 w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                    <th className="px-4 py-2 border text-center font-bold">Marque</th>
                    <th className="px-4 py-2 border text-center font-bold">Modele</th>
                    <th className="px-4 py-2 border text-center font-bold">IMEI</th>
                    <th className="px-4 py-2 border text-center font-bold">N°serie batterie</th>
                    <th className="px-4 py-2 border text-center font-bold">
                      Date de fiche d intervention
                    </th>
                    <th className="px-4 py-2 border text-center font-bold">Retard</th>
                    <th className="px-4 py-2 border text-center font-bold">Swapp</th>
                  </tr>
                </thead>
                <tbody>
                  {interventionData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 border text-center">{item.id}</td>
                      <td className="px-4 py-2 border text-center">{item.brand}</td>
                      <td className="px-4 py-2 border text-center">{item.model}</td>
                      <td className="px-4 py-2 border text-center">{item.imei}</td>
                      <td className="px-4 py-2 border text-center">{item.batterie || "50987"}</td>
                      <td className="px-4 py-2 border text-center">{formatDate(item.createdAt)}</td>
                      <td className="px-4 py-2 border text-center">{item.status}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() => handleReplaceTerminal(item)}
                          className="custom-btn btn-5"
                        >
                          Swapp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {showPopup && selectedDevice && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                {!showForm ? (
                  <>
                    <p className="text-3xl font-semibold mb-4">Remplacement Produit</p>
                    <p className="text-xl font-semibold mb-4">Produit Disponible</p>
                    <hr className="my-4" />
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Nom du produit</th>
                          <th className="border px-4 py-2">Numero de série</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-normal">{selectedDevice.brand}</td>
                          <td className="border px-4 py-2 font-normal">{selectedDevice.imei}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleConfirm}
                        className="custom-btn btn-6"
                        style={{
                          padding: "15px 24px",
                          fontSize: "1.3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "170px",
                        }}
                      >
                        Remplacer
                      </button>
                      <button
                        onClick={handleGenerateTicket}
                        className="custom-btn btn-6"
                        style={{
                          padding: "15px 40px",
                          fontSize: "1.3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "auto",
                          textAlign: "center",
                          marginLeft: "-130px",
                        }}
                      >
                        Generer ticket achat sav
                      </button>
                    </div>
                    <button
                      onClick={handleCancel}
                      className="custom-btn btn-1 justify-items-end"
                      style={{
                        padding: "15px 240px",
                        fontSize: "1.3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Fermer
                    </button>
                  </>
                ) : (
                  <div className="mt-8 w-full bg-grey p-4 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <h3 className="text-3xl font-bold mb-8 flex justify-center items-center">
                        Materiel de Remplacement
                      </h3>
                      <div className="flex mb-4 flex-wrap">
                        <div className="mb-4 w-full md:w-1/2 pr-2">
                          <label htmlFor="imei" className="text-sm font-medium text-gray-700">
                            Num de série / IMEI :
                          </label>
                          <hr />
                          <input
                            type="text"
                            name="imei"
                            className="mt-1 p-2 w-full border rounded-lg"
                            required
                          />
                        </div>
                        <div className="mb-4 w-full md:w-1/2 pr-2">
                          <label htmlFor="marque" className="text-sm font-medium text-gray-700">
                            Marque :
                          </label>
                          <hr />
                          <input
                            type="text"
                            className="mt-1 p-2 w-full border rounded-lg"
                            value={selectedDevice.brand}
                            readOnly
                          />
                        </div>

                        <div className="mb-4 w-full md:w-1/2 pr-2">
                          <label htmlFor="modele" className="text-sm font-medium text-gray-700">
                            Modele :
                          </label>
                          <hr />
                          <input
                            type="text"
                            value={selectedDevice.model}
                            className="mt-1 p-2 w-full border rounded-lg"
                            readOnly
                          />
                        </div>
                        <div className="mb-4 w-full md:w-1/2 pr-2">
                          <label htmlFor="newIMEI" className="text-sm font-medium text-gray-700">
                            Numero de série de l appareil endommagé :
                          </label>
                          <hr />
                          <input
                            type="text"
                            value={selectedDevice.imei}
                            name="newIMEI"
                            className="mt-1 p-2 w-full border rounded-lg"
                            readOnly
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-center">
                        <div>
                          <button type="reset" onClick={handleCancel} className="custom-btn btn-5">
                            Annuler
                          </button>
                          <button className="custom-btn btn-5">Valider</button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#0000005c]">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div ref={printRef} className="flex items-center justify-center h-full">
              <h2 className="text-3xl font-semibold mb-4">Ticket d achat SAV</h2>
              <hr />
              <div className="mb-4">
                <p>
                  <strong>IMEI:</strong> {ticketData.imei}
                </p>
                <p>
                  <strong>Marque:</strong> {ticketData.marque}
                </p>
                <p>
                  <strong>Modele:</strong> {ticketData.modele}
                </p>
                <p>
                  <strong>Date:</strong> {ticketData.date}
                </p>
                <p>
                  <strong>Prix:</strong> {ticketData.prix}
                </p>
              </div>
            </div>
            <div id="impBtn" className="flex justify-center">
              <button onClick={toPrint} className="custom-btn btn-5">
                Imprimer
              </button>
              <button onClick={() => setShowTicket(false)} className="custom-btn btn-5">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

SwapItems.propTypes = {
  data: PropTypes.shape({
    imei: PropTypes.string,
  }),
  onReplaceTerminal: PropTypes.func,
};
