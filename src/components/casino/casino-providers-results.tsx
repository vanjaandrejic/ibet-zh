import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { CasinoGame } from "../../types/casino/casino-full-types";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import CasinoGameCard from "./casino-game-card";
import CasinoDesktopGameCard from "./casino-desktop-game-card";
import CasinoGameCard from "./casino-game-card";

interface CasinoProvidersResultProps {
  // @ts-ignore
  games: any[];
  provider?: string;
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
}

const CasinoProvidersResult: FC<CasinoProvidersResultProps> = ({
  games,
  provider,
  handleOpenGame,
}) => {
  const [providerGames, setProviderGames] = useState<CasinoGame[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const filteredGames = games.filter(
      (game) => game.gameProducer === provider
    );
    setProviderGames(filteredGames);
  }, [games, provider]);

  const renderedGames = useMemo(
    () =>
      providerGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [handleOpenGame, providerGames]
  );

  const renderedDesktopGames = useMemo(
    () =>
      providerGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoDesktopGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [providerGames, handleOpenGame]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "86%",
          marginBottom: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={16}>
          <b>{provider}</b>
        </Typography>
        <Typography fontSize={16}>{providerGames.length}</Typography>
      </Box>
      <Grid
        container
        spacing={1}
        justifyContent="flex-start"
        alignItems="center"
        width={"90%"}
        marginBottom={2}
      >
        {isDesktop ? renderedDesktopGames : renderedGames}
      </Grid>
    </Box>
  );
};

export default CasinoProvidersResult;
