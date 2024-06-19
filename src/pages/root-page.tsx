import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import { FC, useCallback, useContext, useEffect, useState } from "react";
// import CasinoGameCard from "../components/casino/casino-game-card";
import { CasinoGame } from "../types/casino/casino-full-types";
import { getLobbyData } from "../utils/api/casino/get-casino-games";
import NavigationContext from "../store/navigation-context";
import { useNavigate } from "react-router-dom";
import getGameartGameUrl from "../utils/api/casino/get-casino-game-url";
import getPragmaticGameUrl from "../utils/api/casino/get-pragmatic-game-url";
import getEvoplayGameUrl from "../utils/api/casino/get-evoplay-game-url";
import getFaziGameUrl from "../utils/api/casino/get-fazi-game-url";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TopMatchesHomepageShortcut from "../components/top-matches/top-matches-homepage-shortcut";
import CasinoGameCard from "../components/casino/casino-game-card";
// import WebSocketComponent from "../socket/socket";

type GradientProps = {
  gradientColors: string[];
};
const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

const RootPage: FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [popularGames, setPopularGames] = useState<CasinoGame[]>([]);

  const {
    user,
    setSelectedComponent,
    setProvider,
    setIsDesktopGameStarted,
    setDesktopGameUrl,
    setCurrentGame,
  } = useContext(NavigationContext);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const borderRadius = 6;
  const RoundGradientButton = styled(
    Button,
    options
  )<GradientProps>(({ gradientColors }) => ({
    position: "relative",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    borderRadius,
    width: "70%",
    backgroundColor: "#0D0D17",

    "&:after": {
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: `linear-gradient(to left, ${gradientColors.join(",")})`,
      content: '""',
      zIndex: -2,
      borderRadius,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lobbyData = await getLobbyData();
        // const liveGamesTables = await getLiveGamesData();
        // const virtualGames = await getVirtuals();

        // setLiveGamesTables(liveGamesTables.lobbyCasinoGames);
        setGames(lobbyData.lobbyCasinoGames);
        // setVirtualGames(virtualGames.lobbyCasinoGames);
        // setOriginalGames(
        //   lobbyData.lobbyCasinoGames.map((game) => game.casinoGame)
        // );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
    // const newGames = filterBySortValue("2100");
    // const liveGames = filterBySortValue("2550");

    setPopularGames(popularGames.slice(0, 3));

    // setLiveGames(liveGames.slice(0, 9));
  }, [games]);

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

      if (isDesktop) {
        setIsDesktopGameStarted(true);
        setDesktopGameUrl(urlResponse);
        setSelectedComponent("Početna");
        setCurrentGame({
          gameId: gameId,
          provider: provider,
          demo: demo,
        });
        navigate("/slot");
      } else {
        navigate("/slot-game", { state: { selectedGameUrl: urlResponse } });
      }
    },
    [
      isDesktop,
      navigate,
      setCurrentGame,
      setDesktopGameUrl,
      setIsDesktopGameStarted,
      setSelectedComponent,
    ]
  );
  const providerImages = [
    { provider: "FAZI", imagePath: "/slot-providers/fazi.png" },
    { provider: "PRAGMATIC", imagePath: "/slot-providers/pragmaticplay.png" },
    { provider: "NETENT", imagePath: "/slot-providers/netent.png" },
  ];

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
      {/* <WebSocketComponent /> */}
      <img
        src={"https://ibet-365.com/content/365bonusDesktop.png"}
        alt="Slika"
        style={{ width: "100%", height: "auto" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          // border: "1px solid red",
        }}
      >
        <Box
          // onClick={() => {
          //   setSelectedComponent("Provajderi");
          //   setProvider(provider);
          //   navigate("/casino");
          // }}
          sx={{
            borderRadius: 2,
            borderWidth: 0.4,
            borderColor: "transparent",
            borderStyle: "solid",
            width: "100%",
            height: "auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            mb: "0.5%",
            cursor: "pointer",
          }}
          onClick={() => navigate("/sport")}
        >
          <img
            width={"100%"}
            height={"100%"}
            src={
              "https://ibet-365.com/content/home-assets/sport-slika-homepage.png"
            }
            // alt={`${provider} logo`}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={18}>
              <b>体育</b>
              {/* sport */}
            </Typography>
            <RoundGradientButton
              gradientColors={["#08080F", "#171B31"]}
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                width: "36%",
                left: 10,
                "&:hover": {
                  left: 20,
                  transition: "0.6s",
                  backgroundColor: "#171b31",
                },
                // backgroundColor: item.defaultColor,
              }}
              onClick={() => {
                navigate("/sport");
              }}
            >
              <Typography fontSize={12}>
                <b>体育</b>
                {/* sport */}
              </Typography>
              <ChevronRightIcon
                sx={{
                  color: "#FFC211",
                }}
              />
            </RoundGradientButton>
          </Box>
        </Box>

        <Box
          // onClick={() => {
          //   setSelectedComponent("Provajderi");
          //   setProvider(provider);
          //   navigate("/casino");
          // }}
          sx={{
            borderRadius: 2,
            borderWidth: 0.4,
            borderColor: "transparent",
            borderStyle: "solid",
            width: "100%",
            height: "auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/slot")}
        >
          <img
            width={"100%"}
            height={"100%"}
            src={
              "https://ibet-365.com/content/home-assets/casino-slika-homepage.png"
            }
            // alt={`${provider} logo`}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              justifyContent: "space-between",
              mb: "0.5%",
            }}
          >
            <Typography fontSize={18}>
              <b>老虎机</b>
              {/* slot */}
            </Typography>
            <RoundGradientButton
              gradientColors={["#08080F", "#171B31"]}
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                width: "36%",
                left: 10,
                "&:hover": {
                  left: 20,
                  transition: "0.6s",
                  backgroundColor: "#171b31",
                },
                // backgroundColor: item.defaultColor,
              }}
              onClick={() => {
                navigate("/slot");
              }}
            >
              <Typography fontSize={12}>
                <b>老虎机</b>
                {/* slot */}
              </Typography>
              <ChevronRightIcon
                sx={{
                  color: "#FFC211",
                }}
              />
            </RoundGradientButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "88%",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        <Typography>
          <b>热门</b>
          {/* popularno */}
        </Typography>
      </Box>

      <Grid container spacing={1} width={"90%"} mt={0.5} mb={2}>
        {popularGames.map((game) => (
          <CasinoGameCard
            key={game.gameId}
            game={game}
            handleOpenGame={handleOpenGame}
          />
        ))}
      </Grid>

      <TopMatchesHomepageShortcut sport={"S"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "88%",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography>
          <b>供应商</b>
          {/* provajderi */}
        </Typography>
      </Box>

      <Grid container spacing={1} width={"90%"} mt={0.5}>
        {providerImages.map(({ provider, imagePath }) => (
          <Grid key={provider} xs={4} sm={4} md={4} item>
            <Box
              onClick={() => {
                setSelectedComponent("Provajderi");
                setProvider(provider);
                navigate("/slot");
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

      {!user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            mt: 2,
          }}
        >
          <img
            src={"/sa-druge-planete-root.png"}
            alt="Slika"
            style={{ width: "100%", height: "auto" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FFC211", color: "black" }}
              onClick={() => navigate("/registration")}
            >
              <Typography textTransform={"none"}>
                <b>注册</b>
                {/* registracija */}
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#121425", color: "white" }}
              onClick={() => navigate("/account")}
            >
              <Typography textTransform={"none"}>
                <b>登录</b>
                {/* prijavise */}
              </Typography>
            </Button>
          </Box>
          <img
            src={"/reg-roulete.png"}
            alt="Slika"
            style={{
              width: "100%",
              height: "auto",
              marginLeft: 30,
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default RootPage;
