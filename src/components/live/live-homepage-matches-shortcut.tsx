import { Box, Button, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LiveHeaders, LiveResults } from "../../types/live/live";
import LiveDataContext from "../../store/live-data-context";
import { getLiveData } from "../../utils/live-utils/get-live-data";
import LiveMatchItem from "./live-match-item";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const LiveHomeMatchesShortcut: FC = () => {
  const [liveMatches, setliveMatches] = useState<LiveHeaders[]>([]);
  // @ts-ignore
  const [liveSports, setLiveSports] = useState<LiveSports[]>([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const navigate = useNavigate();
  const visibleCount = 3;

  const { state, dispatch } = useContext(LiveDataContext);

  const lastPingTmstmpRef = useRef<number>();
  const lastInitRef = useRef<number>(Date.now());

  const fetchLiveData = useMemo(
    () => getLiveData(dispatch, lastInitRef, lastPingTmstmpRef, setLiveSports),
    [dispatch, setLiveSports, lastInitRef, lastPingTmstmpRef]
  );

  useEffect(() => {
    fetchLiveData();
    setliveMatches(state.liveHeaders.slice(0, 6));
  }, [fetchLiveData, state.liveHeaders]);

  const handleNext = () => {
    setVisibleStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, liveMatches.length - visibleCount)
    );
  };

  const handlePrev = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleLiveMatches = liveMatches.slice(
    visibleStartIndex,
    visibleStartIndex + visibleCount
  );

  return (
    <Box width={"90%"} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#121425", mr: 1 }}
            onClick={handlePrev}
            disabled={visibleStartIndex === 0}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#121425", mr: 1 }}
            onClick={handleNext}
            // disabled={
            //   visibleStartIndex >= visibleLiveMatches.length - visibleCount
            // }
          >
            <ChevronRight />
          </Button>

          <Button
            onClick={() => {
              navigate("/live");
            }}
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 3,
              borderWidth: 0.4,
              borderColor: "#25253A",
              borderStyle: "solid",
              // width: "11%",
            }}
          >
            <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
            <Typography
              textTransform={"none"}
              fontSize={11}
              marginLeft={0.4}
              color={"white"}
            >
              Pogledaj sve
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {visibleLiveMatches.map((item) => {
          const matchingResult = state.liveResults.find(
            (result: LiveResults) => result.mi === item.id
          );
          // if (matchingResult && matchingResult.p !== "NOT_STARTED") {
          return (
            <LiveMatchItem
              key={item.mc}
              item={item}
              matchingResult={matchingResult}
              liveBets={state.liveBets}
            />
          );
          // } else {
          //   null;
          // }
        })}
      </Box>
    </Box>
  );
};

export default LiveHomeMatchesShortcut;
