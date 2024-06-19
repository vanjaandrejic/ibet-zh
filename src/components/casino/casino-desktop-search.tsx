import { Box, TextField, Grid, styled } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CasinoDesktopGameCard from "./casino-desktop-game-card";

type GradientProps = {
  gradientColors: string[];
};

const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

interface CasinoDesktopSearchProps {
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

const borderRadius = 4;
const RoundGradientTextField = styled(
  TextField,
  options
)<GradientProps>(({ gradientColors }) => ({
  position: "relative",
  border: "1px solid transparent",
  backgroundClip: "padding-box",
  borderRadius,
  width: "70%",
  backgroundColor: "#0D0D17",
  padding: "0.4%",

  "&:after": {
    position: "absolute",
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    background: `linear-gradient(to left, ${gradientColors.join(",")})`,
    content: '""',
    zIndex: -1,
    borderRadius,
  },
}));

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

const CasinoDesktopSearch: FC<CasinoDesktopSearchProps> = ({
  originalGames,
  handleOpenGame,
  setSelectedComponent,
  setIsDesktopGameStarted,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<CasinoGame[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchRef = useRef(null);

  // @ts-ignore
  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      // @ts-ignore
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  useOutsideClick(searchRef, () => {
    setSearch("");
    setFilteredGames([]);
  });

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
    } else {
      setFilteredGames([]);
    }
  }, [
    debouncedSearch,
    originalGames,
    setIsDesktopGameStarted,
    setSelectedComponent,
  ]);

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearch("");
        const textField = document.getElementById("search-textfield");
        if (textField instanceof HTMLInputElement) {
          textField.value = "";
        }
      }
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [originalGames]);

  return (
    <Box
      ref={searchRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        position: "fixed",
        marginTop: -9.4,
        zIndex: 4000,
        mb: 1,
        mr: 16,
      }}
    >
      <RoundGradientTextField
        gradientColors={["#08080F", "#171B31"]}
        variant="standard"
        size="small"
        placeholder="搜索你的游戏..."
        onChange={handleSearchChange}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          marginBottom: 2,
          marginTop: 2,
          width: "100%",
        }}
        id="search-textfield"
      />
      {filteredGames.length > 0 ? (
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          boxShadow={3}
          sx={{
            backgroundColor: "black",
            maxHeight: "92dvh",
            overflowY: "auto",
            width: "112%",
            p: 4,
            borderRadius: 3,

            ml: 2,
          }}
        >
          {filteredGames.map((game) => (
            <CasinoDesktopGameCard
              key={game.gameId}
              handleOpenGame={handleOpenGame}
              game={game}
              setFilteredGames={setFilteredGames}
              setSearch={setSearch}
            />
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default CasinoDesktopSearch;
