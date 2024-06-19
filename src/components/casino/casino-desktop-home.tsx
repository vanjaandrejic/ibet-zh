import {
  Box,
  Button,
  IconButton,
  Modal,
  SxProps,
  Typography,
  styled,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import SwitchBetButton from "../navigation/switch-bet-button";
// import HomePageIcon from "../../assets/icons/home-page-icon";
import SlotsIcon from "../../assets/icons/slots-icon";
import LiveDealerIcon from "../../assets/icons/live-dealer-icon";
import ProvidersIcon from "../../assets/icons/providers-icon";
import VirtualsDiceIcon from "../../assets/icons/virtuals-dice-icon";
import CasinoDesktopGameFrame from "./casino-desktop-game-frame";
import CasinoHomeComponent from "./casino-home-component";
import CasinoSlotsComponent from "./casino-slots-component";
import CasinoLiveDealerComponent from "./casino-live-dealer-component";
import CasinoProvidersResult from "./casino-providers-results";
import CasinoProvidersList from "./casino-providers-list";
import CasinoVirtuals from "./casino-viruals";
import SideCasinoDrawer from "../navigation/side-casino-drawer";
import { CasinoGame } from "../../types/casino/casino-full-types";
import CasinoDesktopSearch from "./casino-desktop-search";
import { currentGame } from "../../pages/casino-page";
import HomePageIcon from "../../assets/icons/home-page-icon";
import UserLoyaltyCard from "../user-loyalty/user-loyalty-card";
import PresentIcon from "../../assets/icons/present-icon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CasinoFavoriteGames from "./casino-favorite-games";
import CloseIcon from "@mui/icons-material/Close";
import NavigationContext from "../../store/navigation-context";
// import CasinoWinners from "./casino-winners";

type GradientProps = {
  gradientColors: string[];
};
const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

interface CasinoDesktopHomeProps {
  setSelectedComponent: Dispatch<SetStateAction<string>>;
  setActiveLiveButton: Dispatch<SetStateAction<string>>;
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
  isDesktopGameStarted: boolean;
  setIsDesktopGameStarted: Dispatch<SetStateAction<boolean>>;
  selectedComponent: string;
  desktopGameUrl: string;
  handleNavigationClick: (path: string) => void;
  originalGames: CasinoGame[];
  games: any[];
  liveDealerGames: any[];
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
  setProvider: Dispatch<SetStateAction<string>>;
  filteredGames: CasinoGame[];
  handleSort: (sortValue: string) => void;
  activeLiveButton: string;
  handleLiveSort: (sortValue: string) => void;
  filteredLiveGames: CasinoGame[];
  provider: string;
  virtualGames: CasinoGame[];
  currentGame: currentGame;
}

const CasinoDesktopHome: FC<CasinoDesktopHomeProps> = ({
  setSelectedComponent,
  setActiveLiveButton,
  setActiveButton,
  isDesktopGameStarted,
  setIsDesktopGameStarted,
  selectedComponent,
  desktopGameUrl,
  handleNavigationClick,
  originalGames,
  games,
  handleOpenGame,
  setProvider,
  activeButton,
  filteredGames,
  activeLiveButton,
  handleSort,
  handleLiveSort,
  filteredLiveGames,
  provider,
  virtualGames,
  currentGame,
  liveDealerGames,
}) => {
  const [isGameFullScreen, setIsGameFullScreen] = useState<boolean>(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  // const [carouselDesktopImages, setCarouselDesktopImages] = useState<
  //   CarouselImage[]
  // >([]);

  // const { setSelectedComponent, selectedComponent } =
  //   useContext(NavigationContext);

  const { accountUserName } = useContext(NavigationContext);
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

  // const navigate = useNavigate();

  const getScreenSize = (): SxProps => {
    if (isGameFullScreen) {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to add a semi-transparent overlay
        zIndex: 10000, // Ensure it is above other elements
        overflow: "hidden", // Prevents scrolling
      };
    } else {
      return {
        width: "90%",
        height: "82dvh",
        // maxHeight: 568,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid red",
        mt: 1,
        borderRadius: 2,
        mb: 6,
      };
    }
  };

  const handleOpenPromoModal = () => setIsPromoModalOpen(true);
  const handleClosePromoModal = () => setIsPromoModalOpen(false);

  // useEffect(() => {
  //   const url =
  //     "https://ibet-365.com/content/sliders/slajder-desktop/slider1.json";

  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setCarouselDesktopImages(response.data);
  //       console.log("response.dataJSON", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching JSON:", error);
  //     });
  // }, []);

  // const carouselDesktopImages = [
  //   {
  //     id: "1",
  //     sliderUrl: "aviator-desktop.jpg",
  //     url: "#",
  //     title: "#",
  //     description: "#",
  //     button: "#",
  //   },
  //   {
  //     id: "2",
  //     sliderUrl: "sweet-bonanza-desktop.jpg",
  //     url: "#",
  //     title: "#",
  //     description: "#",
  //     button: "#",
  //   },
  //   {
  //     id: "3",
  //     sliderUrl: "gates-of-olympus-desktop.jpg",
  //     url: "#",
  //     title: "#",
  //     description: "#",
  //     button: "#",
  //   },
  //   {
  //     id: "3",
  //     sliderUrl: "b-ballblitz-desktop.jpg",
  //     url: "#",
  //     title: "#",
  //     description: "#",
  //     button: "#",
  //   },
  // ];

  const navigationButtons = [
    // {
    //   name: "Početna",
    //   componentName: "Početna",
    //   icon: HomePageIcon,
    //   selectedColor: "#FFC211",
    //   defaultColor: "#0D0D17",
    //   selectedFill: "black",
    //   defaultFill: "red",
    //   fontSize: 16,
    //   isBold: true,
    // },
    {
      name: "Slotovi",
      componentName: "Slotovi",
      icon: SlotsIcon,
      selectedColor: "#FFC211",
      defaultColor: "#0D0D17",
      selectedFill: "black",
      defaultFill: "red",
      fontSize: 16,
      isBold: true,
    },
    {
      name: "Live Dealer",
      componentName: "Live Dealer",
      icon: LiveDealerIcon,
      selectedColor: "#FFC211",
      defaultColor: "#0D0D17",
      selectedFill: "black",
      defaultFill: "#FFC211",
      fontSize: 16,
      isBold: true,
    },
    {
      name: "Svi Provajderi",
      componentName: "SviProvajderi",
      icon: ProvidersIcon,
      selectedColor: "#FFC211",
      defaultColor: "#0D0D17",
      selectedFill: "black",
      defaultFill: "#FF2E52",
      fontSize: 16,
      isBold: true,
    },
    {
      name: "Virtuali",
      componentName: "Virtuals",
      icon: VirtualsDiceIcon,
      selectedColor: "#FFC211",
      defaultColor: "#0D0D17",
      selectedFill: "black",
      defaultFill: "#70FF00",
      fontSize: 16,
      isBold: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "22%",
        }}
      ></Box> */}

      <Modal open={isPromoModalOpen} onClose={() => handleClosePromoModal()}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            p: 10,
            // mt: 20,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => handleClosePromoModal()}
            sx={{
              position: "absolute",
              color: "white",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            src="https://ibet-365.com/"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>
      </Modal>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "24%",
          ml: "1%",
          // position: "fixed",
          mt: 2,
          // border: "1px solid red",
        }}
      >
        <Box width={"100%"} ml={"14%"}>
          <SwitchBetButton />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            ml: 2,
            mt: 4,
          }}
        >
          <Typography sx={{ mb: 1 }} fontSize={16}>
            <b>SVE IGRE</b>
          </Typography>
          {navigationButtons.map((item, index) => (
            <RoundGradientButton
              key={index}
              gradientColors={["#08080F", "#171B31"]}
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                width: "90%",
                backgroundColor:
                  selectedComponent === item.componentName
                    ? item.selectedColor
                    : item.defaultColor,
                mt: 0.5,
                mb: 0.5,
                "&:hover": {
                  marginLeft: 0.8,
                  transition: " 0.6s",
                  backgroundColor: "#171b31",
                },
              }}
              onClick={() => setSelectedComponent(item.componentName)}
            >
              <item.icon
                fill={
                  selectedComponent === item.componentName
                    ? item.selectedFill
                    : item.defaultFill
                }
                width={"1.8em"}
                height={"1.8em"}
              />
              <Typography
                fontSize={item.fontSize}
                color={
                  selectedComponent === item.componentName ? "black" : "white"
                }
                ml={2}
                width={"80%"}
              >
                {selectedComponent === item.componentName && item.isBold ? (
                  <b>{item.name}</b>
                ) : (
                  item.name
                )}
              </Typography>
            </RoundGradientButton>
            // <Button
            //   key={index}
            //   variant={
            //     selectedComponent === item.componentName
            //       ? "contained"
            //       : "outlined"
            //   }
            //   sx={{
            //     display: "flex",
            //     flexDirection: "row",
            //     alignItems: "center",
            //     justifyContent: "center",
            //     textTransform: "none",
            //     width: "68%",
            //     backgroundColor:
            //       selectedComponent === item.componentName
            //         ? item.selectedColor
            //         : item.defaultColor,
            //     mt: 0.5,
            //     mb: 0.5,
            //   }}
            //   onClick={() => setSelectedComponent(item.componentName)}
            // >
            //   <item.icon
            //     fill={
            //       selectedComponent === item.componentName
            //         ? item.selectedFill
            //         : item.defaultFill
            //     }
            //     width={"1.8em"}
            //     height={"1.8em"}
            //   />
            //   <Typography
            //     fontSize={item.fontSize}
            //     color={
            //       selectedComponent === item.componentName ? "black" : "white"
            //     }
            //     ml={2}
            //     width={"80%"}
            //   >
            //     {selectedComponent === item.componentName && item.isBold ? (
            //       <b>{item.name}</b>
            //     ) : (
            //       item.name
            //     )}
            //   </Typography>
            // </Button>
          ))}
          {!accountUserName ? null : <UserLoyaltyCard />}
          <RoundGradientButton
            gradientColors={["#08080F", "#171B31"]}
            variant="contained"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              width: "90%",
              backgroundColor:
                selectedComponent === "Početna" ? "#FFC211" : null,
              mt: 3,
              mb: 0.5,
              "&:hover": {
                marginLeft: 0.8,
                transition: " 0.6s",
                backgroundColor: "#171b31",
              },
            }}
            onClick={() => {
              setSelectedComponent("Početna");
              // navigate("/casino");
            }}
          >
            {/* <item.icon
              fill={item.defaultFill}
              width={"1.8em"}
              height={"1.8em"}
            /> */}

            <HomePageIcon
              width={"1.8em"}
              height={"1.8em"}
              fill={selectedComponent === "Početna" ? "black" : "#FFC211"}
            />

            <Typography
              // fontSize={item.fontSize}
              color={selectedComponent === "Početna" ? "black" : "white"}
              ml={2}
              width={"80%"}
            >
              {/* {item.name} */}
              {selectedComponent === "Početna" ? <b>Početna</b> : "Početna"}
            </Typography>
          </RoundGradientButton>
          <RoundGradientButton
            gradientColors={["#08080F", "#171B31"]}
            variant="contained"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              width: "90%",
              // backgroundColor: item.defaultColor,
              mt: 0.5,
              mb: 0.5,
              "&:hover": {
                marginLeft: 0.8,
                transition: " 0.6s",
                backgroundColor: "#171b31",
              },
            }}
            onClick={() => {
              handleOpenPromoModal();
            }}
          >
            {/* <item.icon
             fill={item.defaultFill}
             width={"1.8em"}
             height={"1.8em"}
           /> */}

            <PresentIcon width={"1.8em"} height={"1.8em"} fill={"#FFC211"} />

            <Typography
              // fontSize={item.fontSize}
              color={"white"}
              ml={2}
              width={"80%"}
            >
              {/* {item.name} */}
              Promocije
            </Typography>
          </RoundGradientButton>
          <RoundGradientButton
            gradientColors={["#08080F", "#171B31"]}
            variant="contained"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              width: "90%",
              backgroundColor:
                selectedComponent === "Omiljeno" ? "#FFC211" : null,
              mt: 0.5,
              mb: 0.5,
              "&:hover": {
                marginLeft: 0.8,
                transition: " 0.6s",
                backgroundColor: "#171b31",
              },
            }}
            onClick={() => {
              setSelectedComponent("Omiljeno");
              // navigate("/casino");
            }}
          >
            {/* <item.icon
              fill={item.defaultFill}
              width={"1.8em"}
              height={"1.8em"}
            /> */}

            <FavoriteBorderIcon
              sx={{
                color: selectedComponent === "Omiljeno" ? "black" : "#FFC211",
              }}
            />

            <Typography
              // fontSize={item.fontSize}
              color={selectedComponent === "Omiljeno" ? "black" : "white"}
              ml={2}
              width={"80%"}
            >
              {/* {item.name} */}
              {selectedComponent === "Omiljeno" ? (
                <b>Omiljene igre</b>
              ) : (
                "Omiljene igre"
              )}
            </Typography>
          </RoundGradientButton>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            borderTop: "1px solid #27292E",
            mt: 1,
          }}
        ></Box>
        <Box
          sx={{
            marginTop: 1,
            ml: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start", // Dodano da dugmad budu uz lijevu ivicu
            // width: "100%",
            // border: "1px solid blue",
          }}
        >
          {[
            { sortValue: "2100", label: "Nove Igre" },
            { sortValue: "2130", label: "Popularno" },
            { sortValue: "2300", label: "Online Slotovi" },
            { sortValue: "2350", label: "Progressive Jackpot" },
            { sortValue: "2400", label: "Book Of" },
            { sortValue: "2500", label: "365 izbor" },
            { sortValue: "2550", label: "Stolovi" },
            { sortValue: "2650", label: "Megaways" },
            { sortValue: "2700", label: "Bonus Buy" },
            { sortValue: "2900", label: "Greb Greb" },
          ].map((button, index) => (
            <Button
              key={index}
              variant={"text"}
              sx={{
                textTransform: "none",
                color: "#697484",
              }}
              onClick={() => {
                setActiveButton(button.sortValue);
                setSelectedComponent("Slotovi");
              }}
            >
              <Typography>{button.label}</Typography>
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            borderTop: "1px solid #27292E",
            mt: 1,
          }}
        ></Box>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "flex-start",
            ml: 2,
          }}
        >
          {[
            { sortValue: "3100", label: "Rulet uživo online" },
            { sortValue: "3200", label: "Blackjack uživo" },
            { sortValue: "3700", label: "Igre uživo" },
            { sortValue: "3800", label: "Poker uživo" },
            { sortValue: "3900", label: "Baccarat & sic bo" },
          ].map((button, index) => (
            <Button
              key={index}
              variant={"text"}
              sx={{ textTransform: "none", marginBottom: 1 }}
              onClick={() => {
                setActiveLiveButton(button.sortValue);
                setSelectedComponent("Live Dealer");
              }}
            >
              <Typography>{button.label}</Typography>
            </Button>
          ))}
        </Box> */}
      </Box>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",

          flexDirection: "column",
        }}
      >
        <CasinoDesktopSearch
          originalGames={originalGames}
          handleOpenGame={handleOpenGame}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          isDesktopGameStarted={isDesktopGameStarted}
          setIsDesktopGameStarted={setIsDesktopGameStarted}
        />
        {isDesktopGameStarted ? (
          <Box
            sx={{
              ...getScreenSize(),
            }}
          >
            {/* {isGameFullScreen ? (
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  zIndex: 9999,
                  backgroundColor: "#FFC211",
                  color: "black",
                  border: "none",
                  padding: 0,
                }}
                onClick={() => {
                  setIsGameFullScreen(false);
                }}
              >
                <CancelIcon />
              </IconButton>
            ) : null} */}
            <CasinoDesktopGameFrame
              selectedGameUrl={desktopGameUrl}
              setIsGameFullScreen={setIsGameFullScreen}
              currentGame={currentGame}
              handleOpenGame={handleOpenGame}
              setIsDesktopGameStarted={setIsDesktopGameStarted}
              isGameFullScreen={isGameFullScreen}
            />
          </Box>
        ) : null}
        {/* <CasinoWinners /> */}

        {/* {isGameFullScreen || !isDesktopGameStarted ? null : (
          //Demo Real Switch
          <Box
            sx={{
              display: "flex",
              width: "90%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              border: "1px solid red",
            }}
          >
            <Button
              variant="outlined"
              // size="small"
              sx={{
                mt: 1,
                // position: "absolute",
                // bottom: 228,

                // left: 1488,
                // zIndex: 9999,
                // backgroundColor: "#FFC211",
                color: "white",
                border: "none",
                padding: 0,
              }}
              // onClick={() => {
              //   setIsGameFullScreen(true);
              // }}
            >
              Demo
            </Button>
            <Button
              variant="outlined"
              // size="small"
              sx={{
                mt: 1,
                // position: "absolute",
                // bottom: 228,

                // left: 1488,
                // zIndex: 9999,
                // backgroundColor: "#FFC211",
                color: "white",
                border: "none",
                padding: 0,
              }}
              // onClick={() => {
              //   setIsGameFullScreen(true);
              // }}
            >
              Real
            </Button>

            <IconButton
              size="small"
              sx={{
                mt: 1,
                // position: "absolute",
                // bottom: 228,

                // left: 1488,
                zIndex: 9999,
                // backgroundColor: "#FFC211",
                color: "black",
                border: "none",
                padding: 0,
              }}
              onClick={() => {
                setIsGameFullScreen(true);
              }}
            >
              <ResizeIcon />
            </IconButton>
          </Box>
        )} */}

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
        <SideCasinoDrawer
          setSelectedComponent={setSelectedComponent}
          setProvider={setProvider}
        />
      </Box>
      {/* <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "24%",
        marginTop: "8%",
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {[
          { sortValue: "3100", label: "Rulet uživo online" },
          { sortValue: "3200", label: "Blackjack uživo" },
          { sortValue: "3700", label: "Igre uživo" },
          { sortValue: "3800", label: "Poker uživo" },
          { sortValue: "3900", label: "Baccarat & sic bo" },
        ].map((button, index) => (
          <Button
            key={index}
            variant={"text"}
            sx={{ textTransform: "none", marginBottom: 1 }}
            onClick={() => {
              setActiveLiveButton(button.sortValue);
              setSelectedComponent("Live Dealer");
            }}
          >
            <Typography>
              <b>{button.label}</b>
            </Typography>
          </Button>
        ))}
      </Box>
    </Box> */}
    </Box>
  );
};

export default CasinoDesktopHome;
