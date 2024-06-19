import {
  Dispatch,
  FC,
  SetStateAction,
  Suspense,
  useEffect,
  useMemo,
} from "react";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
// import CasinoGameCard from "./casino-game-card";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CasinoSlotNavigation from "./casino-slot-navigation";
import CasinoDesktopGameCard from "./casino-desktop-game-card";
import CasinoSlotNavigationDesktop from "./casino-slot-navigation-desktop";
import CasinoGameCard from "./casino-game-card";

interface CasinoSlotsComponentProps {
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
  filteredGames: CasinoGame[];
  handleSort: (sortValue: string) => void;
}

const CasinoSlotsComponent: FC<CasinoSlotsComponentProps> = ({
  handleOpenGame,
  activeButton,
  setActiveButton,
  filteredGames,
  handleSort,
}) => {
  // useEffect(() => {
  //   handleSort("2130"); // Pozivamo handleSort sa vrednošću "2130" prilikom prvog rendiranja
  // }, [handleSort]);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    handleSort(activeButton);
  }, [activeButton, handleSort]);

  const renderedGames = useMemo(
    () =>
      filteredGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [filteredGames, handleOpenGame]
  );

  const renderedDesktopGames = useMemo(
    () =>
      filteredGames.map((game) => (
        <Suspense key={game.gameId} fallback={<CircularProgress />}>
          <CasinoDesktopGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
          />
        </Suspense>
      )),
    [filteredGames, handleOpenGame]
  );
  return (
    <>
      {isDesktop ? (
        <CasinoSlotNavigationDesktop
          handleSort={handleSort}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      ) : (
        <CasinoSlotNavigation
          handleSort={handleSort}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      )}

      {/* <Typography
        fontSize={16}
        color="white"
        marginBottom={2}
        textAlign={"center"}
      >
        {filteredGames.length}
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
    </>
  );
};

export default CasinoSlotsComponent;
