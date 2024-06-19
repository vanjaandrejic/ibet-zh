import axios from "axios";
import { BetLines, BetMap, BetPickGroupMap, BetPickMap } from "../../types/bet";

const fetchBetOptions = async (
  setBetPickMap: (data: BetPickMap) => void,
  setBetLines: (data: BetLines) => void,
  setBetPickGroupMap: (data: BetPickGroupMap) => void,
  setBetMap: (data: BetMap) => void
) => {
  try {
    const response = await axios.get(
      "https://ibet2.365.rs/restapi/offer/sr/ttg_lang",
      {
        params: {
          mobileVersion: "2.32.10.5",
          locale: "sr",
          annex: 0,
        },
      }
    );
    setBetPickMap(response.data.betPickMap);
    setBetLines(response.data.betLines);
    setBetPickGroupMap(response.data.betPickGroupMap);
    setBetMap(response.data.betMap);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default fetchBetOptions;
