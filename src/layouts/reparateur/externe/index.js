import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import GenerateDech from "layouts/reparateur/interne/decharge.jsx";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function RepExterne() {
  const [showGenerateDech, setShowGenerateDech] = useState(false);
  const [interventions, setInterventions] = useState([]);
  const [selectedInterventions, setSelectedInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8089/api/v1/springfever/api/intervention/externe"
      );
      setInterventions(response.data);
    } catch (error) {
      console.error("Error fetching interventions:", error);
    }
  };

  const handleCheckboxChange = (intervention) => {
    if (selectedInterventions.includes(intervention)) {
      setSelectedInterventions(selectedInterventions.filter((i) => i !== intervention));
    } else {
      setSelectedInterventions([...selectedInterventions, intervention]);
    }
  };
  const handleGenerateDechClick = () => {
    setShowGenerateDech(true);
  };
  const handleDechargeGenerated = () => {
    // Remove selected interventions from the interventions list
    setInterventions(
      interventions.filter((intervention) => !selectedInterventions.includes(intervention))
    );
    setSelectedInterventions([]); // Clear the selected interventions
    setShowGenerateDech(false); // Hide the GenerateDech component
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showGenerateDech ? (
        <GenerateDech
          selectedInterventions={selectedInterventions}
          onDechargeGenerated={handleDechargeGenerated}
        />
      ) : (
        <div className="mt-8 flex justify-center">
          <div className="w-full bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Selectionner un reparateur interne</h2>
            <div className="mt-4">
              <select
                className="px-3 py-2 rounded-lg border border-gray-300"
                style={{ width: "200px" }}
              >
                <option value="reparateur1">One Tel</option>
                <option value="reparateur2">Reparateur Externe 2</option>
                <option value="reparateur3">Reparateur Externe 3</option>
              </select>
            </div>
            <hr className="mt-5" />
            <h2 className="mt-5 text-2xl font-bold">
              Liste des articles a expedier aux reparateurs interne
            </h2>
            <table className="mt-5 w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border text-center font-bold">
                    <input type="checkbox" className="mx-auto" />
                  </th>
                  <th className="px-4 py-2 border text-center font-bold">Num Fiche</th>
                  <th className="px-4 py-2 border text-center font-bold">Marque</th>
                  <th className="px-4 py-2 border text-center font-bold">Modele</th>
                  <th className="px-4 py-2 border text-center font-bold">Num Serie</th>
                  <th className="px-4 py-2 border text-center font-bold">Num Serie batterie</th>
                  <th className="px-4 py-2 border text-center font-bold">Fournisseur</th>
                  <th className="px-4 py-2 border text-center font-bold">Etat Fiche</th>
                  <th className="px-4 py-2 border text-center font-bold">Observations</th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((intervention, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        className="mx-auto"
                        onChange={() => handleCheckboxChange(intervention)}
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">{intervention.id}</td>
                    <td className="px-4 py-2 border text-center">{intervention.device?.brand}</td>
                    <td className="px-4 py-2 border text-center">{intervention.device?.model}</td>
                    <td className="px-4 py-2 border text-center">{intervention.imei}</td>
                    <td className="px-4 py-2 border text-center">{}</td>
                    <td className="px-4 py-2 border text-center">1</td>
                    <td className="px-4 py-2 border text-center">{intervention.workflow}</td>
                    <td className="px-4 py-2 border text-center">{intervention.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleGenerateDechClick}
                className="custom-btn btn-5"
                style={{ width: "300px" }}
              >
                Generate Decharge
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
