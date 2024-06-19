import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import SideMenuIcon from "../../assets/icons/side-menu";
import { IconButton, Modal, Typography, styled } from "@mui/material";
import SportCategories from "../categories-selectors/sport-categories";
import { ArrowBack } from "@mui/icons-material";
import SwitchBetButton from "./switch-bet-button";
import { useLocation, useNavigate } from "react-router-dom";
import SlotsIcon from "../../assets/icons/slots-icon";
import LiveDealerIcon from "../../assets/icons/live-dealer-icon";
import ProvidersIcon from "../../assets/icons/providers-icon";
import VirtualsDiceIcon from "../../assets/icons/virtuals-dice-icon";
import NavigationContext from "../../store/navigation-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PresentIcon from "../../assets/icons/present-icon";
import HomePageIcon from "../../assets/icons/home-page-icon";
import UserLoyaltyCard from "../user-loyalty/user-loyalty-card";
import CloseIcon from "@mui/icons-material/Close";
import CasinoDesktopHomeNavigation from "../casino/casino-desktop-home-navigation";

type GradientProps = {
  gradientColors: string[];
};
const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

type Anchor = "left";

const SideMenuDrawer: React.FC = () => {
  const [state, setState] = React.useState<{ [key in Anchor]: boolean }>({
    left: false,
  });

  const [isPromoModalOpen, setIsPromoModalOpen] =
    React.useState<boolean>(false);

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

  const navigationButtons = [
    {
      name: "老虎机",
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
      name: "真人荷官",
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
      name: "热门",
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
      name: "虚拟游戏",
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

  const location = useLocation();

  const isCasinoPage = location.pathname === "/slot";
  const isHomePage = location.pathname === "/";

  const navigate = useNavigate();

  const { setSelectedComponent, selectedComponent, user } =
    React.useContext(NavigationContext);

  const handleOpenPromoModal = () => setIsPromoModalOpen(true);
  const handleClosePromoModal = () => setIsPromoModalOpen(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: "90dvw",
        height: "140dvh",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#0D0D19",
        touchAction: "pan-y",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton onClick={toggleDrawer(anchor, false)}>
        <ArrowBack sx={{ marginRight: 2, marginLeft: 1 }} />
      </IconButton>

      {isCasinoPage ? (
        <>
          <Box ml={"16%"} mb={2} width="100%">
            <SwitchBetButton />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              // border: "1px solid red",
              height: "100%",
              touchAction: "pan-y",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                ml: 2,
                mt: 1,
                width: "100%",
              }}
            >
              {/* <Typography sx={{ mb: 1 }} fontSize={16}>
              <b>SVE IGRE</b>
            </Typography> */}
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
                    setSelectedComponent(item.componentName);
                    navigate("/slot");
                  }}
                >
                  <item.icon
                    fill={item.defaultFill}
                    width={"1.8em"}
                    height={"1.8em"}
                  />

                  <Typography
                    fontSize={item.fontSize}
                    color={"white"}
                    ml={2}
                    width={"80%"}
                  >
                    {item.name}
                  </Typography>
                </RoundGradientButton>
              ))}

              {!user ? null : <UserLoyaltyCard />}
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
                  {selectedComponent === "Početna" ? <b>首页</b> : "首页"}
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

                <PresentIcon
                  width={"1.8em"}
                  height={"1.8em"}
                  fill={"#FFC211"}
                />

                <Typography
                  // fontSize={item.fontSize}
                  color={"white"}
                  ml={2}
                  width={"80%"}
                >
                  {/* {item.name} */}
                  促销
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
                    color:
                      selectedComponent === "Omiljeno" ? "black" : "#FFC211",
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
                    <b>最喜欢的游戏</b>
                  ) : (
                    "最喜欢的游戏"
                  )}
                </Typography>
              </RoundGradientButton>
            </Box>

            <Modal
              open={isPromoModalOpen}
              onClose={() => handleClosePromoModal()}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  pt: 10,
                  // p: 10,
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
          </Box>
        </>
      ) : isHomePage ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            ml: 4,
          }}
        >
          <CasinoDesktopHomeNavigation width={"100%"} fromMobileMenu={1} />
        </Box>
      ) : (
        <>
          <Box ml={"16%"} mb={2} width="100%">
            <SwitchBetButton />
          </Box>
          <SportCategories />
        </>
      )}
    </Box>
  );

  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <SideMenuIcon />
            <Typography fontSize={8} sx={{ marginTop: 1 }}>
              菜单
            </Typography>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default SideMenuDrawer;
