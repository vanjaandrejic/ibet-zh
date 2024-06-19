import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import axios from "axios";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Match } from "../types/match";
import MatchItem from "../components/matches/match-item";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LiveDataContext from "../store/live-data-context";
import { getLiveData } from "../utils/live-utils/get-live-data";
import { LiveHeaders, LiveResults, LiveSports } from "../types/live/live";
import LiveMatchItem from "../components/live/live-match-item";

const SearchPage: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialRequestSent, setInitialRequestSent] = useState<boolean>(false);
  const [liveResults, setLiveResults] = useState<LiveHeaders[]>([]);
  // @ts-ignore
  const [liveSports, setLiveSports] = useState<LiveSports[]>([]);

  const { state, dispatch } = useContext(LiveDataContext);

  const lastPingTmstmpRef = useRef<number>();
  const lastInitRef = useRef<number>(Date.now());

  const fetchLiveData = useMemo(
    () => getLiveData(dispatch, lastInitRef, lastPingTmstmpRef, setLiveSports),
    [dispatch, setLiveSports, lastInitRef, lastPingTmstmpRef]
  );

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  useEffect(() => {
    const filterLiveHeaders = (liveHeaders: LiveHeaders[], search: string) => {
      const lowercaseSearch = search.toLowerCase();
      return liveHeaders.filter(
        (header) =>
          header.a.toLowerCase().includes(lowercaseSearch) ||
          header.h.toLowerCase().includes(lowercaseSearch) ||
          header.lg.toLowerCase().includes(lowercaseSearch)
      );
    };

    let filteredLiveHeaders: LiveHeaders[] = [];
    if (search.length > 2 && search !== "") {
      filteredLiveHeaders = filterLiveHeaders(state.liveHeaders, search);
    }
    setLiveResults(filteredLiveHeaders);
  }, [state.liveHeaders, search]);

  // console.log("liveResults", liveResults);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading(true);
      setInitialRequestSent(true); // Set initialRequestSent to true when the first request is sent
      try {
        const response = await axios.get(
          // `https://www.365.rs/ibet/search/matchesSearch/${search}.json`,
          `https://www.365.rs/restapi/offer/sr/search/${search}/mob?mobileVersion=2.30.12&locale=sr`,
          {
            // params: {
            //   mobileVersion: "2.30.12",
            //   locale: "sr",
            // },
          }
        );
        setSearchResult(response.data.esMatches);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    if (search.length > 2) {
      fetchSearch();
    } else {
      setSearchResult([]); // Clear search result if search term is less than 4 characters
    }
  }, [search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        // margin: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: -8,
        // border: "1px solid red",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          maxWidth: 1000,
        }}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBack sx={{ marginRight: 2, marginLeft: 1 }} />
        </IconButton>
        <TextField
          label="Search"
          size="small"
          color="warning"
          onChange={handleSearchChange}
          fullWidth
          sx={{ marginRight: 4 }}
        />
      </Box>

      <Grid
        container
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        pb={8}
        // maxWidth={740}
      >
        {liveResults.map((item: LiveHeaders) => {
          const matchingResult = state.liveResults.find(
            (result: LiveResults) => result.mi === item.id
          );
          return (
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={item.id} item>
              <LiveMatchItem item={item} matchingResult={matchingResult} />
            </Grid>
          );
        })}

        {isLoading ? (
          <CircularProgress />
        ) : initialRequestSent &&
          searchResult.length === 0 &&
          liveResults.length === 0 &&
          search.length > 2 ? (
          <Typography variant="h6">Nismo pronasli rezultat!</Typography>
        ) : (
          searchResult.map((match: Match) => (
            // <Grid key={match.id} item xs={12} sm={6} lg={3}>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={match.id} item>
              <MatchItem
                match={match}
                sportId={match.sport}
                leagueName={match.leagueName}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default SearchPage;
