import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface SideCasinoDrawerProps {
  setSelectedComponent: (component: string) => void;
  setProvider: (provider: string) => void;
}

type Anchor = "right";

const providerImages = [
  { provider: "FAZI", imagePath: "/slot-providers/fazi.png" },
  { provider: "PRAGMATIC", imagePath: "/slot-providers/pragmaticplay.png" },
  { provider: "NETENT", imagePath: "/slot-providers/netent.png" },
  { provider: "SLOTOPIA", imagePath: "/slot-providers/slotopia.png" },
  { provider: "HACKSAW", imagePath: "/slot-providers/hacksaw.png" },
  { provider: "WAZDAN", imagePath: "/slot-providers/wazdan.png" },
];

const SideCasinoDrawer: React.FC<SideCasinoDrawerProps> = ({
  setSelectedComponent,
  setProvider,
}) => {
  const [state, setState] = React.useState<{ [key in Anchor]: boolean }>({
    right: false,
  });

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
        width: "12dvw",
        height: "100%",
        paddingTop: 10,
        paddingBottom: 8,
        backgroundColor: "#0D0D19",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton
        onClick={toggleDrawer(anchor, false)}
        sx={{ marginRight: 20 }}
      >
        <ArrowBack sx={{ color: "#FFC211" }} />
      </IconButton>
      {/* <Box ml={"25%"} mb={2}>
        <SwitchBetButton />
      </Box>
      <SportCategories /> */}
      {providerImages.map(({ provider, imagePath }) => (
        <Box
          key={imagePath}
          onClick={() => {
            setSelectedComponent("Provajderi");
            setProvider(provider);
          }}
          sx={{
            ml: 2,
            borderRadius: 2,
            borderWidth: 0.4,
            borderColor: "#25253A",
            borderStyle: "solid",
            width: "78%",
            height: "auto",
            position: "relative",
            display: "flex",
            mb: 1,
          }}
        >
          <img
            width={"100%"}
            height={"100%"}
            src={imagePath}
            alt={`${provider} logo`}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer("right", true)}
        sx={{
          position: "fixed",
          top: "50%",
          right: 20,
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "right center",
          backgroundColor: "#FFC211",
          borderRadius: 0,
          padding: 1,
          pl: 1,
          pr: 1,
        }}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap",
            color: "black",
          }}
        >
          <b>PROVAJDERI</b>
        </Typography>
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </>
  );
};

export default SideCasinoDrawer;
