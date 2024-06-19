import axios from "axios";

export async function getVirtuals(): Promise<any> {
  try {
    const headers = {
      "X-Auth-Token": "a392770d-26dc-4868-82d7-4565c0ee4a7e",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const params = {
      deviceType: "mobile",
      ignoreRoomGroupingByTag: true,
      mobileVersion: "2.27.49",
      locale: "zh",
    };

    const response = await axios.get(
      "https://ibet2.365.rs/ibet/getLobbyForLobbyCode/virtual365.json",
      {
        headers: headers,
        params: params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching lobby data:", error);
    throw error;
  }
}
