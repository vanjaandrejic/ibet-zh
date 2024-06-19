import axios from "axios";

const getGameartGameUrl = async (gameId: string, demo: boolean) => {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Auth-Token": localStorage.getItem("__ibet-mobile/_ionickv/auth-token"),
      Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
    };

    const response = await axios.get(
      `https://ibet2.365.rs/ibet/gameart/gameUrl.json?gameId=${gameId}&demo=${demo}&mobileVersion=2.27.49&locale=zh`,
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

export default getGameartGameUrl;
