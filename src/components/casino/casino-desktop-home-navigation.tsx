import { Box, Button, Typography, styled } from "@mui/material";
import { FC, useContext } from "react";
// import HomePageIcon from "../../assets/icons/home-page-icon";
import SlotsIcon from "../../assets/icons/slots-icon";
import LiveDealerIcon from "../../assets/icons/live-dealer-icon";
import ProvidersIcon from "../../assets/icons/providers-icon";
import VirtualsDiceIcon from "../../assets/icons/virtuals-dice-icon";

import FootballIcon from "../../assets/icons/football-svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import SlotCardIcon from "../../assets/icons/slot-cards";
import NavigationContext from "../../store/navigation-context";
import LiveMarkIcon from "../../assets/icons/live-mark-icon";
import BasketballIcon from "../../assets/icons/basketball-svg";
import TennisIcon from "../../assets/icons/tennis-svg";
import { fadeInOut } from "../../theme/animations";
import UserLoyaltyCard from "../user-loyalty/user-loyalty-card";

type GradientProps = {
  gradientColors: string[];
};
const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

const CasinoDesktopHomeNavigation: FC<{
  width: string;
  fromMobileMenu?: number;
}> = ({ width, fromMobileMenu }) => {
  const navigate = useNavigate();

  const { setSelectedComponent, setSport, user } =
    useContext(NavigationContext);

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

  const navigationSportButtons = [
    {
      name: "Live",
      icon: LiveMarkIcon,
      defaultColor: "#0D0D17",
      defaultFill: "red",
      fontSize: 16,
      sportId: "S",
    },
    {
      name: "Fudbal",
      icon: FootballIcon,
      defaultColor: "#0D0D17",
      defaultFill: "white",
      fontSize: 16,
      sportId: "S",
    },
    {
      name: "Košarka",
      icon: BasketballIcon,
      defaultColor: "#0D0D17",
      defaultFill: "#FF5811",
      fontSize: 16,
      sportId: "B",
    },
    {
      name: "Tenis",
      icon: TennisIcon,
      defaultColor: "#0D0D17",
      defaultFill: "#DBFF00",
      fontSize: 16,
      sportId: "T",
    },
    // {
    //   name: "Odbojka",
    //   icon: VoleyballIcon,
    //   defaultColor: "#0D0D17",
    //   defaultFill: "#00C2FF",
    //   sportId: "V",
    // },
    // {
    //   name: "S.Tenis",
    //   icon: TableTennisIcon,
    //   defaultColor: "#0D0D17",
    //   defaultFill: "#FF2828",
    //   fontSize: 16,

    //   sportId: "TT",
    // },
    // {
    //   name: "Live Dealer",
    //   componentName: "Live Dealer",
    //   icon: LiveDealerIcon,
    //   selectedColor: "#FFC211",
    //   defaultColor: "#0D0D17",
    //   selectedFill: "black",
    //   defaultFill: "#FFC211",
    //   fontSize: 16,
    //   isBold: true,
    // },
    // {
    //   name: "Svi Provajderi",
    //   componentName: "SviProvajderi",
    //   icon: ProvidersIcon,
    //   selectedColor: "#FFC211",
    //   defaultColor: "#0D0D17",
    //   selectedFill: "black",
    //   defaultFill: "#FF2E52",
    //   fontSize: 16,
    //   isBold: true,
    // },
    // {
    //   name: "Virtuali",
    //   componentName: "Virtuals",
    //   icon: VirtualsDiceIcon,
    //   selectedColor: "#FFC211",
    //   defaultColor: "#0D0D17",
    //   selectedFill: "black",
    //   defaultFill: "#70FF00",
    //   fontSize: 16,
    //   isBold: true,
    // },
  ];

  // useEffect(() => {
  //   console.log("accountUserName", accountUserName);
  // }, [accountUserName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-startcenter",
        // justifyContent: "flex-start",
        width: width,
        ml: "1%",
        position: fromMobileMenu === 1 ? "static" : "fixed",
        mt: 2,

        // marginTop: "6%",
        // border: "1px solid red",
      }}
    >
      <Box
        width={"70%"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          ml: "3%",
          mb: 3,
        }}
      >
        <Box
          width={"46%"}
          sx={{
            borderRadius: 5,
            // position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            // left: "23%",
            padding: 1.5,
            // zIndex: isCasinoPage ? 1 : 2,
            background: "linear-gradient(to right bottom, #FFE928,#FFB628)",
          }}
          onClick={() => navigate("/sport")}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              // ml: 3,
            }}
          >
            <FootballIcon fill={"black"} width={"1rem"} height={"1rem"} />
            <Typography
              fontSize={12}
              sx={{
                textAlign: "center",
                ml: 1,
                color: "black",
              }}
            >
              <b>SPORT</b>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 22, borderLeft: "1px solid white" }}></Box>

        <Box
          width={"46%"}
          sx={{
            borderRadius: 5,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",

            padding: 1.5,
            // zIndex: isCasinoPage ? 1 : 2,
            background: "linear-gradient(to right bottom, #FFE928,#FFB628)",
          }}
          onClick={() => navigate("/slot")}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // ml: 3,
            }}
          >
            <SlotCardIcon fill={"black"} width={"1rem"} height={"1rem"} />
            <Typography
              fontSize={12}
              sx={{
                textAlign: "center",
                ml: 1,
                color: "black",
              }}
            >
              <b>SLOT</b>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          ml: 2,
          mt: 1,
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
              width: "74%",
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
          // <Button
          //   key={index}
          //   variant={"outlined"}
          //   sx={{
          //     display: "flex",
          //     flexDirection: "row",
          //     alignItems: "center",
          //     justifyContent: "center",
          //     textTransform: "none",
          //     width: "74%",
          //     // backgroundColor: item.defaultColor,
          //     mt: 0.5,
          //     mb: 0.5,
          //   }}
          //   onClick={() => {
          //     setSelectedComponent(item.componentName);
          //     navigate("/casino");
          //   }}
          // >
          //   <item.icon
          //     fill={item.defaultFill}
          //     width={"1.8em"}
          //     height={"1.8em"}
          //   />
          //   <Typography
          //     fontSize={item.fontSize}
          //     color={"white"}
          //     ml={2}
          //     width={"80%"}
          //   >
          //     {item.name}
          //   </Typography>
          // </Button>
        ))}

        <Typography sx={{ mt: 2, mb: 1 }} fontSize={16}>
          <b>SPORT</b>
        </Typography>
        {navigationSportButtons.map((item, index) => (
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
              width: "74%",
              // backgroundColor: item.defaultColor,
              mt: 0.5,
              mb: 0.5,
              "&:hover": {
                marginLeft: 0.8,
                transition: "0.6s",
                backgroundColor: "#171b31",
              },
            }}
            onClick={() => {
              if (item.name === "Live") {
                navigate("/live");
              } else {
                setSport(item.sportId);
                navigate("/sport");
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                animation:
                  item.name === "Live"
                    ? `${fadeInOut} 3s ease-in-out infinite`
                    : null,
              }}
            >
              <item.icon
                fill={item.defaultFill}
                width={"1.8em"}
                height={"1.8em"}
              />
            </Box>
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
        <Button
          sx={{
            color: "white",
            textTransform: "none",
            width: "74%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          onClick={() => navigate("/sport")}
        >
          <ChevronRightIcon />
          <Typography>Kompletna ponuda</Typography>
        </Button>
      </Box>
      <Box sx={{ width: "80%" }}>
        {!user || fromMobileMenu === 1 ? null : <UserLoyaltyCard />}
      </Box>
    </Box>
  );
};

export default CasinoDesktopHomeNavigation;
