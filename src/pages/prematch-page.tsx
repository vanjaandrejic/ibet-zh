import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Match, TicketMatch } from "../types/match";
import { BetPickGroupMap, BetPickGroupPosition } from "../types/bet";
import { formatKickOffTime } from "../utils/common";
import PrematchOdds from "../components/prematch/preamtch-odds";
import BetDataContext from "../store/bet-data-context";
import getMatch from "../utils/api/get-match";
import FootballIcon from "../assets/icons/football-svg";
import BasketballIcon from "../assets/icons/basketball-svg";
import TennisIcon from "../assets/icons/tennis-svg";
import HandballIcon from "../assets/icons/handball-svg";
import VoleyballIcon from "../assets/icons/voleyball-svg";
import TableTennisIcon from "../assets/icons/table-tennis";
import SunkerIcon from "../assets/icons/snuker-icon";
import HockeyIcon from "../assets/icons/hockey-icon";
import RugbiIcon from "../assets/icons/rugbi-icon";
import AntepostIcon from "../assets/icons/antepost-icon";
import GoalsIcon from "../assets/icons/goals-icon";
import BaseballIcon from "../assets/icons/baseball-icon";
import { ArrowBack } from "@mui/icons-material";
import SwitchBetButton from "../components/navigation/switch-bet-button";
import TimelineMatches from "../components/timeline-matches/timeline-matches";
import NavigationContext from "../store/navigation-context";

