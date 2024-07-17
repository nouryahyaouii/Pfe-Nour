import { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

//import Layout from "../layout";
import SearchResult from "layouts/rechercher/components/SearchResult";
import FileCard from "layouts/rechercher/components/FileCard";
import FicheIntervention from "./FicheIntervention";
import "assets/scss/auth.scss";
import { SearchByImei } from "hooks/api_search";
import "index.css";
import "output.css";
import axios from "axios";

export default function RecherchePage() {
  const [deviceId, setDeviceId] = useState("");
  const [deviceData, setDeviceData] = useState(null);
  const [error, setError] = useState(null);

  const [currentView, setCurrentView] = useState(0);
  const [searchResultData, setSearchResultData] = useState({});
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    numCin: "",
    numTel1: "",
    numTel2: "",
  });

  const [interventionData, setInterventionData] = useState({
    Typepanne: "",
    accessoires: "",
    descriptionn: "",
    batterie: "",
    Terminaletat: "",
    Pretterminal: "",
    workfloww: "",
  });

  const search = async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget));
    const imei = v.imei.toString();
    if (imei == "") return;
    setCurrentView(-1);
    try {
      const response = await axios.get(
        `http://localhost:8089/api/v1/springfever/api/device/getDeviceby/${imei}`
      );
      setSearchResultData(response.data);
      setCurrentView(1);
    } catch (error) {
      alert("Device not found or an error occurred.");
      setCurrentView(0);
    }
  };

  const createFile = () => setCurrentView(2);
  const onCancelFile = () => setCurrentView(1);

  const saveFile = async (e) => {
    e.preventDefault();

    try {
      // Prepare the client data to be sent
      const clientData = {
        lastName: clientInfo.nom,
        firstName: clientInfo.prenom,
        cin: clientInfo.numCin,
        phoneNumber1: clientInfo.numTel1,
        phoneNumber2: clientInfo.numTel2,
        email: clientInfo.email,
      };
      // Send the POST request
      const response = await axios.post(
        "http://localhost:8089/api/v1/springfever/api/user/addClient",
        clientData
      );

      // Handle the response (you can update the UI or perform other actions based on the response)
      console.log("Client saved:", response.data);
      // Send the POST request to add intervention

      const interventionDataToSend = {
        imei: searchResultData.imei, // Assuming you have this data in searchResultData
        accessories: interventionData.accessoires,
        panneType: interventionData.Typepanne,
        status: interventionData.batterie,
        etatTerminal: interventionData.Terminaletat,
        terminalDePret: interventionData.Pretterminal,
        workflow: interventionData.workfloww,
        description: interventionData.descriptionn,
      };

      const interventionResponse = await axios.post(
        "http://localhost:8089/api/v1/springfever/api/intervention/addIntervention",
        interventionDataToSend
      );

      // Handle the response
      console.log("Intervention saved:", interventionResponse.data);

      setCurrentView(3);
    } catch (error) {
      console.error("Error saving client or intervention:", error);
      alert("An error occurred while saving the client or intervention.");
    }
  };

  const handleClientInfoChange = (key, value) => {
    setClientInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  const handleInterventionDataChange = (key, value) => {
    setInterventionData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleInputChange = (event) => {
    setDeviceId(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="mt-8 flex justify-center">
        <form
          onSubmit={search}
          className="mb-3 p-4 flex justify-between items-center w-full bg-orange-500 rounded-lg"
        >
          <h2
            className="text-2xl font-bold"
            style={{ padding: "10px 100px", borderRadius: "10px", marginLeft: "-30px" }}
          >
            Recherche :
          </h2>
          <div>
            <input
              name="imei"
              type="text"
              required
              placeholder="NUM IMEI"
              className="px-3 py-2 rounded-lg"
              style={{ padding: "10px 100px", borderRadius: "10px", marginLeft: "-380px" }}
            />
          </div>
          <div>
            <button className="custom-btn btn-5">Rechercher</button>
          </div>
        </form>
      </div>
      {currentView === -1 && <h2 className="text-center py-10 font-bold">LOADING</h2>}
      {currentView === 1 && <SearchResult action={createFile} data={searchResultData} />}
      {currentView === 2 && (
        <FileCard
          onCancel={onCancelFile}
          action={saveFile}
          handleClientInfoChange={handleClientInfoChange}
          data={searchResultData}
          handleInterventionDataChange={handleInterventionDataChange}
        />
      )}
      {currentView === 3 && (
        <FicheIntervention
          clientInfo={clientInfo}
          data={searchResultData}
          handleInterventionDataChange={handleInterventionDataChange}
        />
      )}
    </DashboardLayout>
  );
}
