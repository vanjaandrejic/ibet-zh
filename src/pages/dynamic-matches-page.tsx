import { Box, IconButton, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MatchList from "../components/matches/match-list";
import { ArrowBack } from "@mui/icons-material";
import SwitchBetButton from "../components/navigation/switch-bet-button";
import TimelineMatches from "../components/timeline-matches/timeline-matches";

const DynamicPage: FC = () => {
  const { sportId, leagueId } = useParams();

  const isDesktop = useMediaQuery("(min-width:1024px)");

  const getLeagueLogo = (leagueId: string | undefined) => {
    const url = `https://ibet-365.com/content/league-headers/${leagueId}.png`;

    return <img src={url}></img>;
  };

  // console.log(leagueId);
  const navigate = useNavigate();

  // const { sport, setSport } = useContext(NavigationContext);

  return (
    <>
      {isDesktop ? (
        <>
          {/* <MainNavigation sport={sport} setSport={setSport} /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "24%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: "2%",
              }}
            >
              <SwitchBetButton />

              <TimelineMatches sportId={sportId} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "68%",
                ml: "2%",
              }}
            >
              <Box width={"100%"}>
                <IconButton onClick={() => navigate("/sport")}>
                  <ArrowBack />
                </IconButton>
              </Box>
              {/* <Box width={"100%"}>
              <IconButton onClick={() => navigate("/sport")}>
                <ArrowBack />
              </IconButton>
            </Box> */}
              <Box
                sx={{
                  width: "100%",
                  height: "160px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {getLeagueLogo(leagueId)}
              </Box>
              <MatchList sportId={sportId!} leagueId={leagueId!} />
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box width={"100%"}>
            <IconButton onClick={() => navigate("/sport")}>
              <ArrowBack />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "98%",
              height: "160px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getLeagueLogo(leagueId)}
          </Box>
          <MatchList sportId={sportId!} leagueId={leagueId!} />
        </Box>
      )}
    </>
  );
};

export default DynamicPage;
