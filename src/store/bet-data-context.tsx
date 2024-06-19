import { createContext } from "react";
import { BetPickMap, BetLines, BetPickGroupMap, BetMap } from "../types/bet";

interface BetDataContextType {
  betPickMap: BetPickMap | object;
  setBetPickMap: React.Dispatch<React.SetStateAction<BetPickMap | object>>;
  betLines: BetLines | object;
  setBetLines: React.Dispatch<React.SetStateAction<BetLines | object>>;
  betPickGroupMap: BetPickGroupMap | object;
  setBetPickGroupMap: React.Dispatch<
    React.SetStateAction<BetPickGroupMap | object>
  >;
  betMap: BetMap | object;
  setBetMap: React.Dispatch<React.SetStateAction<BetMap | object>>;
  betPickGroupPositions: object | null;
  setBetPickGroupPositions: React.Dispatch<React.SetStateAction<object>>;
}

const initialData: BetDataContextType = {
  betPickMap: {},
  setBetPickMap: () => {},
  betLines: {},
  setBetLines: () => {},
  betPickGroupMap: {},
  setBetPickGroupMap: () => {},
  betMap: {},
  setBetMap: () => {},
  betPickGroupPositions: {},
  setBetPickGroupPositions: () => {},
};

const BetDataContext = createContext<BetDataContextType>(initialData);

export default BetDataContext;
