import { Box, IconButton, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { formatKickOffTime, getBetCaption } from "../../utils/common";
import { TicketMatch } from "../../types/match";
import FootballIcon from "../../assets/icons/football-svg";
import AppContext from "../../store/app-context";
import { BetPickMap } from "../../types/bet";
import LiveMarkIcon from "../../assets/icons/live-mark-icon";
import LiveDataContext from "../../store/live-data-context";
import { LiveBet } from "../../types/live/live-message";
import { getLiveData } from "../../utils/live-utils/get-live-data";
import { LiveHeaders } from "../../types/live/live";

interface TicketItemProps {
  match: TicketMatch;
  betPickMap: BetPickMap | object;
  fromSystem?: number;
}

const TicketItem: FC<TicketItemProps> = ({ match, betPickMap, fromSystem }) => {
  const { state, dispatch } = useContext(LiveDataContext);

  const [liveMatch, setLiveMatch] = useState<LiveHeaders | null>(null);
  const [liveMatchBets, setLiveMatchBets] = useState<LiveBet[]>([]);
  const [exactBet, setExactBet] = useState<object>({});
  // @ts-ignore
  const [liveSports, setLiveSports] = useState<LiveSports[]>([]);

  const lastPingTmstmpRef = useRef<number>();
  const lastInitRef = useRef<number>(Date.now());

  const { updateMatch, removeMatchFromTicket } = useContext(AppContext);

  const fetchLiveData = useMemo(
    () => getLiveData(dispatch, lastInitRef, lastPingTmstmpRef, setLiveSports),
    [dispatch, setLiveSports, lastInitRef, lastPingTmstmpRef]
  );

  useEffect(() => {
    if (match.selectedOdd.live) {
      fetchLiveData();
    }
  }, [fetchLiveData, match.selectedOdd.live]);

  useEffect(() => {
    const foundLiveMatch = state.liveHeaders.find(
      (item) => item.mc === match.matchCode
    );
    setLiveMatch(foundLiveMatch || null);

    const foundLiveMatchBets = state.liveBets.filter(
      (item) => item.mc === match.matchCode
    );
    // @ts-ignore
    setLiveMatchBets(foundLiveMatchBets);
  }, [match.matchCode, state.liveBets, state.liveHeaders]);

  // console.log(liveMatchBets);

  useEffect(() => {
    if (liveMatch?.ls === "FINISHED") {
      removeMatchFromTicket(match.matchCode, match.selectedOdd.betCode);
    } else if (liveMatch && exactBet) {
      const matchId = liveMatch.id;
      const blocked =
        !liveMatch.ba || liveMatch.ls !== "RUNNING" ? true : false;
      const updatedProperties = {
        blocked: blocked, // Use liveMatch.ba to set blocked
        selectedOdd: {
          ...match.selectedOdd,
          // @ts-ignore
          odd: exactBet.ov, // Update only the odd property
        },
      };

      // Call updateMatch function to update specific match properties
      updateMatch(matchId, updatedProperties);
    }
  }, [
    exactBet,
    liveMatch,
    match.id,
    match.selectedOdd,
    updateMatch,
    removeMatchFromTicket,
    match.matchCode,
  ]);

  // console.log("liveMatch", exactBet);

  useEffect(() => {
    // console.log("liveMatchBets", liveMatchBets); // Log liveMatchBets array
    // console.log("match.selectedOdd.betCode", match.selectedOdd.betPickCode); // Log selected bet code

    let foundExactBet: any | null = null;

    liveMatchBets.forEach((bet) => {
      for (const key in bet.om) {
        if (bet.om[key].bpc === match.selectedOdd.betPickCode) {
          foundExactBet = bet.om[key];
          break;
        }
      }

      if (foundExactBet) return;
    });

    if (foundExactBet) {
      // console.log("foundExactBet", foundExactBet); // Log found exact bet
      setExactBet(foundExactBet);
    }
  }, [liveMatchBets, match.selectedOdd.betCode, match.selectedOdd.betPickCode]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#0D0D19",
        borderRadius: 3,
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0D19",
          paddingLeft: 1,
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {match.selectedOdd.live ? (
                <LiveMarkIcon width={"1.4rem"} />
              ) : null}
              <FootballIcon width={"1.4rem"} fill="silver" />
            </Box>

            <Box>
              <Typography fontSize={10} sx={{ marginLeft: 1 }} color="white">
                <b>
                  {match.home} - {match.away}
                </b>
              </Typography>
              <Typography
                fontSize={10}
                color={"#62646D"}
                sx={{ marginLeft: 1, marginTop: 1 }}
              >
                <b>{formatKickOffTime(match.kickOffTime)}</b>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography fontSize={12} color={"#62646D"} marginRight={3}>
                <b>
                  {getBetCaption(
                    String(match?.selectedOdd?.betCode),
                    match.sport,
                    betPickMap
                  )}
                </b>
              </Typography>
              {match.selectedOdd.specialValue ? (
                <Typography fontSize={12} color={"#62646D"} marginRight={3}>
                  <b>{match.selectedOdd.specialValue}</b>
                </Typography>
              ) : null}
            </Box>
            {match.selectedOdd.live && exactBet ? (
              <Typography fontSize={12} color="white" marginRight={2}>
                <b>
                  {/* {
                    // @ts-ignore
                    exactBet.ov?.toFixed(2)
                  } */}

                  {match?.selectedOdd?.odd
                    ? Number(match?.selectedOdd?.odd).toFixed(2)
                    : null}
                </b>
              </Typography>
            ) : (
              <Typography fontSize={12} color="white" marginRight={2}>
                <b>
                  {match?.selectedOdd?.odd
                    ? Number(match?.selectedOdd?.odd).toFixed(2)
                    : null}
                </b>
              </Typography>
            )}

            {fromSystem === 1 ? null : (
              <IconButton
                onClick={() =>
                  removeMatchFromTicket(
                    match.matchCode,
                    match.selectedOdd.betCode
                  )
                }
              >
                <Typography fontSize={18} color="#f1b812">
                  x
                </Typography>
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketItem;
