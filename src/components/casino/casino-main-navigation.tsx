import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import MagicSearchIcon from "../../assets/icons/magic-search";
import HomePageIcon from "../../assets/icons/home-page-icon";
import SlotsIcon from "../../assets/icons/slots-icon";
import LiveDealerIcon from "../../assets/icons/live-dealer-icon";
import ProvidersIcon from "../../assets/icons/providers-icon";
import VirtualsDiceIcon from "../../assets/icons/virtuals-dice-icon";

interface CasinoMainNavigationProps {
  handleNavigationClick: (component: string) => void;
}

const CasinoMainNavigation: FC<CasinoMainNavigationProps> = ({
  handleNavigationClick,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("Pretraga")}
      >
        <MagicSearchIcon fill={"#FFC211"} />
        <Typography fontSize={10}>Pretraga</Typography>
      </IconButton>
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("Početna")}
      >
        <HomePageIcon fill={"#FFC211"} width={"1em"} height={"1em"} />
        <Typography fontSize={10}>Početna</Typography>
      </IconButton>
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("Slotovi")}
      >
        <SlotsIcon fill={"#FFC211"} />
        <Typography fontSize={10}>Slotovi</Typography>
      </IconButton>
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("Live Dealer")}
      >
        <LiveDealerIcon fill={"#FFC211"} />
        <Typography fontSize={10}>Live Dealer</Typography>
      </IconButton>
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("SviProvajderi")}
      >
        <ProvidersIcon fill={"#FFC211"} />
        <Typography fontSize={10}>Provajderi</Typography>
      </IconButton>
      <IconButton
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={() => handleNavigationClick("Virtuals")}
      >
        <VirtualsDiceIcon fill={"#FFC211"} />
        <Typography fontSize={10}>Virtuali</Typography>
      </IconButton>
    </Box>
  );
};

export default CasinoMainNavigation;
