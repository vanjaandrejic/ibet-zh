import { FC, ReactNode, useContext, useEffect, useState } from "react";
import NavigationContext from "./navigation-context";
import { Match } from "../types/match";
import fetchTopMatches from "../utils/api/get-top-matches";
import MatchesContext from "./matches-context";

const MatchesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [topMatches, setTopMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sport } = useContext(NavigationContext);

  useEffect(() => {
    fetchTopMatches(sport, setTopMatches, setIsLoading);
  }, [sport]);

  return (
    <MatchesContext.Provider
      value={{
        topMatches,
        setTopMatches,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MatchesContext.Provider>
  );
};

export default MatchesProvider;
