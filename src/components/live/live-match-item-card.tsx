import { FC, useContext } from "react";
import PenaltyIcon from "../../assets/icons/penalty-icon";
import FlagIcon from "@mui/icons-material/Flag";
import YellowCardIcon from "../../assets/icons/yellow-card-icon";
import { Box, Typography } from "@mui/material";
import { formatLiveTime } from "../../utils/common";
import { mapQuarterToNumber } from "../../utils/live-utils/live-common";
import LiveMarkIcon from "../../assets/icons/live-mark-icon";
import { LiveHeaders, LiveResults } from "../../types/live/live";
import { useNavigate } from "react-router-dom";
import useSportIcon from "../../hooks/useSportIcon";
import NavigationContext from "../../store/navigation-context";

interface LiveMatchBannerProps {
  item: LiveHeaders;
  matchingResult?: LiveResults;
}

const LiveMatchItemCard: FC<LiveMatchBannerProps> = ({
  item,
  matchingResult,
}) => {
  const navigate = useNavigate();
  const sportIcon = useSportIcon(item.s);
  // const getClubLogo = (clubName: string) => {
  //   const name = clubName.replace(/[^A-Z0-9]/gi, "");
  //   const toLowName = name.toLowerCase();

  //   let url: string;

  //   if (item?.s === "B") {
  //     url = `https://ibet-365.com/content/club-icons-b/${toLowName}.webp`;
  //   } else {
  //     url = `https://ibet-365.com/content/club-icons/${toLowName}.webp`;
  //   }

  //   return <img width="40px" src={url}></img>;
  // };|

  const { logoSTJson, logoBJson } = useContext(NavigationContext);

  const getClubLogo = (clubName?: string) => {
    if (!clubName) return null;
    const name = clubName?.replace(/[^A-Z0-9]/gi, "");
    const toLowName = name.toLowerCase();

    let foundObject;

    // @ts-ignore
    // const foundObject = logoSTJson.find((obj) => obj.name === toLowName);

    if (item.s === "B") {
      // @ts-ignore
      foundObject = logoBJson.find((obj) => obj.name === toLowName);
      if (foundObject) {
        // @ts-ignore
        return <img width="50px" src={foundObject.url}></img>;
      } else {
        if (item?.h?.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
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
        if (item?.h?.replace(/[^A-Z0-9]/gi, "").toLowerCase() === toLowName) {
          return <img width="50px" src="/homeJersey365.png"></img>;
        } else {
          return <img width="50px" src="/awayJerey.png"></img>;
        }
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        item.ba || item.ls === "RUNNING"
          ? navigate(`/live-offer/${item.s}/${item.mc}`)
          : null;
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginRight: 1,
              width: "40px",
            }}
          >
            {getClubLogo(item.h)}
          </Box>
          {item.s === "T" || item.s === "TT" || item.s === "V" ? null : (
            <Typography fontSize={18} ml={1.6}>
              <b>{matchingResult?.hs["CURRENT_SCORE"]}</b>
            </Typography>
          )}
        </Box>
        <Typography
          fontSize={10}
          textAlign={"center"}
          marginTop={1}
          marginLeft={-2}
        >
          <b>{item.h}</b>
        </Typography>
        {item.s && (item.s === "S" || item.s === "VS") ? (
          <Box
            sx={{
              // border: "1px solid red",
              marginLeft: -1,
              // width: 80,
              // height: 20,
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
              {/* <Typography fontSize={8}>ZK</Typography> */}
              <Typography fontSize={8}>
                {matchingResult?.hs["FULLTIME_YC"]}
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
              <YellowCardIcon fill={"#FF0000"} />
              <Typography fontSize={8}>
                {matchingResult?.hs["FULLTIME_RC"]}
              </Typography>
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
                {" "}
                {matchingResult?.hs["FULLTIME_CORNERS"]}
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
                {matchingResult?.hs["FULLTIME_PENALTY"]}
              </Typography>
            </Box>
            {/* <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>ZK</Typography>
      <Typography>1</Typography>
    </Box> */}
          </Box>
        ) : null}
      </Box>

      <Box
        sx={{
          width: "100%",
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

            alignItems: "center",
            justifyContent: "space-between",
            width: "46%",
            marginBottom: 0.5,

            // animation: `${fadeInOut} 3s ease-in-out infinite`,
          }}
        >
          <LiveMarkIcon width={24} />
          {sportIcon}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0.5,
          }}
        >
          <Typography fontSize={8} sx={{ textAlign: "center" }}>
            <b>{item.lg}</b>
          </Typography>
        </Box>
        {/* <Typography
      color="#FFC211"
      fontSize={14}
      // sx={{ animation: `${fadeInOut} 3s ease-in-out infinite` }}
    > */}
        {item.s === "T" || item.s === "TT" || item.s === "V" ? (
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
                <b>{matchingResult?.hs["CURRENT_SCORE"]}</b>
              </Typography>
              <Typography fontSize={16} color="white">
                <b>{matchingResult?.as["CURRENT_SCORE"]}</b>
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
                {matchingResult?.spl === "HOME" ? (
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
                  <b>{matchingResult?.hs["GAME_SCORE"]}</b>
                </Typography>
                <Typography fontSize={14} color="white">
                  <b>{matchingResult?.hs["CURRENT_PERIOD_SCORE"]}</b>
                </Typography>
                {/* AWAY */}
                <Typography
                  fontSize={12}
                  sx={{ marginLeft: 0.4, marginRight: 0.4 }}
                >
                  |
                </Typography>
                <Typography fontSize={14} color="white">
                  <b>{matchingResult?.as["CURRENT_PERIOD_SCORE"]}</b>
                </Typography>
                <Typography fontSize={14} marginLeft={1} color="#FFC211">
                  <b>{matchingResult?.as["GAME_SCORE"]}</b>
                </Typography>
                {matchingResult?.spl === "AWAY" ? (
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
          <Box>
            <Typography fontSize={14} color="#FFC211" textAlign={"center"}>
              <b>
                {matchingResult?.p
                  ? mapQuarterToNumber(matchingResult?.p)
                  : matchingResult?.p}
              </b>
            </Typography>
            <Typography fontSize={14} color="#FFC211" textAlign={"center"}>
              <b>
                {matchingResult?.rpt
                  ? formatLiveTime(matchingResult?.rpt)
                  : matchingResult?.cm}
                {matchingResult?.p === "INTERRUPTED" ? null : "'"}
              </b>
            </Typography>
          </Box>

          // <b>{getResultTime(matchingResult)}</b>
        )}
        {/* </Typography> */}

        {matchingResult && parseInt(matchingResult?.cm) > 45 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "40%",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={10} color={"#62646D"}>
              <b>1.P</b>
            </Typography>
            <Typography fontSize={10} color={"#62646D"}>
              <b>{matchingResult?.hs["FIRST_HALF"]}</b> -
              <b>{matchingResult?.as["FIRST_HALF"]}</b>
            </Typography>
          </Box>
        ) : null}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.s === "T" || item.s === "TT" || item.s === "VB" ? null : (
            <Typography fontSize={18}>
              <b>{matchingResult?.as["CURRENT_SCORE"]}</b>
            </Typography>
          )}
          {/* <ClubLogoIcon fill={"#FFC211"} /> */}
          <Box
            sx={{
              width: "40px",
              marginLeft: 1,
            }}
          >
            {getClubLogo(item.a)}
          </Box>
        </Box>
        <Typography
          fontSize={10}
          textAlign={"center"}
          marginTop={1}
          marginRight={-3}
        >
          <b>{item.a}</b>
        </Typography>
        {item.s && (item.s === "S" || item.s === "VS") ? (
          <Box
            sx={{
              // border: "1px solid red",
              marginRight: -1,
              // width: 80,
              // height: 20,
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
              {/* <Typography fontSize={8}>ZK</Typography> */}
              <Typography fontSize={8}>
                {matchingResult?.as["FULLTIME_YC"]}
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
              <YellowCardIcon fill={"#FF0000"} />
              <Typography fontSize={8}>
                {matchingResult?.as["FULLTIME_RC"]}
              </Typography>
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
                {" "}
                {matchingResult?.as["FULLTIME_CORNERS"]}
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
                {matchingResult?.as["FULLTIME_PENALTY"]}
              </Typography>
            </Box>
            {/* <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>ZK</Typography>
      <Typography>1</Typography>
    </Box> */}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default LiveMatchItemCard;
