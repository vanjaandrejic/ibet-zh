import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { CasinoGame } from "../../types/casino/casino-full-types";
import { Box, Typography, Grid, Button, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MagicSearchIcon from "../../assets/icons/magic-search";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BoltIcon from "@mui/icons-material/Bolt";
import CasinoDesktopGameCard from "./casino-desktop-game-card";
import CasinoGameCard from "./casino-game-card";

interface CasinoHomeComponentProps {
  games: any[];
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
  handleNavigationClick: (component: string) => void;
  setProvider: (provider: string) => void;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

const CasinoHomeComponent: FC<CasinoHomeComponentProps> = ({
  games,
  handleOpenGame,
  handleNavigationClick,
  setProvider,
  setActiveButton,
}) => {
  const [popularGames, setPopularGames] = useState<CasinoGame[]>([]);
  const [newGames, setNewGames] = useState<CasinoGame[]>([]);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  // const [liveGames, setLiveGames] = useState<CasinoGame[]>([]);

  useEffect(() => {
    const filterBySortValue = (sortValue: string) => {
      return (
        games
          // @ts-ignore
          .filter((game: any) =>
            // @ts-ignore
            game.casinoRooms.some((room: any) => room.sortValue === sortValue)
          )
          .map((game) => game.casinoGame)
          .sort((a, b) => b.orderNumber - a.orderNumber)
      );
    };

    const popularGames = filterBySortValue("2130");
    const newGames = filterBySortValue("2100");
    // const liveGames = filterBySortValue("2550");

    setPopularGames(
      isDesktop ? popularGames.slice(0, 16) : popularGames.slice(0, 6)
    );
    setNewGames(isDesktop ? newGames.slice(0, 16) : newGames.slice(0, 6));
    // setLiveGames(liveGames.slice(0, 9));
  }, [games, isDesktop]);

  const providerImages = [
    { provider: "FAZI", imagePath: "/slot-providers/fazi.png" },
    { provider: "PRAGMATIC", imagePath: "/slot-providers/pragmaticplay.png" },
    { provider: "NETENT", imagePath: "/slot-providers/netent.png" },
    { provider: "SLOTOPIA", imagePath: "/slot-providers/slotopia.png" },
    { provider: "HACKSAW", imagePath: "/slot-providers/hacksaw.png" },
    { provider: "WAZDAN", imagePath: "/slot-providers/wazdan.png" },
    // { provider: "1X2GAMING", imagePath: "/slot-providers/1x2gaming.png" },
    // { provider: "5MANGAMING", imagePath: "/slot-providers/5mangames.png" },
    // { provider: "EVOPLAY", imagePath: "/slot-providers/evoplay.png" },
    // { provider: "BETSOFT", imagePath: "/slot-providers/betsoft.png" },
    // { provider: "BFGAMES", imagePath: "/slot-providers/bfgames.png" },
    // { provider: "BLUEPRINT", imagePath: "/slot-providers/blueprintgaming.png" },
    // { provider: "ENDORPHINA", imagePath: "/slot-providers/endorphina.png" },
    // { provider: "FUGASO", imagePath: "/slot-providers/fugaso.png" },
    // { provider: "GAMEART", imagePath: "/slot-providers/gameart.png" },
    // { provider: "NOLIMIT CITY", imagePath: "/slot-providers/nolimitcity.png" },
    // { provider: "PLATIPUS", imagePath: "/slot-providers/platipus.png" },
    // { provider: "PLAYSON", imagePath: "/slot-providers/playson.png" },
    // { provider: "SLOTMATRIX", imagePath: "/slot-providers/slotmatrix.png" },
    // { provider: "SPADEGAMING", imagePath: "/slot-providers/spadegaming.png" },
    // { provider: "SPINOMENAL", imagePath: "/slot-providers/spinomenal.png" },
    // { provider: "TOMHORN", imagePath: "/slot-providers/tomhorn.png" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isDesktop ? null : (
        <Button
          variant="outlined"
          sx={{
            width: "90%",
            marginTop: 1,
            marginBottom: 1,
            textTransform: "none",
            color: "white",
            borderColor: "#FFC211",
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
          onClick={() => handleNavigationClick("Pretraga")}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: 0.8,
              alignItems: "center",
            }}
          >
            <MagicSearchIcon fill={"white"} />
            <Typography fontSize={14} sx={{ marginLeft: 2 }}>
              Pronađi svoju igru...
            </Typography>
          </Box>
        </Button>
      )}
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
        <Box
          width={"30%"}
          sx={{
            display: "flex",
            flexDirection: "row",

            alignItems: "center",
            marginLeft: isDesktop ? -3 : 0,
          }}
        >
          <LocalFireDepartmentIcon
            sx={{ color: "orange", marginRight: 1 }}
          ></LocalFireDepartmentIcon>
          <Typography fontSize={16}>
            <b>POPULARNO</b>
          </Typography>
        </Box>
        {/* <Button
          onClick={() => handleNavigationClick("Slotovi")}
          size="small"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 0.4,
            borderColor: "#25253A",
            borderStyle: "solid",
            padding: 0.7,
          }}
        >
          <VisibilityIcon
            sx={{ color: "#FFC211", fontSize: isDesktop ? 32 : 14 }}
          />
          <Typography
            textTransform={"none"}
            fontSize={isDesktop ? 12 : 10}
            marginLeft={0.4}
            color={"white"}
          >
            Pogledaj sve
          </Typography>
        </Button> */}

        <Button
          onClick={() => handleNavigationClick("Slotovi")}
          size="small"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 0.4,
            borderColor: "#25253A",
            borderStyle: "solid",
          }}
        >
          <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
          <Typography
            textTransform={"none"}
            fontSize={11}
            marginLeft={0.4}
            color={"white"}
          >
            Pogledaj sve
          </Typography>
        </Button>
      </Box>

      {isDesktop ? (
        <Grid container spacing={isDesktop ? 2 : 1} width={"90%"} mt={1}>
          {popularGames.map((game) => (
            <CasinoDesktopGameCard
              key={game.gameId}
              game={game}
              handleOpenGame={handleOpenGame}
            />
          ))}
        </Grid>
      ) : (
        <Grid container spacing={isDesktop ? 2 : 1} width={"90%"}>
          {popularGames.map((game) => (
            <CasinoGameCard
              key={game.gameId}
              game={game}
              handleOpenGame={handleOpenGame}
            />
          ))}
        </Grid>
      )}

      <Box sx={{ width: "70%", mt: 2 }}>
        <img
          src={
            isDesktop
              ? "https://ibet-365.com/content/365bonusDesktop.png"
              : "https://ibet-365.com/content/365bonus.png"
          }
          alt="Slika"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

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
        <Box
          width={"40%"}
          sx={{
            display: "flex",
            flexDirection: "row",

            alignItems: "center",
            marginLeft: isDesktop ? -3 : 0,
          }}
        >
          <BoltIcon sx={{ color: "orange", marginRight: 1 }}></BoltIcon>
          <Typography fontSize={16}>
            <b>NOVE IGRE</b>
          </Typography>
        </Box>
        {/* <Button
          onClick={() => {
            handleNavigationClick("Slotovi");
            setActiveButton("2100");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          size="small"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 0.4,
            borderColor: "#25253A",
            borderStyle: "solid",
            padding: 0.7,
          }}
        >
          <VisibilityIcon
            sx={{ color: "#FFC211", fontSize: isDesktop ? 36 : 14 }}
          />
          <Typography
            textTransform={"none"}
            fontSize={isDesktop ? 12 : 10}
            marginLeft={0.4}
            color={"white"}
          >
            Pogledaj sve
          </Typography>
        </Button> */}

        <Button
          onClick={() => {
            handleNavigationClick("Slotovi");
            setActiveButton("2100");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          size="small"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 0.4,
            borderColor: "#25253A",
            borderStyle: "solid",
          }}
        >
          <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
          <Typography
            textTransform={"none"}
            fontSize={11}
            marginLeft={0.4}
            color={"white"}
          >
            Pogledaj sve
          </Typography>
        </Button>
      </Box>

      {isDesktop ? (
        <Grid container spacing={isDesktop ? 2 : 1} width={"90%"}>
          {newGames.map((game) => (
            <CasinoDesktopGameCard
              key={game.gameId}
              game={game}
              handleOpenGame={handleOpenGame}
            />
          ))}
        </Grid>
      ) : (
        <Grid container spacing={isDesktop ? 2 : 1} width={"90%"}>
          {newGames.map((game) => (
            <CasinoGameCard
              key={game.gameId}
              game={game}
              handleOpenGame={handleOpenGame}
            />
          ))}
        </Grid>
      )}

      <Box sx={{ width: "86%", marginBottom: 1, marginTop: 1 }}>
        <Typography fontSize={16}>
          <b>PROVAJDERI</b>
        </Typography>
      </Box>

      <Grid container spacing={1} width={"90%"}>
        {providerImages.map(({ provider, imagePath }) => (
          <Grid key={provider} xs={4} sm={3} md={2} item>
            <Box
              onClick={() => {
                handleNavigationClick("Provajderi");
                setProvider(provider);
              }}
              sx={{
                borderRadius: 2,
                borderWidth: 0.4,
                borderColor: "#25253A",
                borderStyle: "solid",
                width: "100%",
                height: "auto",
                position: "relative",
                display: "flex",
              }}
            >
              <img
                width={"100%"}
                height={"100%"}
                src={imagePath}
                alt={`${provider} logo`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CasinoHomeComponent;
