import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { CasinoGame } from "../types/casino/casino-full-types";
import { getLobbyData } from "../utils/api/casino/get-casino-games";
import { useNavigate } from "react-router-dom";
import NavigationContext from "../store/navigation-context";
import CasinoDesktopGameCard from "../components/casino/casino-desktop-game-card";
import getGameartGameUrl from "../utils/api/casino/get-casino-game-url";
import getPragmaticGameUrl from "../utils/api/casino/get-pragmatic-game-url";
import getEvoplayGameUrl from "../utils/api/casino/get-evoplay-game-url";
import getFaziGameUrl from "../utils/api/casino/get-fazi-game-url";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CasinoDesktopHomeNavigation from "../components/casino/casino-desktop-home-navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TopMatchesHomepageShortcut from "../components/top-matches/top-matches-homepage-shortcut";
import "./scrollbar.css";
// import WebSocketComponent from "../socket/socket";

type GradientProps = {
  gradientColors: string[];
};
const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

const RootPageDesktop: FC = () => {
  // @ts-ignore
  const [games, setGames] = useState<any[]>([]);
  const [popularGames, setPopularGames] = useState<CasinoGame[]>([]);
  const navigate = useNavigate();

  const {
    user,
    setSelectedComponent,
    setProvider,
    setIsDesktopGameStarted,
    setDesktopGameUrl,
    setCurrentGame,
  } = useContext(NavigationContext);

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

  const isDesktop = useMediaQuery("(min-width:1024px)");

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

    setPopularGames(popularGames.slice(0, 16));

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
    { provider: "SLOTOPIA", imagePath: "/slot-providers/slotopia.png" },
    { provider: "HACKSAW", imagePath: "/slot-providers/hacksaw.png" },
    { provider: "WAZDAN", imagePath: "/slot-providers/wazdan.png" },
    { provider: "5MANGAMING", imagePath: "/slot-providers/5mangames.png" },
    { provider: "EVOPLAY", imagePath: "/slot-providers/evoplay.png" },
    { provider: "BETSOFT", imagePath: "/slot-providers/betsoft.png" },
    { provider: "BFGAMES", imagePath: "/slot-providers/bfgames.png" },
    { provider: "BLUEPRINT", imagePath: "/slot-providers/blueprintgaming.png" },
    { provider: "ENDORPHINA", imagePath: "/slot-providers/endorphina.png" },
  ];

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleCount = 6; // Number of items to show at once

  const handleNext = () => {
    setVisibleStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, providerImages.length - visibleCount)
    );
  };

  const handlePrev = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleProviders = providerImages.slice(
    visibleStartIndex,
    visibleStartIndex + visibleCount
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {/* <WebSocketComponent /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "18%",
        }}
      ></Box>

      <CasinoDesktopHomeNavigation width={"26%"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
        >
          {/* <Box
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
              width: "90%",
              height: "auto",
              position: "relative",
              display: "flex",
            }}
          >
            <img
              width={"100%"}
              height={"100%"}
              src={"/sport-slika-homepage.png"}
              // alt={`${provider} logo`}
            />
          </Box> */}

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
              width: "90%",
              height: "auto",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mb: "0.5%",
              cursor: "pointer",
            }}
          >
            {/* <img
              width={"100%"}
              height={"100%"}
              src={
                "https://ibet-365.com/content/home-assets/baka-slika-homepage.png"
              }
              // alt={`${provider} logo`}
            /> */}

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                justifyContent: "flex-end",
              }}
            >
              <RoundGradientButton
                gradientColors={["#08080F", "#171B31"]}
                variant="contained"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  textTransform: "none",
                  width: "18%",
                  left: 10,
                  "&:hover": {
                    left: 20,
                    transition: "0.6s",
                    backgroundColor: "#171b31",
                  },
                  // backgroundColor: item.defaultColor,
                }}
                onClick={() => {
                  navigate("/registration");
                }}
              >
                <PersonIcon
                  sx={{
                    color: "#FFC211",
                  }}
                />
                <Typography fontSize={12}>
                  <b>注册</b>
                  {/* registrujse */}
                </Typography>
              </RoundGradientButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
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
                width: "49%",
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
                    {/* idi na sport */}
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
                width: "49%",
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
                    {/* idi na slot */}
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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <LocalFireDepartmentIcon
                sx={{ color: "orange", marginRight: 1 }}
              />
              <Typography>
                <b>热门</b>
                {/* popularno */}
              </Typography>
            </Box>
            <Button
              onClick={() => {
                setSelectedComponent("Slotovi");
                navigate("/slot");
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
                width: "11%",
              }}
            >
              <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
              <Typography
                textTransform={"none"}
                fontSize={11}
                marginLeft={0.4}
                color={"white"}
              >
                所有
                {/* pogledajsve */}
              </Typography>
            </Button>
          </Box>

          <Grid container spacing={1.5} width={"90%"} mt={0.5}>
            {popularGames.map((game) => (
              <CasinoDesktopGameCard
                key={game.gameId}
                game={game}
                handleOpenGame={handleOpenGame}
              />
            ))}
          </Grid>

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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <LocalFireDepartmentIcon
                sx={{ color: "orange", marginRight: 1 }}
              />
              <Typography>
                <b>供应商</b>
                {/* provajderi */}
              </Typography>
            </Box>
            {/* Slide left right */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // width: "100%",
                // border: "1px solid blue",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#121425",
                  mr: 1,
                  maxWidth: 36,
                  maxHeight: 36,
                  minWidth: 36,
                  minHeight: 36,
                }}
                onClick={() => handlePrev()}
                disabled={visibleStartIndex === 0}
              >
                <ChevronLeft />
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#121425",
                  mr: 1,
                  maxWidth: 36,
                  maxHeight: 36,
                  minWidth: 36,
                  minHeight: 36,
                }}
                onClick={() => handleNext()}
                // disabled={
                //   visibleStartIndex >= visibleProviders.length - visibleCount
                // }
              >
                <ChevronRight />
              </Button>

              <Button
                onClick={() => {
                  setSelectedComponent("SviProvajderi");
                  navigate("/slot");
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
                  // width: "11%",
                }}
              >
                <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
                <Typography
                  textTransform={"none"}
                  fontSize={11}
                  marginLeft={0.4}
                  color={"white"}
                >
                  所有
                  {/* pogledajsve */}
                </Typography>
              </Button>
            </Box>
          </Box>

          <Grid container spacing={1} width={"90%"} mt={0.5} mb={1}>
            {visibleProviders.map(({ provider, imagePath }) => (
              <Grid key={provider} xs={2} sm={2} md={2} item>
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
                    cursor: "pointer",
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
          <TopMatchesHomepageShortcut sport={"S"} />
          {/* <LiveHomeMatchesShortcut /> */}
          {/* <Box
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
            <b>TOP MEČEVI</b>
          </Typography>
        </Box> */}
          {/* <TopMatches sport="S" /> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "90%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/league-offer/S/2294162")}
          >
            <img
              width={"100%"}
              height={"100%"}
              src={"https://ibet-365.com/content/banner-euro.png"}
            />
          </Box>
          {!user ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                mt: 2,
              }}
            >
              <img
                src={"/reg-roulete.png"}
                alt="Slika"
                style={{
                  width: "100%",
                  height: "auto",
                  marginLeft: 30,
                }}
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
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
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/registration")}
                    sx={{
                      backgroundColor: "#FFC211",
                      color: "black",
                      width: "100%",
                      mr: 1,
                    }}
                  >
                    <Typography textTransform={"none"}>
                      <b>注册</b>
                      {/* registracija */}
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#121425",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => navigate("/account")}
                  >
                    <Typography textTransform={"none"}>
                      <b>登录</b>
                      {/* prijavi se */}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default RootPageDesktop;
