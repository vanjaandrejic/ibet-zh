import { IconButton } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

const CasinoGamePage: FC = () => {
  const location = useLocation();
  const gameUrl = location.state?.selectedGameUrl;
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          left: 4,
          zIndex: 9999,
          backgroundColor: "#FFC211",
          color: "black",
          border: "none",
          padding: 0,
        }}
        onClick={() => navigate("/slot")}
      >
        <CancelIcon />
      </IconButton>
      {gameUrl && (
        <iframe
          src={gameUrl}
          title="Casino Game"
          style={{
            width: "99dvw",
            height: "100dvh",
            border: "none",
            marginTop: -80,
            marginBottom: -60,
          }}
        />
      )}
    </>
  );
};

export default CasinoGamePage;
