import { Typography, Box, Grow } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { Match, TicketMatch } from "../../types/match";
import { useNavigate } from "react-router-dom";
import { formatKickOffTime } from "../../utils/common";
import FootballIcon from "../../assets/icons/football-svg";
import TennisIcon from "../../assets/icons/tennis-svg";
import HandballIcon from "../../assets/icons/handball-svg";
import VoleyballIcon from "../../assets/icons/voleyball-svg";
import TableTennisIcon from "../../assets/icons/table-tennis";
import BasketballIcon from "../../assets/icons/basketball-svg";
import SunkerIcon from "../../assets/icons/snuker-icon";
import HockeyIcon from "../../assets/icons/hockey-icon";
import BaseballIcon from "../../assets/icons/baseball-icon";
import RugbiIcon from "../../assets/icons/rugbi-icon";
import AntepostIcon from "../../assets/icons/antepost-icon";
import GoalsIcon from "../../assets/icons/goals-icon";
import MatchItemOdds from "./match-item-odds";
import NavigationContext from "../../store/navigation-context";

interface MatchItemProps {
  match: Match | TicketMatch;
  sportId: string;
  leagueName?: string;
}

const MatchItem: FC<MatchItemProps> = ({ match, sportId, leagueName }) => {
  const getSportIcon = (sportId: string) => {
    switch (sportId) {
      case "S":
        return <FootballIcon fill={"#62646D"} />;
      case "B":
        return <BasketballIcon fill={"#62646D"} />;
      case "T":
        return <TennisIcon fill={"#62646D"} />;
      case "HB":
        return <HandballIcon fill={"#62646D"} />;
      case "V":
        return <VoleyballIcon fill={"#62646D"} />;
      case "TT":
        return <TableTennisIcon fill={"#62646D"} />;
      case "SN":
        return <SunkerIcon fill={"#62646D"} />;
      case "SK":
        return <BasketballIcon fill={"#62646D"} />;
      case "H":
        return <HockeyIcon fill={"#62646D"} />;
      case "BB":
        return <BaseballIcon fill={"#62646D"} />;
      case "RL":
        return <RugbiIcon fill={"#62646D"} />;
      case "AN":
        return <AntepostIcon fill={"#62646D"} />;
      case "LG":
        return <GoalsIcon fill={"#62646D"} />;
      default:
        return <FootballIcon fill={"#62646D"} />;
    }
  };

  const [animationKey, setAnimationKey] = useState<number>(0);

  const { logoSTJson, logoBJson } = useContext(NavigationContext);

  // const [logoJson, setLogoJson] = useState<object>({});

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const getClubLogo = (clubName: string) => {
    const name = clubName.replace(/[^A-Z0-9]/gi, "");
    const toLowName = name.toLowerCase();
    // @ts-ignore

    let foundObject;

    if (match.sport === "B") {
      // @ts-ignore
      foundObject = logoBJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (match.home.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/club-icons-b/jhome.png"
            ></img>
          );
        } else {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/club-icons-b/jaway.png"
            ></img>
          );
        }
      }
    } else if (match.sport === "H") {
      // @ts-ignore
      foundObject = logoSTJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (match.home.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/jersey/h-home.png"
            ></img>
          );
        } else {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/jersey/h-away.png"
            ></img>
          );
        }
      }
    } else if (match.sport === "BB") {
      // @ts-ignore
      foundObject = logoSTJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (match.home.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/jersey/b-home.png"
            ></img>
          );
        } else {
          return (
            <img
              width="50px"
              src="https://ibet-365.com/content/jersey/b-away.png"
            ></img>
          );
        }
      }
    } else {
      // @ts-ignore
      foundObject = logoSTJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (match.home.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return <img width="50px" src="/homeJersey365.png"></img>;
        } else {
          return <img width="50px" src="/awayJerey.png"></img>;
        }
      }
    }

    // const foundObject = logoSTJson.find((obj) => obj.name === toLowName);

    // if (foundObject) {
    //   // @ts-ignore
    //   return <img width="50px" src={foundObject.url}></img>;
    // } else {
    //   if (match.home.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
    //     return <img width="50px" src="/homeJersey365.png"></img>;
    //   } else {
    //     return <img width="50px" src="/awayJerey.png"></img>;
    //   }
    // }
  };

  const navigate = useNavigate();

  return (
    <Grow key={animationKey} in={true} {...{ timeout: 800 }}>
      <Box
        sx={{
          boxShadow: 3,
          width: "94%",
          margin: 1.4,
          padding: 1.2,
          backgroundColor: "#0D0D19",
          borderRadius: 5,
          maxWidth: "94%",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 86,
            }}
          >
            <Box
              onClick={() => {
                if (match.sport === "MM" || match.sport === "SP") {
                  return;
                } else {
                  navigate(`/prematch-special/${sportId}/${match.id}`);
                }
              }}
              sx={{
                textDecoration: "none",
                color: "white",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // marginLeft: -1,
                  // marginRight: 5,
                  width: "33%",
                  maxWidth: "33%",
                  minWidth: "33%",
                }}
              >
                {getClubLogo(match.home)}

                <Typography
                  fontSize={10}
                  sx={{ marginTop: 0.8 }}
                  textAlign={"center"}
                >
                  <b>{match.home}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // maxWidth: "8%",
                  // position: "relative",
                  width: "33%",
                  maxWidth: "33%",
                  minWidth: "33%",
                }}
              >
                {getSportIcon(sportId)}
                <Typography
                  fontSize={8}
                  sx={{ marginTop: 0.6 }}
                  textAlign={"center"}
                >
                  <b>{leagueName}</b>
                </Typography>
                <Typography fontSize={10} textAlign={"center"}>
                  <b>{formatKickOffTime(match.kickOffTime)}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ml: 2,
                  // marginRight: -5.5,
                  // marginLeft: 5,
                  width: "33%",
                  maxWidth: "33%",
                  minWidth: "33%",
                }}
              >
                {sportId === "AN" || sportId === "LG" || sportId === "SP"
                  ? null
                  : getClubLogo(match?.away)}
                <Typography
                  fontSize={10}
                  sx={{ marginTop: 0.6 }}
                  textAlign={"center"}
                >
                  <b>{match.away}</b>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <MatchItemOdds match={match} />
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default MatchItem;
