import React, {
  FC,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import CasinoGameCard from "./casino-game-card";
import { CasinoGame } from "../../types/casino/casino-full-types";
import NavigationContext from "../../store/navigation-context";
import CasinoGameCard from "./casino-game-card";
import CasinoDesktopGameCard from "./casino-desktop-game-card";

interface CasinoFavoriteGamesProps {
  games: { casinoGame: CasinoGame }[];
  virtualGames: CasinoGame[];
  liveDealerGames: { casinoGame: CasinoGame }[];

  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
}

const CasinoFavoriteGames: FC<CasinoFavoriteGamesProps> = ({
  games,
  virtualGames,
  liveDealerGames,
  handleOpenGame,
}) => {
  const [favoriteGamesRender, setFavoriteGamesRender] = useState<CasinoGame[]>(
    []
  );
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const { favoriteGames } = useContext(NavigationContext);

  useEffect(() => {
    const allGames = [...games, ...virtualGames, ...liveDealerGames];

    const virtualHelpeer: CasinoGame[] = allGames
      // @ts-ignore
      .filter((game) => favoriteGames[game.casinoGame?.gid])
      // @ts-ignore
      .map((game) => game.casinoGame);

    setFavoriteGamesRender(virtualHelpeer);
  }, [favoriteGames, liveDealerGames, games, virtualGames]);

  const renderedGames = useMemo(
    () =>
      favoriteGamesRender.map((game) => (
        <Suspense key={game.gid} fallback={<CircularProgress />}>
          <CasinoGameCard
            key={game.gid}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [handleOpenGame, favoriteGamesRender]
  );

  const renderedDesktopGames = useMemo(
    () =>
      favoriteGamesRender.map((game) => (
        <Suspense key={game.gid} fallback={<CircularProgress />}>
          <CasinoDesktopGameCard
            key={game.gid}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [favoriteGamesRender, handleOpenGame]
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
          mb: 2,
        }}
      >
        <Typography fontSize={16}>
          <b>OMILJENE IGRE</b>
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
        width={"90%"}
        marginBottom={2}
      >
        {isDesktop ? renderedDesktopGames : renderedGames}
      </Grid>
    </React.Fragment>
  );
};

export default CasinoFavoriteGames;
