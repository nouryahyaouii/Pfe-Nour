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

export default function RecherchePage() {
  const [currentView, setCurrentView] = useState(0);
  const [searchResultData, setSearchResultData] = useState({});
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    numCin: "",
    numTel1: "",
    numTel2: "",
  });

  const search = async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget));
    const imei = v.imei.toString();
    if (imei == "") return;
    setCurrentView(-1);
    const r = await SearchByImei(imei);
    console.log(r);
    if (!r.success) {
      alert(r.data);
      setCurrentView(0);
      return;
    }
    setSearchResultData({ etat: "OKEY" });
    setCurrentView(1);
  };

  const createFile = () => setCurrentView(2);
  const onCancelFile = () => setCurrentView(1);

  const saveFile = (e) => {
    e.preventDefault();
    setCurrentView(3);
  };

  const handleClientInfoChange = (key, value) => {
    setClientInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="mt-8 flex justify-center">
        <form
          onSubmit={search}
          className="mb-3 p-4 flex justify-between items-center w-full bg-orange-500 rounded-lg"
        >
          <div>
            <input
              name="imei"
              type="text"
              required
              placeholder="NUM IMEI"
              className="px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <button className="px-4 py-2 bg-orange-700 text-white rounded-lg">Rechercher</button>
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
        />
      )}
      {currentView === 3 && <FicheIntervention clientInfo={clientInfo} />}
    </DashboardLayout>
  );
}
