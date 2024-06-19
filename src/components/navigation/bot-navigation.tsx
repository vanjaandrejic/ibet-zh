import {
  Badge,
  Box,
  Button,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../store/app-context";
import SlotCardIcon from "../../assets/icons/slot-cards";
import TicketInfo from "./ticket-info";
import SideMenuDrawer from "./side-drawer";
import OddsMinIcon from "../../assets/icons/odds-min-icon";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useMediaQuery } from "@mui/material";
import TicketIcon from "../../assets/icons/ticket-icon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WalletIcon from "../../assets/icons/wallet-icon";
import CoinsIcon from "../../assets/icons/coins-svg";
import FootballIcon from "../../assets/icons/football-svg";
import NavigationContext from "../../store/navigation-context";

const BotNavigation: FC = () => {
  const [showTicket, setShowTicket] = useState<boolean>(false);
  const { ticketMatches } = useContext(AppContext);
  const navigate = useNavigate();

  const { user } = useContext(NavigationContext);

  // const getNavigationDisplay = () => {
  //   return location.pathname === "/casino-game" || location.pathname === "/"
  //     ? "none"
  //     : "flex";
  // };

  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isCasinoPage = location.pathname === "/slot";
  const isCasinoGamePage = location.pathname === "/slot-game";

  return (
    <Box
      width="100dvw"
      height={60}
      color="lightgreen"
      sx={{
        backgroundColor: "#08080F",
        display: isCasinoGamePage ? "none" : "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        // boxShadow: 3,
        position: "fixed",
        bottom: 0,
        zIndex: 3000,
        pt: 2,
        pb: 2,
        // boxShadow: "2px 0px  40px  1px #FFC211",

        // border: "1px solid red",
      }}
    >
      {showTicket ? (
        <TicketInfo setShowTicket={setShowTicket} showTicket={showTicket} />
      ) : null}

      {/* <Button
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => navigate("/result")}
      >
        <SideMenuIcon />
        <Typography fontSize={8} sx={{ marginTop: 1 }}>
          Meni
        </Typography>
      </Button> */}

      {isDesktop ? (
        <Button
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
          }}
          onClick={() => {
            navigate("/user-played-tickets");
          }}
        >
          <TicketIcon fill={"#FFC211"} width={"1.2rem"} />
          <Typography fontSize={12} sx={{ color: "white", ml: 1 }}>
            Tiketi
          </Typography>
        </Button>
      ) : null}
      {isDesktop ? null : <SideMenuDrawer />}

      {ticketMatches.length > 0 && !showTicket ? (
        <Grow
          in={!showTicket}
          // style={{ transformOrigin: "0 0 0" }}
          {...(!showTicket ? { timeout: 800 } : {})}
        >
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              zIndex: 888,
              bottom: isDesktop ? 132 : 34,
              right: isDesktop ? 132 : null,
              width: "66px",
              height: "66px",
              borderRadius: 100,
              backgroundColor: "#FFC211",
              // boxShadow: 3,
              // boxShadow: isDesktop ? "2px 0px  40px  1px #FFC211" : null,
              // border: "2px solid white",
            }}
            variant="contained"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              setShowTicket(true);
            }}
          >
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              overlap="circular"
              badgeContent={ticketMatches.length}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <EditNoteIcon style={{ fontSize: 56, color: "black" }} />
            </Badge>
          </Button>
        </Grow>
      ) : null}

      {isCasinoPage ? (
        <>
          <Button
            sx={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              marginLeft: 1,
            }}
            onClick={() => {
              if (user) {
                navigate("/payment-card");
              } else {
                navigate("account");
              }
            }}
          >
            <WalletIcon
              color={isDesktop ? "#FFC211" : "#697484"}
              width={"1.8rem"}
              // style={{ fontSize: 30, color: isDesktop ? "#FFC211" : "#697484" }}
            />
            <Typography
              fontSize={isDesktop ? 12 : 8}
              sx={{
                ml: isDesktop ? 1 : 0,
                mt: isDesktop ? 0 : 0.5,
                color: isDesktop ? "white" : "#697484",
              }}
            >
              Uplata
            </Typography>
          </Button>
          <Button
            sx={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              marginBottom: 1.5,
              mt: isDesktop ? 1 : 1.8,
            }}
            onClick={() => {
              if (user) {
                navigate("/payout-bank-account");
              } else {
                navigate("account");
              }
            }}
          >
            <CoinsIcon fill={isDesktop ? "#FFC211" : "#697484"} />
            <Typography
              fontSize={isDesktop ? 12 : 8}
              sx={{
                ml: 1,
                marginTop: isDesktop ? 0 : 0,
                color: isDesktop ? "white" : "#697484",
              }}
            >
              Isplata
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button
            sx={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              marginLeft: 1,
            }}
            onClick={() => navigate("/lastminute")}
          >
            <AccessTimeIcon
              style={{ fontSize: 30, color: isDesktop ? "#FFC211" : "#697484" }}
            />
            <Typography
              fontSize={isDesktop ? 12 : 8}
              sx={{
                ml: isDesktop ? 1 : 0,
                mt: isDesktop ? 0 : 0.5,
                color: isDesktop ? "white" : "#697484",
              }}
            >
              Vremenska
            </Typography>
          </Button>
          <IconButton
            sx={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              marginBottom: 1.5,
              mt: isDesktop ? 1 : 0,
            }}
            onClick={() => navigate("/oddrange")}
          >
            <OddsMinIcon fill={isDesktop ? "#FFC211" : "#697484"} />
            <Typography
              fontSize={isDesktop ? 12 : 8}
              sx={{
                marginTop: isDesktop ? 0 : -0.8,
                color: isDesktop ? "white" : "#697484",
              }}
            >
              KVOTE
            </Typography>
          </IconButton>
        </>
      )}

      {isCasinoPage ? (
        <Button
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
          }}
          onClick={() => navigate("/sport")}
        >
          <FootballIcon fill={isDesktop ? "#FFC211" : "#697484"} />
          <Typography
            fontSize={isDesktop ? 12 : 8}
            sx={{
              ml: isDesktop ? 1 : 0,
              marginTop: isDesktop ? 0 : 1,
              color: isDesktop ? "white" : "#697484",
            }}
          >
            sport
          </Typography>
        </Button>
      ) : (
        <Button
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
          }}
          onClick={() => navigate("/slot")}
        >
          <SlotCardIcon fill={isDesktop ? "#FFC211" : "#697484"} />
          <Typography
            fontSize={isDesktop ? 12 : 8}
            sx={{
              ml: isDesktop ? 1 : 0,
              marginTop: isDesktop ? 0 : 1,
              color: isDesktop ? "white" : "#697484",
            }}
          >
            Slot
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default BotNavigation;
