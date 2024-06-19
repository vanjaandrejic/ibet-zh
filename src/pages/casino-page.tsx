import { Card, CardActionArea, useMediaQuery } from "@mui/material";
import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { getLobbyData } from "../utils/api/casino/get-casino-games";
import getGameartGameUrl from "../utils/api/casino/get-casino-game-url";
import { CasinoGame } from "../types/casino/casino-full-types";
import getPragmaticGameUrl from "../utils/api/casino/get-pragmatic-game-url";
import { useNavigate } from "react-router-dom";
import getEvoplayGameUrl from "../utils/api/casino/get-evoplay-game-url";
import CasinoMainNavigation from "../components/casino/casino-main-navigation";
import CasinoSearchComponent from "../components/casino/casino-search-component";
import CasinoHomeComponent from "../components/casino/casino-home-component";
import CasinoSlotsComponent from "../components/casino/casino-slots-component";
import { getLiveGamesData } from "../utils/api/casino/get-live-casino-game";
import CasinoLiveDealerComponent from "../components/casino/casino-live-dealer-component";
import getFaziGameUrl from "../utils/api/casino/get-fazi-game-url";
import CasinoProvidersResult from "../components/casino/casino-providers-results";
import Carousel from "react-material-ui-carousel";
import CasinoProvidersList from "../components/casino/casino-providers-list";
import { getVirtuals } from "../utils/api/casino/get-virtual-games";
import CasinoVirtuals from "../components/casino/casino-viruals";
import CasinoDesktopHome from "../components/casino/casino-desktop-home";
import NavigationContext from "../store/navigation-context";
import CasinoFavoriteGames from "../components/casino/casino-favorite-games";
// import axios from "axios";

export interface currentGame {
  gameId: string;
  provider: string;
  demo: boolean;
}

