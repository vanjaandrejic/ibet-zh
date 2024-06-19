import axios from "axios";
import { Match } from "../../types/match";

const getMatch = async (
  setMatch: (data: Match) => void,
  matchId: string | undefined
) => {
  try {
    const response = await axios.get(
      `https://ibet2.365.rs/restapi/offer/zh/match/${matchId}`,
      {
        params: {
          mobileVersion: "2.27.33",
          locale: "sr",
          annex: 0,
        },
      }
    );

    setMatch(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getMatch;
