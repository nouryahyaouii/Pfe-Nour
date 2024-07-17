/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/*
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SearchResult from "layouts/decharge/SearchResult";
import GenerateDech from "layouts/decharge/SearchResult";

export default function SearchDecharge() {
  const [searchResultData, setSearchResultData] = useState([]);
  const [currentView, setCurrentView] = useState(0);

  const search = async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget));
    const dischargeId = v?.dischargeId?.toString();
    if (!dischargeId) {
      alert("Please enter a valid discharge ID.");
      return;
    }
    setCurrentView(-1); // Loading state
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/springfever/api/discharge/getDischargeby/${dischargeId}`
      );
      setSearchResultData(response.data);
      setCurrentView(1); // Show search results
    } catch (error) {
      alert("Discharge not found or an error occurred.");
      setCurrentView(0); // Show initial search form
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="mt-8 flex justify-center">
        <form
          onSubmit={search}
          className="mb-3 p-4 flex justify-between items-center w-full bg-orange-500 rounded-lg"
        >
          <div className="w-full bg-orange p-4 rounded-lg">
            <h2
              className="text-2xl font-bold"
              style={{ padding: "10px 100px", borderRadius: "10px", marginLeft: "-30px" }}
            >
              Recherche decharge
            </h2>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                name="dischargeId"
                className="px-3 py-2 rounded-lg border border-gray-300 w-52"
                placeholder="Search for decharge"
                style={{ padding: "10px 10px", borderRadius: "10px", marginLeft: "100px" }}
              />
              <button type="submit" className="bg-red-900 text-white px-9 py-2 rounded-lg ml-2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>

        {currentView === -1 && <h2 className="text-center py-10 font-bold">LOADING</h2>}
        {currentView === 1 && <GenerateDech selectedInterventions={searchResultData} />}
      </div>
    </DashboardLayout>
  );
}

*/
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function SearchIntervention({}) {
  const [dischargeId, setDischargeId] = useState("");
  const [interventionData, setInterventionData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!dischargeId || isNaN(dischargeId)) {
      setError("Please enter a valid ID");
      return;
    }

    try {
      setError(null); // Clear previous error
      const response = await axios.get(
        `http://localhost:8089/api/v1/springfever/api/intervention/getInterventionByDechargeId/${dischargeId}`
      );
      setInterventionData(response.data);
    } catch (error) {
      console.error("Error fetching intervention:", error);
      setError("Error fetching intervention. Please try again.");
    }
  };

  const renderPurchaseDate = () => {
    if (interventionData && interventionData.purchaseDate) {
      return moment(interventionData.purchaseDate).format("LL");
    }
    return "Date not available";
  };

  const formatDate = (purchaseDate) => {
    return moment(purchaseDate).format("YYYY-MM-DD "); // Adjust the format as needed
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="mt-8 flex justify-center">
        <div className="w-full bg-orange p-4 rounded-lg shadow-md">
          <div className="mb-3 p-4 flex justify-between items-center w-full bg-orange-300 rounded-lg" />
          <h3
            className="text-2xl font-bold"
            style={{ padding: "10px 100px", borderRadius: "10px", marginLeft: "-30px" }}
          >
            Recherche decharge
          </h3>
          <div className="mt-4 flex items-center mb-4">
            <input
              type="text"
              value={dischargeId}
              onChange={(e) => setDischargeId(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 w-52"
              placeholder="Entrez l'ID de la décharge"
              style={{ padding: "10px 10px", borderRadius: "10px", marginLeft: "100px" }}
            />
            <button
              onClick={handleSearch}
              className="bg-orange-900 text-white px-9 py-2 rounded-lg ml-2"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Rechercher
            </button>
          </div>
          <div className="mb-3 p-4 flex justify-between items-center w-full bg-orange-300 rounded-lg" />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {interventionData && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Détails de décharge</h2>
              <table className="mt-5 w-full border-collapse">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border text-center font-bold">Marque</td>
                    <td className="px-4 py-2 border text-center font-bold">Modele</td>
                    <td className="px-4 py-2 border text-center font-bold">Num Serie</td>
                    <td className="px-4 py-2 border text-center font-bold">Num Serie batterie</td>
                    <td className="px-4 py-2 border text-center font-bold">Fournisseur</td>
                    <td className="px-4 py-2 border text-center font-bold">Date</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border text-center">
                      {interventionData.device?.brand}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {interventionData.device?.model}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {interventionData.device?.imei}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {interventionData.device?.batteryImei}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {interventionData.device?.status}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {formatDate(interventionData?.purchaseDate)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
