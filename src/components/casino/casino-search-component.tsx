import { Box, TextField, Grid, InputAdornment } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CasinoGame } from "../../types/casino/casino-full-types";
// import CasinoGameCard from "./casino-game-card";
import MagicSearchIcon from "../../assets/icons/magic-search";
import CasinoGameCard from "./casino-game-card";

interface CasinoSearchComponentProps {
  originalGames: CasinoGame[];
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
  selectedComponent?: string;
  setSelectedComponent?: (component: string) => void;
  setIsDesktopGameStarted?: (is: boolean) => void;
  isDesktopGameStarted?: boolean;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CasinoSearchComponent: FC<CasinoSearchComponentProps> = ({
  originalGames,
  handleOpenGame,
  setSelectedComponent,
  setIsDesktopGameStarted,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<CasinoGame[]>([]);
  const debouncedSearch = useDebounce(search, 700);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const filterGames = (games: CasinoGame[], search: string) => {
      const lowercaseSearch = search.toLowerCase().replace(/\s/g, "");
      return games.filter(
        (game) =>
          (game.gameName &&
            game.gameName
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(lowercaseSearch)) ||
          (game.gameProducer &&
            game.gameProducer
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(lowercaseSearch)) ||
          (game.provider &&
            game.provider
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(lowercaseSearch))
      );
    };

    if (debouncedSearch.length > 2 && debouncedSearch !== "") {
      const filteredGames = filterGames(originalGames, debouncedSearch);
      setFilteredGames(filteredGames);

      setIsDesktopGameStarted ? setIsDesktopGameStarted(false) : null;
    } else {
      setFilteredGames([]);
    }
  }, [
    debouncedSearch,
    originalGames,
    setIsDesktopGameStarted,
    setSelectedComponent,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        label="Pretraži svoju igru..."
        size="small"
        color="warning"
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagicSearchIcon width={"1.2rem"} fill={"white"} />
            </InputAdornment>
          ),
        }}
        // onClick={() => setSelectedComponent("Pretraga")}
        sx={{
          marginBottom: 2,
          marginTop: 2,
          width: "90%",
        }}
      />
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
        width={"90%"}
        sx={{ marginTop: 0 }}
      >
        {filteredGames.map((game) => (
          <CasinoGameCard
            key={game.gameId}
            handleOpenGame={handleOpenGame}
            game={game}
            setFilteredGames={setFilteredGames}
            setSearch={setSearch}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CasinoSearchComponent;
