import axios from "axios";
import { Match } from "../../types/match";

const fetchTopMatches = async (
  sport: string,
  setTopMatches: (data: Match[]) => void,
  setIsLoading: (boolean: boolean) => void
) => {
  try {
    const response = await axios.get(
      `https://ibet2.365.rs/restapi/offer/sr/top/mob`,
      {
        params: {
          sport: sport,
          locale: "sr",
        },
      }
    );
    setTopMatches(response.data.esMatches);
    setIsLoading(false);
    // console.log(response);
  } catch (error) {
    console.error("Error:", error);
    setIsLoading(false);
  }
};

export default fetchTopMatches;
