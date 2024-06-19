import axios from "axios";
import { TicketStatus } from "../../../pages/tickets-evidence-page-desktop";

const getTicketsInfo = async (
  timeParam: string,
  page: string,
  ticketStatus: TicketStatus
) => {
  try {
    const formData = new URLSearchParams();
    formData.append(timeParam, timeParam);
    formData.append("page", page);

    if (ticketStatus && ticketStatus.key && ticketStatus.value) {
      formData.append(ticketStatus.key, ticketStatus.value);
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Auth-Token": localStorage.getItem("__ibet-mobile/_ionickv/auth-token"),
      Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
    };

    const response = await axios.post(
      "https://ibet2.365.rs/ibet/profile/ticketsShort.html?mobileVersion=2.27.49&locale=sr",
      formData.toString(), // Convert formData to string
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Greška prilikom slanja zahteva:", error);
    throw error;
  }
};

export default getTicketsInfo;
