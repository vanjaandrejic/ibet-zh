import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { LiveHeaders, LiveResults } from "../../types/live/live";
import LiveMarkIcon from "../../assets/icons/live-mark-icon";
import { formatKickOffTime, formatLiveTime } from "../../utils/common";
import YellowCardIcon from "../../assets/icons/yellow-card-icon";
import FlagIcon from "@mui/icons-material/Flag";
import PenaltyIcon from "../../assets/icons/penalty-icon";
import useSportIcon from "../../hooks/useSportIcon";
import NavigationContext from "../../store/navigation-context";

interface LiveMatchBannerProps {
  s?: string;
  match?: LiveHeaders;
  result?: LiveResults;
}

const LiveMatchBanner: FC<LiveMatchBannerProps> = ({ s, match, result }) => {
  const { logoSTJson, logoBJson } = useContext(NavigationContext);

  const getClubLogo = (clubName?: string) => {
    if (!clubName) return null;
    const name = clubName?.replace(/[^A-Z0-9]/gi, "");
    const toLowName = name.toLowerCase();

    let foundObject;

    // @ts-ignore
    // const foundObject = logoSTJson.find((obj) => obj.name === toLowName);

    if (s === "B") {
      // @ts-ignore
      foundObject = logoBJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (match?.h?.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
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
        if (match?.h?.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return <img width="50px" src="/homeJersey365.png"></img>;
        } else {
          return <img width="50px" src="/awayJerey.png"></img>;
        }
      }
    }
  };

  const mapQuarterToNumber = (quarter: string): string | null => {
    switch (quarter) {
      case "FIRST_QUARTER":
        return "1. čet.";
      case "SECOND_QUARTER":
        return "2. čet.";
      case "THIRD_QUARTER":
        return "3. čet.";
      case "FORTH_QUARTER":
        return "4. čet.";
      case "FIRST_SET":
        return "1. set";
      case "SECOND_SET":
        return "2. set";
      case "THIRD_SET":
        return "3. set";
      case "FORTH_SET":
        return "4. set";
      case "FIFTH_SET":
        return "5. set";

      case "PAUSE":
        return "Pauza";

      case "INTERRUPTED":
        return "Prekinuto";

      default:
        return "";
    }
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // border: "1px solid red",
          width: "90%",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          paddingTop: 1,
          paddingBottom: 2,
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
          src={getSportsBackgroundPath(s)}
          alt="Stadium Background"
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
            width: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "42%",
                maxWidth: "42%",
                marginLeft: -2,
              }}
            >
              <Typography fontSize={10} textAlign={"center"} marginRight={2}>
                {match?.lg}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",

                  // border: "1px solid lightgreen",
                  width: "100%",
                  marginBottom: 0.5,
                  paddingLeft: "8%",

                  // animation: `${fadeInOut} 3s ease-in-out infinite`,
                }}
              >
                <LiveMarkIcon width={24} />
                {useSportIcon(match?.s)}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -1,
                  marginBottom: -0.6,
                  paddingLeft: "8%",
                }}
              >
                <Typography fontSize={14} color="#FFBA33" textAlign={"center"}>
                  <b>{result?.p ? mapQuarterToNumber(result?.p) : result?.p}</b>
                </Typography>
                <Typography fontSize={14} color="#FFBA33" textAlign={"center"}>
                  <b>
                    {result?.rpt ? formatLiveTime(result?.rpt) : result?.cm}
                    {result?.p === "INTERRUPTED" ? null : "'"}
                  </b>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "44%",
                maxWidth: "44%",
                marginLeft: -2,
              }}
            >
              <Typography fontSize={10} textAlign={"center"} marginLeft={8}>
                {formatKickOffTime(match?.kot)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "30%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // border: "1px solid blue",
            zIndex: 1000,
          }}
        >
          {match?.s && (match?.s === "S" || match?.s === "VS") ? (
            <Box
              sx={{
                marginLeft: -1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
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
                <YellowCardIcon fill={"#FFBA33"} />
                <Typography fontSize={8}>{result?.hs?.FULLTIME_YC}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <YellowCardIcon fill={"#FF0000"} />
                <Typography fontSize={8}>{result?.hs?.FULLTIME_RC}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  alignItems: "center",
                  marginTop: -0.24,
                }}
              >
                <FlagIcon sx={{ width: 18, height: 18, color: "#4B5E78" }} />
                {/* <CornerIcon /> */}
                <Typography fontSize={8}>
                  {result?.hs?.FULLTIME_CORNERS}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PenaltyIcon />
                <Typography fontSize={8}>
                  {result?.hs?.FULLTIME_PENALTY}
                </Typography>
              </Box>
            </Box>
          ) : null}
          <Box
            sx={{
              marginTop: -2,
              marginLeft: -2,
              width: "56px",
              height: "56px",
            }}
          >
            {getClubLogo(match?.h)}
          </Box>

          {match?.s === "T" || match?.s === "TT" || match?.s === "V" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "38%",
                  // border: "1px solid red",
                }}
              >
                <Typography fontSize={16} marginRight={2} color="white">
                  <b>{result?.hs["CURRENT_SCORE"]}</b>
                </Typography>
                <Typography fontSize={16} color="white">
                  <b>{result?.as["CURRENT_SCORE"]}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  // border: "1px solid red",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {result?.spl === "HOME" ? (
                    <Box
                      sx={{
                        borderRadius: "100%",
                        backgroundColor: "#58AF23",
                        width: 6,
                        height: 6,
                        marginRight: 0.6,
                      }}
                    ></Box>
                  ) : null}

                  <Typography fontSize={14} marginRight={1} color="#FFC211">
                    <b>{result?.hs["GAME_SCORE"]}</b>
                  </Typography>
                  <Typography fontSize={14} color="white">
                    <b>{result?.hs["CURRENT_PERIOD_SCORE"]}</b>
                  </Typography>
                  {/* AWAY */}
                  <Typography
                    fontSize={12}
                    sx={{ marginLeft: 0.4, marginRight: 0.4 }}
                  >
                    |
                  </Typography>
                  <Typography fontSize={14} color="white">
                    <b>{result?.as["CURRENT_PERIOD_SCORE"]}</b>
                  </Typography>
                  <Typography fontSize={14} marginLeft={1} color="#FFC211">
                    <b>{result?.as["GAME_SCORE"]}</b>
                  </Typography>
                  {result?.spl === "AWAY" ? (
                    <Box
                      sx={{
                        borderRadius: "100%",
                        backgroundColor: "#58AF23",
                        width: 6,
                        height: 6,
                        marginLeft: 0.6,
                      }}
                    ></Box>
                  ) : null}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <b>{result?.hs?.CURRENT_SCORE}</b>
                </Typography>
                <Typography>:</Typography>
                <Typography>
                  <b>{result?.as?.CURRENT_SCORE}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -1,
                }}
              >
                <Typography fontSize={10}>{result?.hs?.FIRST_HALF}</Typography>
                <Typography fontSize={10}>:</Typography>
                <Typography fontSize={10}>{result?.as?.FIRST_HALF}</Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              marginTop: -2,
              marginRight: -2,
              width: "56px",
              height: "56px",
            }}
          >
            {getClubLogo(match?.a)}
          </Box>

          {match?.s && (match?.s === "S" || match?.s === "VS") ? (
            <Box
              sx={{
                marginRight: -1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
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
                <YellowCardIcon fill={"#FFBA33"} />
                <Typography fontSize={8}>{result?.as?.FULLTIME_YC}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <YellowCardIcon fill={"#FF0000"} />
                <Typography fontSize={8}>{result?.as?.FULLTIME_RC}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  alignItems: "center",
                  marginTop: -0.24,
                }}
              >
                <FlagIcon sx={{ width: 18, height: 18, color: "#4B5E78" }} />
                {/* <CornerIcon /> */}
                <Typography fontSize={8}>
                  {result?.as?.FULLTIME_CORNERS}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PenaltyIcon />
                <Typography fontSize={8}>
                  {result?.as?.FULLTIME_PENALTY}
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>

        <Box
          sx={{
            zIndex: 1000,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "68%",
            marginTop: 1,
            // border: "1px solid white",
          }}
        >
          <Typography fontSize={12} textAlign={"center"}>
            <b>{match?.h}</b>
          </Typography>
          {/* <Typography
            fontSize={14}
            textAlign={"center"}
            marginLeft={0.5}
            marginRight={0.5}
          >
            -
          </Typography> */}
          <Typography fontSize={12} textAlign={"center"}>
            <b>{match?.a}</b>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <Typography fontSize={12} color={"#FFBA33"}>
          Kvote
        </Typography>
        <Typography fontSize={12} color={"#697484"}>
          Statistika
        </Typography>
        <Typography fontSize={12} color={"#697484"}>
          H2H
        </Typography>
        <Typography fontSize={12} color={"#697484"}>
          Postave
        </Typography>
      </Box>
    </>
  );
};

export default LiveMatchBanner;
