import { Box, CircularProgress, IconButton } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BetDataContext from "../store/bet-data-context";
import LiveDataContext from "../store/live-data-context";
import { LiveBets } from "../types/live/live";
import { BetPickGroupMap, BetPickGroupPosition } from "../types/bet";
import { getLiveData } from "../utils/live-utils/get-live-data";
import useFillMatchedOddsState from "../utils/live-utils/get-matched-odds-live";
import RenderOdds from "../components/live/live-match-odds";
import { ArrowBack } from "@mui/icons-material";

const LiveOfferPage: FC = () => {
  const { mc, s } = useParams<{ mc: string; s: string }>();
  const { betPickMap, betLines, betPickGroupMap, betPickGroupPositions } =
    useContext(BetDataContext);
  const { state, dispatch } = useContext(LiveDataContext);
  const [exactBets, setExactBets] = useState<LiveBets[]>([]);
  const [betPickGroupPositionsUsed, setBetPickGroupPositionsUsed] =
    useState<BetPickGroupPosition>({});
  const [filteredBetPickGroupMap, setFilteredBetPickGroupMap] = useState<
    BetPickGroupMap | object
  >({});
  const [matchedOdds, setMatchedOdds] = useState<{
    [name: string]: { odds: { [key: string]: number }; code: number };
  }>({});

  const lastPingTmstmpRef = useRef<number>();
  const lastInitRef = useRef<number>(Date.now());

  const navigate = useNavigate();

  const fetchLiveData = useMemo(
    () => getLiveData(dispatch, lastInitRef, lastPingTmstmpRef),
    [dispatch, lastInitRef, lastPingTmstmpRef]
  );

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  const [isLoading, setIsLoading] = useState(true); // Dodato stanje isLoading

  useEffect(() => {
    if (s) {
      // @ts-ignore
      const positions = betPickGroupPositions["MOBILE_LIVE_TOP"];
      if (positions) {
        const filteredPosition: BetPickGroupPosition = Object.entries(positions)
          .filter(([key]) => key === s)
          .reduce((acc, [key, value]) => {
            // @ts-ignore
            acc[key] = value;
            return acc;
          }, {});

        if (filteredPosition[s]) {
          setBetPickGroupPositionsUsed(
            // @ts-ignore
            filteredPosition[s]["DEFAULT"][0]["betPickGroupPositions"]
          );
        }
      }
    }
  }, [s, betPickGroupPositions]);

  const filteredBets = useMemo(() => {
    return state.liveBets.filter(
      (bet: LiveBets) => bet.mc === parseInt(mc as string)
    );
  }, [state.liveBets, mc]);

  // console.log("filteredBets", filteredBets);

  useEffect(() => {
    setExactBets(filteredBets);
    setIsLoading(false);
  }, [filteredBets]);

  // console.log("exactBets", exactBets);

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

  const fillMatchedOddsState = useFillMatchedOddsState(
    betPickGroupMap,
    betLines,
    exactBets,
    filteredBetPickGroupMap,
    setMatchedOdds
  );

  useEffect(() => {
    fillMatchedOddsState();
  }, [fillMatchedOddsState]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: 1000,
      }}
    >
      <Box width={"100%"}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
      </Box>
      {isLoading ? (
        <Box my={2}>
          <CircularProgress />
        </Box>
      ) : (
        <RenderOdds
          exactBets={exactBets}
          matchedOdds={matchedOdds}
          betPickMap={betPickMap}
          s={s}
          mc={mc}
        />
      )}
    </Box>
  );
};

export default LiveOfferPage;
