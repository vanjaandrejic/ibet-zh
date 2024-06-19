import React, { FC, Suspense, useEffect, useMemo } from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
// import CasinoGameCard from "./casino-game-card";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CasinoLiveNavigation from "./casino-live-navigation";
import CasinoDesktopGameCard from "./casino-desktop-game-card";
import CasinoLiveNavigationDesktop from "./casino-live-navigation-desktop";
import CasinoGameCard from "./casino-game-card";

interface CasinoSlotsComponentProps {
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
  activeLiveButton: string;
  filteredLiveGames: CasinoGame[];
  setActiveLiveButton: (sortValue: string) => void;
  handleLiveSort: (sortValue: string) => void;
}

const CasinoLiveDealerComponent: FC<CasinoSlotsComponentProps> = ({
  handleOpenGame,
  activeLiveButton,
  setActiveLiveButton,
  handleLiveSort,
  filteredLiveGames,
}) => {
  // const [filteredLiveGames, setFilteredLiveGames] = useState<CasinoGame[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  // const handleSort = useMemo(() => {
  //   const sortGames = (sortValue: string) => {
  //     // @ts-ignore
  //     const sortedGames = games.reduce((acc: any[], game) => {
  //       const filteredRooms = game.casinoRooms.filter(
  //         // @ts-ignore
  //         (room: any) => room.sortValue === sortValue
  //       );
  //       if (filteredRooms.length > 0) {
  //         acc.push({
  //           ...game.casinoGame,
  //           casinoRooms: filteredRooms,
  //         });
  //       }
  //       return acc;
  //     }, []);
  //     setFilteredGames(
  //       sortedGames.sort((a, b) => b.orderNumber - a.orderNumber)
  //     );
  //   };
  //   return sortGames;
  // }, [games]);

  useEffect(() => {
    handleLiveSort(activeLiveButton);
  }, [activeLiveButton, handleLiveSort]);

  console.log(activeLiveButton);
  const renderedGames = useMemo(
    () =>
      filteredLiveGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [filteredLiveGames, handleOpenGame]
  );

  const renderedDesktopGames = useMemo(
    () =>
      filteredLiveGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoDesktopGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [filteredLiveGames, handleOpenGame]
  );
  return (
    <React.Fragment>
      {isDesktop ? (
        <CasinoLiveNavigationDesktop
          handleSort={handleLiveSort}
          activeButton={activeLiveButton}
          setActiveButton={setActiveLiveButton}
        />
      ) : (
        <CasinoLiveNavigation
          handleSort={handleLiveSort}
          activeButton={activeLiveButton}
          setActiveButton={setActiveLiveButton}
        />
      )}

      {/* <Typography
        fontSize={16}
        color="white"
        marginBottom={2}
        textAlign={"center"}
      >
        {filteredLiveGames.length}
      </Typography> */}
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

export default CasinoLiveDealerComponent;