const PrematchPage: FC = () => {
  const { betPickMap, betLines, betPickGroupMap, betPickGroupPositions } =
    useContext(BetDataContext);

  const { logoSTJson, logoBJson } = useContext(NavigationContext);
  const [match, setMatch] = useState<Match | TicketMatch>(
    {} as Match | TicketMatch
  );
  const [betPickGroupPositionsUsed, setBetPickGroupPositionsUsed] =
    useState<BetPickGroupPosition>({});
  const [filteredBetPickGroupMap, setFilteredBetPickGroupMap] = useState<
    BetPickGroupMap | object
  >({} as BetPickGroupMap);
  const [matchedOdds, setMatchedOdds] = useState<{
    [name: string]: {
      odds: { [key: string]: number };
      code: number;
      param: string;
    };
  }>({});

  const { matchId, sportId } = useParams();

  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    if (sportId) {
      const filteredPosition = Object.entries(
        // @ts-ignore
        betPickGroupPositions["MOBILE_PREMATCH_TOP"] || {}
      ).filter(([key]) => key === sportId);

      if (filteredPosition.length > 0) {
        setBetPickGroupPositionsUsed(
          // @ts-ignore
          filteredPosition[0][1]["DEFAULT"][0]["betPickGroupPositions"]
        );
      }
    }
  }, [betPickGroupPositions, sportId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (matchId) {
      getMatch(setMatch, matchId);
    }
  }, [matchId]);

  const uniqueLineCodes: { [key: string]: boolean } = {};

  // Iteracija kroz sve članove objekta betPickGroupMap
  if (betPickGroupMap) {
    Object.values(betPickGroupMap).forEach((item) => {
      if (item && Object.prototype.hasOwnProperty.call(item, "lineCode")) {
        uniqueLineCodes[item.lineCode] = true;
      }
    });
  }

  // Izvlačenje ključeva (lineCode vrednosti) iz uniqueLineCodes objekta
  const lineCodesArray = Object.keys(uniqueLineCodes);

  // lineCodesArray sada sadrži sve jedinstvene lineCode vrednosti iz betPickGroupMap objekta
  // @ts-ignore
  const filteredBetLines: any = [];
  lineCodesArray.forEach((lineCode) => {
    // Filtriranje betLines niza da zadrži samo objekte čiji code odgovara trenutnoj vrednosti lineCode-a
    const filteredLines = Object.keys(betLines).filter(
      // @ts-ignore
      (line: any) => line.code === Number(lineCode)
    );

    // Dodavanje filtriranih linija u filteredBetLines niz
    filteredBetLines.push(...filteredLines);
  });

  // useEffect hook za automatsko izdvajanje članova prilikom promene stanja betPickGroupPositions ili betPickGroupMap
  useEffect(() => {
    const extractMembers = () => {
      // @ts-ignore
      const extractedMembers: any = {};

      // Prolazak kroz objekat betPickGroupPositions
      for (const member in betPickGroupPositionsUsed) {
        if (
          Object.prototype.hasOwnProperty.call(
            betPickGroupPositionsUsed,
            member
          )
        ) {
          const betPickGroupId =
            betPickGroupPositionsUsed[member].betPickGroupId;
          if (
            Object.prototype.hasOwnProperty.call(
              betPickGroupMap,
              betPickGroupId
            )
          ) {
            // @ts-ignore
            extractedMembers[member] = betPickGroupMap[betPickGroupId];
          }
        }
      }

      setFilteredBetPickGroupMap(extractedMembers);
    };
    extractMembers();
  }, [betPickGroupPositionsUsed, betPickGroupMap]);

  // console.log(filteredBetPickGroupMap);

  // console.log("filteredBetPickGroupMap", filteredBetPickGroupMap);

  useEffect(() => {
    const matchedOddsHelper: any = {};

    Object.values(filteredBetPickGroupMap).forEach((item) => {
      if (
        item &&
        item.picks &&
        Array.isArray(item.picks) &&
        item.handicapParam !== null // Provera da li je handicapParam različit od null
      ) {
        // Ključ za matchedOdds
        const key = item.name;

        // Inicijalizacija objekta za ovaj opis
        matchedOddsHelper[key] = {
          odds: {},
          code: item.lineCode,
          param: item.handicapParam, // Dodavanje handicapParam kao param ako nije null
        };

        // Prolazak kroz svaki pick u objektu
        item.picks.forEach((pick: any) => {
          // Provera da li ključ iz picks postoji u match.odds i da li je match.odds definisan
          if (
            match &&
            match.odds &&
            Object.prototype.hasOwnProperty.call(match.odds, pick.betPickCode)
          ) {
            // Dodavanje odgovarajućeg ključa i vrednosti iz match.odds u objekat za ovaj opis
            matchedOddsHelper[key].odds[pick.betPickCode] =
              match.odds[pick.betPickCode];
          }
        });
      } else {
        const key = item.name;

        // Inicijalizacija objekta za ovaj opis
        matchedOddsHelper[key] = {
          odds: {},
          code: item.lineCode,
        };

        // Prolazak kroz svaki pick u objektu
        item.picks.forEach((pick: any) => {
          // Provera da li ključ iz picks postoji u match.odds i da li je match.odds definisan
          if (
            match &&
            match.odds &&
            Object.prototype.hasOwnProperty.call(match.odds, pick.betPickCode)
          ) {
            // Dodavanje odgovarajućeg ključa i vrednosti iz match.odds u objekat za ovaj opis
            matchedOddsHelper[key].odds[pick.betPickCode] =
              match.odds[pick.betPickCode];
          }
        });
      }
    });

    setMatchedOdds(matchedOddsHelper);
  }, [filteredBetPickGroupMap, match]);

  const getSportIcon = (sportId?: string) => {
    switch (sportId) {
      case "S":
        return (
          <FootballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "B":
        return (
          <BasketballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "T":
        return <TennisIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />;
      case "HB":
        return (
          <HandballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "V":
        return (
          <VoleyballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "TT":
        return (
          <TableTennisIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "SN":
        return <SunkerIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />;
      case "SK":
        return (
          <BasketballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "H":
        return <HockeyIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />;
      case "BB":
        return (
          <BaseballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "RL":
        return <RugbiIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />;
      case "AN":
        return (
          <AntepostIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
      case "LG":
        return <GoalsIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />;
      default:
        return (
          <FootballIcon fill={"white"} width={"1.2rem"} height={"1.2rem"} />
        );
    }
  };

  const getClubLogo = (clubName: string) => {
    if (!clubName) {
      return;
    }
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

  const getSportsBackgroundPath = (sport?: string) => {
    switch (sport) {
      case "S":
        return "/sports-background/stadiumbcg.jpg";
      case "B":
        return "/sports-background/basketball-court.jpg";
      case "SK":
        return "/sports-background/basketball-court.jpg";
      case "T":
        return "/sports-background/tennis.jpg";
      case "H":
        return "/sports-background/hokej.jpg";
      case "HB":
        return "/sports-background/rukomet.jpg";
      case "V":
        return "/sports-background/odbojka.jpg";
      case "MM":
        return "/sports-background/mma.jpg";
      case "SN":
        return "/sports-background/snuker.jpg";
      default:
        return "/sports-background/stadiumbcg.jpg";
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isDesktop ? (
        //! DESKTOP

        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "24%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
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
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "68%",
              ml: "3%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "90%",
                borderRadius: 2,
                position: "relative", // Dodajemo relativno pozicioniranje na Box
                overflow: "hidden",
                paddingTop: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  zIndex: 1000, // Providni crni overlay
                }}
              />
              <img
                src={getSportsBackgroundPath(match.sport)}
                style={{
                  position: "absolute",
                  top: "50%", // Postavljanje slike na polovinu visine Boxa
                  left: "50%", // Postavljanje slike na polovinu širine Boxa
                  transform: "translate(-50%, -50%)", // Centriranje slike
                  width: "100%", // Automatsko skaliranje širine slike
                }}
              />
              <Box
                zIndex={1000}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={12} textAlign={"center"}>
                    {match?.leagueName}
                  </Typography>

                  <Typography fontSize={12} textAlign={"center"}>
                    {formatKickOffTime(match?.kickOffTime)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {getClubLogo(match?.home)}
                    <Typography
                      fontSize={12}
                      marginTop={1}
                      textAlign={"center"}
                    >
                      <b>{match.home}</b>
                    </Typography>
                  </Box>
                  {getSportIcon(match?.sport)}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {getClubLogo(match?.away)}
                    <Typography
                      fontSize={12}
                      marginTop={1}
                      textAlign={"center"}
                    >
                      <b>{match.away}</b>
                    </Typography>
                  </Box>
                </Box>
                <Typography fontSize={14}>
                  {match.matchInfo ? match.matchInfo : null}
                </Typography>
              </Box>
            </Box>
            <PrematchOdds
              betPickGroupMap={betPickGroupMap}
              match={match}
              matchedOdds={matchedOdds}
              betPickMap={betPickMap}
              sportId={sportId}
            />
          </Box>
        </Box>
      ) : (
        // !MOBILE
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box width={"100%"}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "90%",
              borderRadius: 2,
              position: "relative", // Dodajemo relativno pozicioniranje na Box
              overflow: "hidden",
              paddingTop: 1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 1000, // Providni crni overlay
              }}
            />
            <img
              src={getSportsBackgroundPath(match.sport)}
              style={{
                position: "absolute",
                top: "50%", // Postavljanje slike na polovinu visine Boxa
                left: "50%", // Postavljanje slike na polovinu širine Boxa
                transform: "translate(-50%, -50%)", // Centriranje slike
                width: "100%", // Automatsko skaliranje širine slike
              }}
            />
            <Box
              zIndex={1000}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={10} textAlign={"center"}>
                  {match?.leagueName}
                </Typography>

                <Typography fontSize={10} textAlign={"center"}>
                  {formatKickOffTime(match?.kickOffTime)}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {logoSTJson ? getClubLogo(match?.home) : null}
                  <Typography fontSize={12} marginTop={1} textAlign={"center"}>
                    <b>{match.home}</b>
                  </Typography>
                </Box>
                {logoSTJson ? getSportIcon(match?.sport) : null}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {sportId === "AN" || sportId === "LG"
                    ? null
                    : getClubLogo(match?.away)}
                  <Typography fontSize={12} marginTop={1} textAlign={"center"}>
                    <b>{match.away}</b>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              fontSize={12}
              sx={{ zIndex: 1001, mt: 0.6 }}
              color={"white"}
            >
              {match.matchInfo ? match.matchInfo : null}
            </Typography>
          </Box>
          <PrematchOdds
            betPickGroupMap={betPickGroupMap}
            match={match}
            matchedOdds={matchedOdds}
            betPickMap={betPickMap}
            sportId={sportId}
          />
        </Box>
      )}
    </>
  );
};

export default PrematchPage;
