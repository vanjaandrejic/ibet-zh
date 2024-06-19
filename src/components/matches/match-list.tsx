import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid, CircularProgress } from "@mui/material";
import MatchItem from "./match-item";
import { Match } from "../../types/match";
import AppContext from "../../store/app-context";

interface MatchListProps {
  sportId: string;
  leagueId: string;
}

const MatchList: FC<MatchListProps> = ({ sportId, leagueId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  const { timeParam } = useContext(AppContext);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/sr/sport/${sportId}/league/${leagueId}/mob?annex=0&${
            timeParam ? timeParam : null
          }&mobileVersion=2.32.10.5&locale=sr`
        );
        setMatches(response.data.esMatches);
        // console.log("response.data.esMatches", response.data.esMatches);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMatches();
  }, [leagueId, sportId, timeParam]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          width={"100%"}
          marginTop={0.8}
          style={{
            overflowY: "auto",
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {matches.map((match, index) => {
            return (
              <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                <MatchItem
                  match={match}
                  sportId={sportId}
                  leagueName={match.leagueName}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default MatchList;
