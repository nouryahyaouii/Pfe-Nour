import axios from "axios";

const SearchByImei = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: "invalid IMEI" });
    }, 1000);
  });
};

const DetailfichSav = async () => {
  return new Promise((resolve, reject) => {
    // Replace the setTimeout with your actual asynchronous operation
    setTimeout(() => {
      resolve({ success: true, data: "detail of file" });
    }, 1000);
  });
};

const updateFich = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:8089/api/v1/springfever/api/intervention/UPDATE_Intervention/${data.id}`,
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: "intervention not found or an error occurred." };
  }
};

const Searchfichsav = async (opt, val) => {
  let uri = `http://localhost:8089/api/v1/springfever/api/intervention/getInterventionbyImei/${val}`;
  if (opt == "CIN") {
    uri = `http://localhost:8089/api/v1/springfever/api/intervention/by-client-cin/${val}`;
  } else if (opt == "NFICH") {
    uri = `http://localhost:8089/api/v1/springfever/api/intervention/getInterventionby/${val}`;
  }

  try {
    const response = await axios.get(uri);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: "intervention not found or an error occurred." };
  }
};

const AddIntervention = async (data) => {
  const response = await axios.get(
    `http://localhost:8089/api/v1/springfever/api/device/getDeviceby/${data.imei}`
  );
  return { success: true, data };
};
const getRepairType = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8089/api/v1/springfever/api/intervention/getRepairType/${id}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching repair type:", error);
    return { success: false, data: error.message };
  }
};

const AddSwap = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8089/api/v1/springfever/api/user/addSwapp`,
      data
    );
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};

export {
  SearchByImei,
  AddIntervention,
  Searchfichsav,
  DetailfichSav,
  updateFich,
  getRepairType,
  AddSwap,
};

/*
const SearchByImei = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: "invalid IMEI" });
    }, 1000);
  });
};

const DetailfichSav = async () => {
  return new Promise((resolve, reject) => {
    // Replace the setTimeout with your actual asynchronous operation
    setTimeout(() => {
      resolve({ success: true, data: "detail of file" });
    }, 1000);
  });
};

const updateFich = async () => {
  return new Promise((resolve, reject) => {
    // Replace the setTimeout with your actual asynchronous operation
    setTimeout(() => {
      resolve({ success: true, data: "file updated successfully" });
    }, 1000);
  });
};

const Searchfichsav = async () => {
  return new Promise((resolve, reject) => {
    // Your asynchronous logic here
  });
};

export { SearchByImei, DetailfichSav, updateFich, Searchfichsav };
*/
