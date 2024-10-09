import axios from "axios";
import api from "../utils/axiosConfig";
import urls from "../utils/urls";

export const UseCreateVPS = async (body) => {
  try {
    const res = await api.post(urls.VPS, body);
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

export const UseUpdateVPS = async (id, body) => {
  try {
    const res = await api.put(`${urls.VPS}/${id}`, body);
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

export const UseDeleteVPS = async (id) => {
  try {
    const res = await api.delete(`${urls.VPS}/${id}`);
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

export const UseRestartVPS = async (vpsIpAddress) => {
  try {
    const config = {
      headers: {
        VpsIpAddress: vpsIpAddress,
      },
    };
    const res = await api.get(urls.RESTART_VPS, config);
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

export const UseTurnOnAutoUpdate = async (vpsIpAddress) => {
  try {
    const config = {
      headers: {
        VpsIpAddress: vpsIpAddress,
      },
    };
    const res = await api.get(urls.TURN_ON_AUTO_UPDATE, config);
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

export const UseUpdatePluginAndWordpressCore = async (vpsIpAddress) => {
  try {
    const config = {
      headers: {
        VpsIpAddress: vpsIpAddress,
      },
    };
    const res = await api.get(urls.UPDATE_PLUGIN_AND_WORDPRESS_CORE, config);
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

export const UseScanMalwareForWordpress = async (vpsIpAddress) => {
  try {
    const config = {
      headers: {
        VpsIpAddress: vpsIpAddress,
      },
    };
    const res = await api.get(urls.SCAN_MALWARE_WORDPRESS, config);
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
