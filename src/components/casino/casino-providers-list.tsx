import { Box, Typography, Grid } from "@mui/material";
import { FC } from "react";

interface CasinoProvidersListProps {
  handleNavigationClick: (component: string) => void;
  setProvider: (provider: string) => void;
}

const CasinoProvidersList: FC<CasinoProvidersListProps> = ({
  handleNavigationClick,
  setProvider,
}) => {
  const providerImages = [
    { provider: "FAZI", imagePath: "/slot-providers/fazi.png" },
    { provider: "PRAGMATIC", imagePath: "/slot-providers/pragmaticplay.png" },
    { provider: "NETENT", imagePath: "/slot-providers/netent.png" },
    { provider: "SLOTOPIA", imagePath: "/slot-providers/slotopia.png" },
    { provider: "HACKSAW", imagePath: "/slot-providers/hacksaw.png" },
    { provider: "WAZDAN", imagePath: "/slot-providers/wazdan.png" },
    { provider: "1X2 GAMING", imagePath: "/slot-providers/1x2gaming.png" },
    { provider: "5MANGAMING", imagePath: "/slot-providers/5mangames.png" },
    { provider: "EVOPLAY", imagePath: "/slot-providers/evoplay.png" },
    { provider: "BETSOFT", imagePath: "/slot-providers/betsoft.png" },
    { provider: "BFGAMES", imagePath: "/slot-providers/bfgames.png" },
    { provider: "BLUEPRINT", imagePath: "/slot-providers/blueprintgaming.png" },
    { provider: "ENDORPHINA", imagePath: "/slot-providers/endorphina.png" },
    { provider: "FUGASO", imagePath: "/slot-providers/fugaso.png" },
    { provider: "GAMEART", imagePath: "/slot-providers/gameart.png" },
    { provider: "NOLIMIT CITY", imagePath: "/slot-providers/nolimitcity.png" },
    { provider: "PLATIPUS", imagePath: "/slot-providers/platipus.png" },
    { provider: "PLAYSON", imagePath: "/slot-providers/playson.png" },
    { provider: "SLOTMATRIX", imagePath: "/slot-providers/slotmatrix.png" },
    { provider: "SPADEGAMING", imagePath: "/slot-providers/spadegaming.png" },
    { provider: "SPINOMENAL", imagePath: "/slot-providers/spinomenal.png" },
    { provider: "TOMHORN", imagePath: "/slot-providers/tomhorn.png" },
    { provider: "EVOLUTION", imagePath: "/slot-providers/evolution.png" },
    { provider: "RELAX GAMING", imagePath: "/slot-providers/relaxgaming.png" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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

export default CasinoProvidersList;
