import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchApps = async (token: string, status: string = "applied") => {
  try {
    const response = await axios.get(
      `${API_URL}/applications/me?status=${status}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    throw error;
  }
};

export const updateAppStatus = async (
  token: string,
  appId: string,
  newStatus: "applied" | "rejected"
) => {
  try {
    const response = await axios.put(
      `${API_URL}/applications/${appId}`,
      { status: newStatus, notes: "" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update application status:", error);
    throw error;
  }
};
