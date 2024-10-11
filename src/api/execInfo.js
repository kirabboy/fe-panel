import axios from "axios";
import api from "../utils/axiosConfig";
import urls from "../utils/urls";

export const UseExecInfo = async (execInfoId) => {
  try {
    const res = await api.get(`${urls.EXEC_INFO}/${execInfoId}`);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return error;
  }
};
