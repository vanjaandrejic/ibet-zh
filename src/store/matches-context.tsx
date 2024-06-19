import { Dispatch, SetStateAction, createContext } from "react";
import { Match } from "../types/match";

interface MatchesContextType {
  topMatches: Match[];
  setTopMatches: Dispatch<SetStateAction<Match[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MatchesContext = createContext<MatchesContextType>({
  topMatches: [],
  setTopMatches: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export default MatchesContext;
