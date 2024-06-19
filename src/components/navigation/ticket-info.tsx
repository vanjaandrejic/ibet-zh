import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { FC, useContext, useState } from "react";

import EditNoteIcon from "@mui/icons-material/EditNote";

import CloseIcon from "@mui/icons-material/Close";
import NormalTicket from "./normal-ticket";
import SystemTicket from "./system-ticket";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AppContext from "../../store/app-context";

const TicketInfo: FC<{
  showTicket: boolean;
  setShowTicket: (bool: boolean) => void;
}> = ({ setShowTicket }) => {
  const [isSystemTicket, setIsSystemTicket] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const { clearTicket } = useContext(AppContext);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFC211",
          height: "80dvh",
          position: "absolute",
          bottom: "99%",
          right: isDesktop ? "1%" : null,
          width: isDesktop ? "28%" : "98%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          // boxShadow: isDesktop ? "2px 0px  40px  1px #FFC211" : null,
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFC211",
            marginTop: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: 1,
            borderRadius: 4,
          }}
          onClick={() => setShowTicket(false)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EditNoteIcon
              style={{ fontSize: 40, color: "black", marginLeft: 14 }}
            />
            <Typography fontSize={16} color="black">
              <b>票据</b>
            </Typography>
          </Box>
          <IconButton
            onClick={() => setShowTicket(false)}
            sx={{ color: "black", marginRight: 2 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#08080f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {isSystemTicket ? (
              <Box
                sx={{
                  // borderBottom: "1px solid",
                  // borderColor: "#FFC211",
                  borderWidth: 2,
                  padding: 1,
                  cursor: "pointer",
                }}
                onClick={() => setIsSystemTicket(false)}
              >
                <Typography fontSize={14} color="#3D3D47">
                  <b>Običan</b>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "#FFC211",
                  borderWidth: 2,
                  padding: 1,
                }}
              >
                <Typography fontSize={14} color="white">
                  <b>Običan</b>
                </Typography>
              </Box>
            )}
            {isSystemTicket ? (
              <Box
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "#FFC211",
                  borderWidth: 2,
                  padding: 1,
                }}
              >
                <Typography fontSize={14} color="white">
                  <b>Sistem</b>
                </Typography>
              </Box>
            ) : (
              <Box
                onClick={() => setIsSystemTicket(true)}
                sx={{ cursor: "pointer" }}
              >
                <Typography fontSize={14} color="#3D3D47">
                  <b>Sistem</b>
                </Typography>
              </Box>
            )}
          </Box>
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => clearTicket()}
          >
            <DeleteSweepIcon sx={{ mr: 1, fontSize: 28, color: "#f1b812" }} />
            <Typography fontSize={14} sx={{ color: "#f1b812" }}>
              <b>Očisti tiket</b>
            </Typography>
          </IconButton>
          {isSystemTicket ? (
            <SystemTicket setShowTicket={setShowTicket} />
          ) : (
            <NormalTicket setShowTicket={setShowTicket} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TicketInfo;
