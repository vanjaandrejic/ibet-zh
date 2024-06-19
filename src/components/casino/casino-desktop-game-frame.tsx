import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ResizeIcon from "../../assets/icons/resize-icon";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import { currentGame } from "../../pages/casino-page";
import CloseIcon from "@mui/icons-material/Close";

type GradientProps = {
  gradientColors: string[];
};

const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

interface CasinoDesktopGameFrameProps {
  isGameFullScreen: boolean;
  selectedGameUrl: string;
  setIsGameFullScreen: Dispatch<SetStateAction<boolean>>;
  currentGame: currentGame;
  setIsDesktopGameStarted: Dispatch<SetStateAction<boolean>>;
  handleOpenGame: (
    gameId: string,
    provider: string,
    demo: boolean
  ) => Promise<void>;
}

const borderRadius = 4;
const RoundGradientBox = styled(
  Box,
  options
)<GradientProps>(({ gradientColors }) => ({
  position: "relative",
  border: "2px solid transparent",
  backgroundClip: "padding-box",
  borderRadius,
  width: "70%",
  backgroundColor: "#0D0D17",
  padding: "0.4%",

  "&:after": {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(to left, ${gradientColors.join(",")})`,
    content: '""',
    zIndex: -1,
    borderRadius,
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#FFC211" : "#FFC211",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 14,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const CasinoDesktopGameFrame: FC<CasinoDesktopGameFrameProps> = ({
  selectedGameUrl,
  setIsGameFullScreen,
  currentGame,
  handleOpenGame,
  setIsDesktopGameStarted,
  isGameFullScreen,
}) => {
  const [isDemoGame, setIsDemoGame] = useState<boolean>(currentGame.demo);

  //   const location = useLocation();
  //   const gameUrl = location.state?.selectedGameUrl;

  useEffect(() => {
    if (isDemoGame) {
      handleOpenGame(currentGame.gameId, currentGame.provider, true);
      setIsGameFullScreen(false);
    } else {
      handleOpenGame(currentGame.gameId, currentGame.provider, false);
      setIsGameFullScreen(false);
    }
  }, [
    currentGame.gameId,
    currentGame.provider,
    handleOpenGame,
    isDemoGame,
    setIsGameFullScreen,
  ]);

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <IconButton
          size="small"
          sx={{
            zIndex: 9999,
            backgroundColor: "#FFC211",
            color: "black",
            border: "none",
            padding: 0,
          }}
          onClick={() => setIsDesktopGameStarted(false)}
        >
          <CancelIcon />
        </IconButton>
      </Box> */}
      {/* <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 90,
          left: 420,
          zIndex: 9999,
          backgroundColor: "#FFC211",
          color: "black",
          border: "none",
          padding: 0,
        }}
        onClick={() => navigate("/casino")}
      >
        <CancelIcon />
      </IconButton> */}
      <RoundGradientBox
        gradientColors={["#08080F", "#171B31"]}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          // justifyContent: "flex-end",
          alignItems: "center",
          // border: "1px solid red",
          padding: 1,
          backgroundColor: "#08080F",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {/* <Typography fontSize={14}>
              <b>REAL</b>
            </Typography>
            <Switch {...label} />
            <Typography fontSize={14}>
              <b>DEMO</b>
            </Typography> */}

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography fontSize={14}>
                <b>REAL</b>
              </Typography>
              <AntSwitch
                value={isDemoGame}
                onChange={() => setIsDemoGame(!isDemoGame)}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography fontSize={14}>
                <b>DEMO</b>
              </Typography>
            </Stack>
          </Box>
          {/* <Button
            variant={isDemoGame ? "contained" : "outlined"}
            // size="small"
            sx={{
              // position: "absolute",
              // bottom: 228,

              // left: 1488,
              // zIndex: 9999,
              backgroundColor: isDemoGame ? "#FFC211" : null,
              color: isDemoGame ? "black" : "white",
              border: "none",
            }}
            onClick={() => {
              handleOpenGame(currentGame.gameId, currentGame.provider, true);
              setIsDemoGame(true);
            }}
          >
            <b>Demo</b>
          </Button>
          <Button
            variant={isDemoGame ? "outlined" : "contained"}
            // size="small"
            sx={{
              // position: "absolute",
              // bottom: 228,

              // left: 1488,
              // zIndex: 9999,
              backgroundColor: !isDemoGame ? "#FFC211" : null,
              color: !isDemoGame ? "black" : "white",
              border: "none",
            }}
            onClick={() => {
              handleOpenGame(currentGame?.gameId, currentGame?.provider, false);
              setIsDemoGame(false);
            }}
          >
            <b>Real</b>
          </Button> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "6%",
            }}
          >
            <IconButton
              size="small"
              sx={{
                // position: "absolute",
                // bottom: 228,

                // left: 1488,
                zIndex: 200,
                // backgroundColor: "#FFC211",
                color: "black",
                border: "none",
                padding: 0,
              }}
              onClick={() => {
                setIsGameFullScreen(!isGameFullScreen);
              }}
            >
              <ResizeIcon />
            </IconButton>

            <Button
              size="small"
              variant="contained"
              sx={{
                zIndex: 200,
                backgroundColor: "#FFC211",
                color: "black",
                border: "none",
                padding: 0,
                maxWidth: "25px",
                maxHeight: "25px",
                minWidth: "25px",
                minHeight: "25px",
                mr: isGameFullScreen ? 4 : 0,
              }}
              onClick={() => setIsDesktopGameStarted(false)}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Box>
      </RoundGradientBox>
      {selectedGameUrl && (
        <iframe
          src={selectedGameUrl}
          title="Casino Game"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            marginTop: isGameFullScreen ? 0 : 12,
            borderRadius: 20,
          }}
        />
      )}
    </>
  );
};

export default CasinoDesktopGameFrame;
