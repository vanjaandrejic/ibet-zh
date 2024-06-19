import { Box, IconButton } from "@mui/material";
import { FC, useState, useEffect, useCallback } from "react";
import { getLobbyData } from "../utils/api/casino/get-casino-games";
import getGameartGameUrl from "../utils/api/casino/get-casino-game-url";
import { CasinoGame } from "../types/casino/casino-full-types";
import getPragmaticGameUrl from "../utils/api/casino/get-pragmatic-game-url";
import { useNavigate } from "react-router-dom";
import getEvoplayGameUrl from "../utils/api/casino/get-evoplay-game-url";
import getFaziGameUrl from "../utils/api/casino/get-fazi-game-url";
import { getVirtuals } from "../utils/api/casino/get-virtual-games";
import CasinoSearchComponent from "../components/casino/casino-search-component";
import { ArrowBack } from "@mui/icons-material";

const CasinoSearchPage: FC = () => {
  // @ts-ignore
  //   const [games, setGames] = useState<any[]>([]);
  // @ts-ignore
  //   const [liveDealerGames, setLiveGamesTables] = useState<any[]>([]);
  const [virtualGames, setVirtualGames] = useState<any[]>([]);
  const [originalGames, setOriginalGames] = useState<CasinoGame[]>([]);

  //   const isDesktop = useMediaQuery("(min-width:1024px)");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lobbyData = await getLobbyData();
        // const liveGamesTables = await getLiveGamesData();
        const virtualGames = await getVirtuals();

        // setLiveGamesTables(liveGamesTables.lobbyCasinoGames);
        // setGames(lobbyData.lobbyCasinoGames);
        setVirtualGames(virtualGames.lobbyCasinoGames);
        setOriginalGames(
          lobbyData.lobbyCasinoGames.map((game) => game.casinoGame)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log("virtualGames", virtualGames);

  const handleOpenGame = useCallback(
    async (gameId: string, provider: string, demo: boolean) => {
      let urlResponse;
      if (provider === "GAMEART") {
        try {
          const response = await getGameartGameUrl(gameId, demo);
          urlResponse = response.response;
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a:", error);
          return;
        }
      } else if (provider === "PRAG") {
        try {
          const response = await getPragmaticGameUrl(gameId, demo);
          urlResponse = response.string;
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a:", error);
          return;
        }
      } else if (provider === "EVOPLAY") {
        try {
          const response = await getEvoplayGameUrl(gameId, demo);
          urlResponse = response.string;
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a:", error);
          return;
        }
      } else if (provider === "FAZI") {
        try {
          urlResponse = await getFaziGameUrl(gameId, demo);
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a za FAZI:", error);
          return;
        }
      } else if (provider === "ELBET") {
        try {
          urlResponse =
            "https://online.ibet365.elbet.com/lucky-balls/index.html?help=0&lang=rs";
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a za FAZI:", error);
          return;
        }
      }

      navigate("/slot-game", { state: { selectedGameUrl: urlResponse } });
    },
    [navigate]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: -8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={() => navigate("/slot")}>
        <ArrowBack sx={{ marginRight: 1, marginLeft: 1 }} />
      </IconButton>
      <CasinoSearchComponent
        originalGames={originalGames}
        handleOpenGame={handleOpenGame}
      />
    </Box>
  );
};

export default CasinoSearchPage;
