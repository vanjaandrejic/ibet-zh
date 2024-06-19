import axios from "axios";

export async function getTicketItem(ticketUuid?: string): Promise<any> {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Auth-Token": localStorage.getItem("__ibet-mobile/_ionickv/auth-token"),
      Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
    };

    const response = await axios.get(
      `https://ibet2.365.rs/ibet/profile/getTicketByUuid/${ticketUuid}.json?mobileVersion=2.32.10.5&locale=sr`,
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching lobby data:", error);
    throw error;
  }
}
