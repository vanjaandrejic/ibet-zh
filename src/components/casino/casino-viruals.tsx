import React, { FC, Suspense, useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import CasinoGameCard from "./casino-game-card";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CasinoDesktopGameCard from "./casino-desktop-game-card";
import CasinoGameCard from "./casino-game-card";

interface CasinoVirtualsProps {
  // @ts-ignore
  games: any[];
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
}

const CasinoVirtuals: FC<CasinoVirtualsProps> = ({ games, handleOpenGame }) => {
  const [virtualGames, setVirtualGames] = useState<CasinoGame[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const virtualHelpeer: CasinoGame[] = [];

    games.map((game) => {
      virtualHelpeer.push(game.casinoGame);
    });

    setVirtualGames(virtualHelpeer);
  }, [games]);

  const renderedGames = useMemo(
    () =>
      virtualGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [handleOpenGame, virtualGames]
  );

  const renderedDesktopGames = useMemo(
    () =>
      virtualGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoDesktopGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [virtualGames, handleOpenGame]
  );
  return (
    <React.Fragment>
      <Box
        sx={{
          mt: 1,
          width: "86%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography fontSize={16}>
          <b>VIRTUALI</b>
        </Typography>
        {/* <Typography
          fontSize={16}
          color="white"
          marginBottom={2}
          textAlign={"center"}
        >
          {games.length}
        </Typography> */}
      </Box>

      <Grid
        container
        spacing={1}
        justifyContent="flex-start"
        alignItems="center"
        width={"90%"}
        marginBottom={2}
        mt={1}
      >
        {isDesktop ? renderedDesktopGames : renderedGames}
      </Grid>
    </React.Fragment>
  );
};

export default CasinoVirtuals;
