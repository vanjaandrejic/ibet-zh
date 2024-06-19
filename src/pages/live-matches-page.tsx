import { Box, CircularProgress, Grid } from "@mui/material";
import {
  FC,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LiveHeaders, LiveResults, LiveSports } from "../types/live/live";
import LiveMatchesNavigation from "../components/live/live-matches-navigation";
import LiveDataContext from "../store/live-data-context";
import { lazy } from "react";
import { getLiveData } from "../utils/live-utils/get-live-data";
import NavigationContext from "../store/navigation-context";
const LiveMatchItem = lazy(() => import("../components/live/live-match-item"));

export interface EventMessage {
  liveResults: LiveResults[];
  liveSports: LiveSports[];
  liveHeaders: LiveHeaders[];
}

const LiveMatchesPage: FC = () => {
  const [liveSports, setLiveSports] = useState<LiveSports[]>([]);
  // const [sportToFilter, setSportToFilter] = useState<string | null>("S");

  const { state, dispatch } = useContext(LiveDataContext);

  const { liveSportToFilter, setLiveSportToFilter } =
    useContext(NavigationContext);

  const lastPingTmstmpRef = useRef<number>();
  const lastInitRef = useRef<number>(Date.now());

  const fetchLiveData = useMemo(
    () => getLiveData(dispatch, lastInitRef, lastPingTmstmpRef, setLiveSports),
    [dispatch, setLiveSports, lastInitRef, lastPingTmstmpRef]
  );

  // console.log(state.liveHeaders[0]);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  const liveMatchItems = useMemo(() => {
    let filteredHeaders = state.liveHeaders;

    // console.log(filteredHeaders);

    if (liveSportToFilter !== null) {
      filteredHeaders = filteredHeaders.filter(
        (header) => header.s === liveSportToFilter
      );
    }

    return filteredHeaders
      .sort((a: any, b: any) => parseInt(a.lsv) + parseInt(b.lsv))

      .map((item: LiveHeaders) => {
        const matchingResult = state.liveResults.find(
          (result: LiveResults) => result.mi === item.id
        );

        if (matchingResult && matchingResult.p !== "NOT_STARTED") {
          return (
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={item.id} item>
              <Suspense key={item.id} fallback={<CircularProgress />}>
                <LiveMatchItem
                  item={item}
                  matchingResult={matchingResult}
                  liveBets={state.liveBets}
                />
              </Suspense>
            </Grid>
          );
        } else {
          return null;
        }
      });
  }, [state.liveHeaders, state.liveResults, state.liveBets, liveSportToFilter]);

  const handleSortMatches = (clickedSport: string | null) => {
    if (clickedSport === "SVE") {
      setLiveSportToFilter(null);
    } else {
      setLiveSportToFilter(clickedSport);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "flex-start",
          borderTop: "0.5px solid #2F3B4B",
          borderBottom: "0.5px solid #2F3B4B",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            flexDirection: "row",
            flexWrap: "nowrap",
            // minWidth: "fit-content",
            // margin: 1,
          }}
          // spacing={1}
        >
          {/* <Grid item>
            <IconButton onClick={() => handleSortMatches(null)}>
              <DashboardIcon sx={{ color: "#62646D" }} />
            </IconButton>
          </Grid> */}
          {liveSports
            .sort((a: any, b: any) => a.sportSortValue - b.sportSortValue)
            .map((item) => (
              <Grid item key={item.sport}>
                <LiveMatchesNavigation
                  liveSportItem={item}
                  handleButtonClick={handleSortMatches}
                  sportToFilter={liveSportToFilter}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={3}
        mt={1}
      >
        {liveMatchItems}
      </Grid>
    </>
  );
};

export default LiveMatchesPage;
