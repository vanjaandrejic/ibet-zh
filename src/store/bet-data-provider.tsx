import { FC, ReactNode, useEffect, useState } from "react";

import { BetPickMap, BetLines, BetPickGroupMap, BetMap } from "../types/bet";
import BetDataContext from "./bet-data-context";
import fetchBetOptions from "../utils/api/get-ttg";
import getBetPickGroupPositions from "../utils/api/get-bet-pick-group-positions";

const BetDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [betPickMap, setBetPickMap] = useState<BetPickMap | object>({});
  const [betLines, setBetLines] = useState<BetLines | object>({});
  const [betPickGroupMap, setBetPickGroupMap] = useState<
    BetPickGroupMap | object
  >({});
  const [betMap, setBetMap] = useState<BetMap | object>({});
  const [betPickGroupPositions, setBetPickGroupPositions] = useState<
    object | null
  >({});

  useEffect(() => {
    fetchBetOptions(setBetPickMap, setBetLines, setBetPickGroupMap, setBetMap);
    getBetPickGroupPositions(setBetPickGroupPositions);
  }, []);

  return (
    <BetDataContext.Provider
      value={{
        betPickMap,
        setBetPickMap,
        betLines,
        setBetLines,
        betPickGroupMap,
        setBetPickGroupMap,
        betMap,
        setBetMap,
        betPickGroupPositions,
        setBetPickGroupPositions,
      }}
    >
      {children}
    </BetDataContext.Provider>
  );
};

export default BetDataProvider;
