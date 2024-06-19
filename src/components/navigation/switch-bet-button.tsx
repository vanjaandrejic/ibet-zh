import { Box, Typography } from "@mui/material";
import { FC } from "react";
import SlotCardIcon from "../../assets/icons/slot-cards";
import FootballIcon from "../../assets/icons/football-svg";
import { useLocation, useNavigate } from "react-router-dom";

const SwitchBetButton: FC = () => {
  const location = useLocation();
  const isCasinoPage = location.pathname === "/slot";
  const navigate = useNavigate();

  // background: "linear-gradient(to right bottom, #FFE928,#FFB628)",
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "64%",
        borderRadius: 8,
        position: "relative",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#3D3D48",
      }}
    >
      <Box
        width={"55%"}
        sx={{
          borderRadius: 8,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          left: "23%",
          padding: 1.5,
          zIndex: isCasinoPage ? 1 : 2,
          background: isCasinoPage
            ? null
            : "linear-gradient(to right bottom, #FFE928,#FFB628)",
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
          <FootballIcon
            fill={isCasinoPage ? "white" : "black"}
            width={"1rem"}
            height={"1rem"}
          />
          <Typography
            fontSize={12}
            sx={{
              textAlign: "center",
              ml: 1,
              color: isCasinoPage ? "white" : "black",
            }}
          >
            <b>SPORT</b>
          </Typography>
        </Box>
      </Box>
      <Box
        width={"55%"}
        sx={{
          borderRadius: 8,
          position: "absolute",
          top: 0,
          right: "20%",
          transform: "translateX(-50%)",
          zIndex: isCasinoPage ? 2 : 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: isCasinoPage
            ? "linear-gradient(to right bottom, #FFE928,#FFB628)"
            : null,
          padding: 1.5,
          cursor: "pointer",
        }}
        onClick={() => navigate("/slot")}
      >
        <SlotCardIcon
          fill={isCasinoPage ? "black" : "white"}
          width={"1rem"}
          height={"1rem"}
        />
        <Typography
          fontSize={12}
          sx={{
            textAlign: "center",
            ml: 1,
            color: isCasinoPage ? "black" : "white",
          }}
        >
          <b>SLOT</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default SwitchBetButton;