const CasinoPage: FC = () => {
  // @ts-ignore
  const [games, setGames] = useState<any[]>([]);
  // @ts-ignore
  const [liveDealerGames, setLiveGamesTables] = useState<any[]>([]);
  const [virtualGames, setVirtualGames] = useState<any[]>([]);
  const [originalGames, setOriginalGames] = useState<CasinoGame[]>([]);
  // const [selectedComponent, setSelectedComponent] = useState<string>("Početna"); //
  // const [provider, setProvider] = useState<string>(""); //
  // const [activeButton, setActiveButton] = useState<string>("2130"); //
  const [filteredGames, setFilteredGames] = useState<CasinoGame[]>([]);
  const [activeLiveButton, setActiveLiveButton] = useState<string>("3100");
  const [filteredLiveGames, setFilteredLiveGames] = useState<CasinoGame[]>([]);
  // const [isDesktopGameStarted, setIsDesktopGameStarted] =
  //   useState<boolean>(false);
  // const [desktopGameUrl, setDesktopGameUrl] = useState<string>("");
  // const [sliderImagesDesktop, setSliderImagesDesktop] = useState<JSON>({});
  const isDesktop = useMediaQuery("(min-width:1024px)");
  // const [currentGame, setCurrentGame] = useState<currentGame>({
  //   gameId: "",
  //   provider: "",
  //   demo: false,
  // });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lobbyData = await getLobbyData();
        const liveGamesTables = await getLiveGamesData();
        const virtualGames = await getVirtuals();

        const combinedGames = [
          ...lobbyData.lobbyCasinoGames,
          ...liveGamesTables.lobbyCasinoGames,
          ...virtualGames.lobbyCasinoGames,
        ];

        setLiveGamesTables(liveGamesTables.lobbyCasinoGames);
        setGames(lobbyData.lobbyCasinoGames);
        setVirtualGames(virtualGames.lobbyCasinoGames);
        setOriginalGames(combinedGames.map((game) => game.casinoGame));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const {
    selectedComponent,
    setSelectedComponent,
    provider,
    setProvider,
    activeButton,
    setActiveButton,
    isDesktopGameStarted,
    setIsDesktopGameStarted,
    desktopGameUrl,
    setDesktopGameUrl,
    currentGame,
    setCurrentGame,
  } = useContext(NavigationContext);

  // console.log("virtualGames", virtualGames);

  const handleOpenGame = useCallback(
    async (gameId: string, provider: string, demo: boolean) => {
      let urlResponse;

      // console.log(urlResponse);
      // console.log(gameId);
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
          if (gameId === "Rocketman") {
            urlResponse = `https://cdn.rocketman.elbet.com/?companyId=13&amp;currency=RSD&amp;version=desktop&amp;hideHeader=1&amp;token=${localStorage.getItem(
              "__ibet-mobile/_ionickv/auth-token"
            )}|${localStorage.getItem(
              "__ibet-mobile/_ionickv/uuid"
            )}&amp;lang=rs`;
          } else {
            urlResponse = `https://online.ibet365.elbet.com/${gameId}/index.html?help=0&token=${localStorage.getItem(
              "__ibet-mobile/_ionickv/auth-token"
            )}|${localStorage.getItem(
              "__ibet-mobile/_ionickv/uuid"
            )}|${localStorage.getItem("__ibet-mobile/_ionickv/utkn")}&lang=rs`;
          }

          // console.log(urlResponse);
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a za FAZI:", error);
          return;
        }
      } else if (provider === "HABANERO") {
        try {
          if (!demo) {
            urlResponse = `https://app-e.insvr.com/go.ashx?brandid=f119c898-d1a6-ec11-a99b-0050f2fef2cf&mode=real&ifrm=1&token=${localStorage.getItem(
              "__ibet-mobile/_ionickv/auth-token"
            )}&keyname=${gameId}&locale=sr `;
          } else {
            urlResponse = `https://app-e.insvr.com/go.ashx?brandid=f119c898-d1a6-ec11-a99b-0050f2fef2cf&mode=fun&ifrm=1&keyname=${gameId}&locale=sr `;
          }
        } catch (error) {
          console.error("Greška prilikom dobijanja URL-a za HABANERO:", error);
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

  const handleNavigationClick = (component: string) => {
    setSelectedComponent(component);
  };

  // const providerImages = [
  //   { provider: "FAZI", imagePath: "/slot-providers/fazi.png" },
  //   { provider: "PRAGMATIC", imagePath: "/slot-providers/pragmaticplay.png" },
  //   { provider: "NETENT", imagePath: "/slot-providers/netent.png" },
  //   { provider: "SLOTOPIA", imagePath: "/slot-providers/slotopia.png" },
  //   { provider: "HACKSAW", imagePath: "/slot-providers/hacksaw.png" },
  //   { provider: "WAZDAN", imagePath: "/slot-providers/wazdan.png" },
  // ];

  const handleSort = useMemo(() => {
    const sortGames = (sortValue: string) => {
      // @ts-ignore
      const sortedGames = games.reduce((acc: any[], game) => {
        const filteredRooms = game.casinoRooms.filter(
          // @ts-ignore
          (room: any) => room.sortValue === sortValue
        );
        if (filteredRooms.length > 0) {
          acc.push({
            ...game.casinoGame,
            casinoRooms: filteredRooms,
          });
        }
        return acc;
      }, []);
      setFilteredGames(
        sortedGames.sort((a, b) => b.orderNumber - a.orderNumber)
      );
    };
    return sortGames;
  }, [games]);

  const handleLiveSort = useMemo(() => {
    const sortGames = (sortValue: string) => {
      // @ts-ignore
      const sortedGames = liveDealerGames.reduce((acc: any[], game) => {
        const filteredRooms = game.casinoRooms.filter(
          // @ts-ignore
          (room: any) => room.sortValue === sortValue
        );
        if (filteredRooms.length > 0) {
          acc.push({
            ...game.casinoGame,
            casinoRooms: filteredRooms,
          });
        }
        return acc;
      }, []);
      setFilteredLiveGames(
        sortedGames.sort((a, b) => b.orderNumber - a.orderNumber)
      );
    };
    return sortGames;
  }, [liveDealerGames]);

  // useEffect(() => {
  //   setProvider("");
  // }, [selectedComponent]);

  const carouselImages = [
    { id: 1, image: "https://ibet2.365.rs/ibet/img/b/icimage_23242.jpg" },
    { id: 2, image: "https://ibet2.365.rs/ibet/img/b/icimage_23243.jpg" },
  ];

  // console.log("sliderImagesDesktop", sliderImagesDesktop);

  return (
    <>
      {isDesktop ? (
        <CasinoDesktopHome
          setSelectedComponent={setSelectedComponent}
          setActiveLiveButton={setActiveLiveButton}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          isDesktopGameStarted={isDesktopGameStarted}
          setIsDesktopGameStarted={setIsDesktopGameStarted}
          selectedComponent={selectedComponent}
          desktopGameUrl={desktopGameUrl}
          handleNavigationClick={handleNavigationClick}
          originalGames={originalGames}
          games={games}
          handleOpenGame={handleOpenGame}
          setProvider={setProvider}
          filteredGames={filteredGames}
          handleSort={handleSort}
          activeLiveButton={activeLiveButton}
          handleLiveSort={handleLiveSort}
          filteredLiveGames={filteredLiveGames}
          provider={provider}
          virtualGames={virtualGames}
          currentGame={currentGame}
          liveDealerGames={liveDealerGames}
        />
      ) : (
        <>
          <Carousel
            sx={{
              width: "90%",
              height: "80%",
              borderRadius: 2,
              marginBottom: 1,
            }}
            indicators={false}
          >
            {carouselImages.map((item) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 2,
                  width: "100%",
                  height: "auto",
                  minWidth: 100,
                  minHeight: 136,
                  position: "relative",
                  display: "flex",
                }}
              >
                <CardActionArea>
                  <img
                    width={"100%"}
                    height={"100%"}
                    key={item.id}
                    src={item.image}
                  ></img>
                </CardActionArea>
              </Card>
            ))}
          </Carousel>
          <CasinoMainNavigation handleNavigationClick={handleNavigationClick} />
          {selectedComponent === "Pretraga" ? (
            <CasinoSearchComponent
              originalGames={originalGames}
              handleOpenGame={handleOpenGame}
            />
          ) : null}

          {selectedComponent === "Početna" && (
            <CasinoHomeComponent
              games={games}
              handleOpenGame={handleOpenGame}
              handleNavigationClick={handleNavigationClick}
              setProvider={setProvider}
              setActiveButton={setActiveButton}
            />
          )}

          {selectedComponent === "Slotovi" && (
            <CasinoSlotsComponent
              handleOpenGame={handleOpenGame}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              filteredGames={filteredGames}
              handleSort={handleSort}
            />
          )}

          {selectedComponent === "Live Dealer" && (
            <CasinoLiveDealerComponent
              activeLiveButton={activeLiveButton}
              setActiveLiveButton={setActiveLiveButton}
              handleOpenGame={handleOpenGame}
              handleLiveSort={handleLiveSort}
              filteredLiveGames={filteredLiveGames}
            />
          )}

          {selectedComponent === "Provajderi" && (
            <CasinoProvidersResult
              provider={provider}
              games={originalGames}
              handleOpenGame={handleOpenGame}
            />
          )}

          {selectedComponent === "SviProvajderi" && (
            <CasinoProvidersList
              handleNavigationClick={handleNavigationClick}
              setProvider={setProvider}
            />
          )}

          {selectedComponent === "Virtuals" && (
            <CasinoVirtuals
              games={virtualGames}
              handleOpenGame={handleOpenGame}
            />
          )}
          {selectedComponent === "Omiljeno" && (
            <CasinoFavoriteGames
              games={games}
              virtualGames={virtualGames}
              liveDealerGames={liveDealerGames}
              handleOpenGame={handleOpenGame}
            />
          )}
        </>
      )}
    </>
  );
};

export default CasinoPage;
