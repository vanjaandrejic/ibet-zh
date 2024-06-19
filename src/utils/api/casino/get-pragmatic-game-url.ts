import axios from "axios";

const getPragmaticGameUrl = async (gameId: string, demo: boolean) => {
  try {
    const formData = new URLSearchParams();
    formData.append("gameId", gameId.toString());
    formData.append("isDemo", demo.toString());
    formData.append(
      "lobbyUrl",
      "https://ibet2.365.rs/online/unified/provajderi"
    );

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Auth-Token": localStorage.getItem("__ibet-mobile/_ionickv/auth-token"),
      Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
    };

    const response = await axios.post(
      "https://ibet2.365.rs/ibet/casino/pragmatic/launchUrl.json?mobileVersion=2.27.49&locale=zh",
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

export default getPragmaticGameUrl;
