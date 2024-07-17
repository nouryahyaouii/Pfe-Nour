import React, { useEffect, useState } from "react";
import { updateFich, getRepairType } from "hooks/api_search"; // Ensure you have the correct imports
import PropTypes from "prop-types";
import moment from "moment";

export default function DetailsFiche({ info }) {
  const [editableData, setEditableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (createdAt) => {
    return moment(createdAt).format("YYYY-MM-DD HH:mm:ss"); // Adjust the format as needed
  };

  useEffect(() => {
    if (info && Object.keys(info).length > 0) {
      const fetchRepairType = async () => {
        const r = await getRepairType(info.id);
        if (r.success) {
          setEditableData([
            info.createdAt || "2024-06-05",
            info.lieu || "",
            r.data || "",
            info.etat || "",
            info.utilisateur || "",
            info.description || "",
          ]);
        } else {
          // alert("Error fetching repair type: " + r.data);
        }
      };

      fetchRepairType();
    }
  }, [info]);

  if (!info || Object.keys(info).length === 0) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (index, event) => {
    const newData = [...editableData];
    newData[index] = event.target.value;
    setEditableData(newData);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const updatedData = {
      createdAt: editableData[0],
      lieu: editableData[1],
      repairType: editableData[2],
      etat: editableData[3],
      utilisateur: editableData[4],
      description: editableData[5],
    };

    console.log(info);
    const r = await updateFich(info.id, updatedData);
    if (r.success) {
      console.log("Fetched data:", r.data);
      setEditableData([
        r.data.createdAt || "2024-06-05",
        r.data.lieu || "",
        r.data.repairType || "",
        r.data.etat || "",
        r.data.utilisateur || "",
        r.data.description || "",
      ]);
      setIsEditing(true);
    } else {
      alert(r.data);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold">Details Fiche</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr className="bg-gray-200">
                <td className="px-4 py-2 border text-center font-bold">Date</td>
                <td className="px-4 py-2 border text-center font-bold">Lieu</td>
                <td className="px-4 py-2 border text-center font-bold">Statut</td>
                <td className="px-4 py-2 border text-center font-bold">Etat</td>
                <td className="px-4 py-2 border text-center font-bold">Utilisateur</td>
                <td className="px-4 py-2 border text-center font-bold">Commentaire</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-center">{"2024-07-17"}</td>
                <td className="px-4 py-2 border text-center">{"SpaceNet"}</td>
                <td className="px-4 py-2 border text-center">
                  {"En attente Envoi reparateur externe"}
                </td>
                <td className="px-4 py-2 border text-center">{"En cours du diagnostic"}</td>
                <td className="px-4 py-2 border text-center">{"M.fadhel gidouz"}</td>
                <td className="px-4 py-2 border text-center">{"en attente"}</td>
                {isEditing
                  ? editableData.map((value, index) => (
                      <td key={index} className="px-4 py-2 border text-center">
                        <input
                          type="text"
                          value={value}
                          onChange={(event) => handleInputChange(index, event)}
                          className="px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    ))
                  : editableData.map((value, index) => (
                      <td key={index} className="px-4 py-2 h-4 border text-center">
                        {value}
                      </td>
                    ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {isEditing ? (
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button className="custom-btn btn-5" onClick={handleEditClick}>
              Modifier
            </button>
          )}
        </div>
        <hr className="mt-5" />
        <h2 className="mt-5 text-2xl font-bold">Details de la joignabilité client</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr className="bg-gray-200">
                <td className="px-4 py-2 border text-center font-bold">Utilisateur</td>
                <td className="px-4 py-2 border text-center font-bold">Joignabilité client</td>
                <td className="px-4 py-2 border text-center font-bold">Date & Heure d appel</td>
                <td className="px-4 py-2 border text-center font-bold">Date de prise en charge</td>
                <td className="px-4 py-2 border text-center font-bold">Commentaire</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button className="custom-btn btn-5" style={{ width: "400px" }}>
            Ajouter joignabilité client
          </button>
        </div>
      </div>
    </div>
  );
}

DetailsFiche.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    lieu: PropTypes.string,
    etat: PropTypes.string,
    utilisateur: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
