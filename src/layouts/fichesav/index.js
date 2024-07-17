import React, { useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Produit from "./consulterproduit";
import { Searchfichsav } from "hooks/api_search";

export default function ConsulteSav() {
  const [showProduit, setShowProduit] = useState(false);
  const [produitValue, setProduitValue] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  const optionRef = useRef(null);
  const valueRef = useRef(null);

  const handleRechercher = async (e) => {
    e.preventDefault();
    setSelectedOption(optionRef.current.value);
    const r = await Searchfichsav(optionRef.current.value, valueRef.current.value);
    if (r.success) {
      setProduitValue(r.data);
      setShowProduit(true);
    } else {
      alert(r.data);
    }
  };

  return (
    <DashboardLayout>
      <div className="mt-8 flex justify-center">
        {!showProduit ? (
          <div className="w-full bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Verification produit</h2>
            <div className="mt-4">
              <form onSubmit={handleRechercher} className="mb-3 p-4 flex flex-col">
                <label htmlFor="cin" className="text-gray-700 mb-2">
                  CIN client / Num Fiche / Num Serie :
                </label>
                <select
                  ref={optionRef}
                  id="cin"
                  className="px-3 py-2 rounded-lg border border-gray-300 mb-4"
                  style={{ width: "200px" }}
                >
                  <option value="CIN">CIN client</option>
                  <option value="NFICH">Num Fiche</option>
                  <option value="IMEI">Num Serie</option>
                </select>
                <input
                  type="text"
                  ref={valueRef}
                  placeholder=""
                  className="px-3 py-2 rounded-lg border border-gray-300"
                  style={{ width: "200px" }}
                />
                <div className="flex justify-end mt-4">
                  <button className="custom-btn btn-5">Rechercher</button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Produit info={produitValue} selectedOption={selectedOption} />
        )}
      </div>
    </DashboardLayout>
  );
}
