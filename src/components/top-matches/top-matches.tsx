import { FC, useContext, useEffect, useState } from "react";
import MatchItem from "../matches/match-item";
import { Box, CircularProgress, Grow, Typography, Grid } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MatchesContext from "../../store/matches-context";

const extractNumber = (leagueToken: string): number => {
  if (!leagueToken) {
    return 0;
  }
  const match = leagueToken.match(/"(\d+)\#/);
  return match ? parseInt(match[1], 10) : 0;
};

const TopMatches: FC<{ sport: string }> = ({ sport }) => {
  // const [topMatches, setTopMatches] = useState<Match[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const { topMatches, isLoading } = useContext(MatchesContext);

  const sortedMatches = topMatches.slice().sort((a, b) => {
    const numberA = extractNumber(a.leagueToken);
    const numberB = extractNumber(b.leagueToken);
    return numberA - numberB;
  });

  // console.log(topMatches);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchTopMatches = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://ibet2.365.rs/restapi/offer/sr/top/mob`,
  //         {
  //           params: {
  //             sport: sport,
  //             locale: "sr",
  //           },
  //         }
  //       );
  //       setTopMatches(response.data.esMatches);
  //       setIsLoading(false);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchTopMatches();
  // }, [sport]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grow key={animationKey} in={true} {...{ timeout: 800 }}>
          <Grid
            container
            width={"94%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            pb={8}
            // maxWidth={740}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                ml: 3,
              }}
            >
              {topMatches.length > 0 ? (
                <>
                  <LocalFireDepartmentIcon
                    sx={{ color: "orange", marginRight: 1 }}
                  />

                  <Typography fontSize={18}>热门比赛</Typography>
                </>
              ) : null}
            </Box>
            {sortedMatches.map((match) => {
              return (
                <Grid xs={12} sm={12} md={6} lg={4} xl={4} key={match.id} item>
                  <MatchItem
                    key={match.id}
                    match={match}
                    sportId={sport}
                    leagueName={match.leagueName}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grow>
      )}
    </>
  );
};

export default TopMatches;
