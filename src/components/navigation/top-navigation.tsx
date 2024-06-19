import { Box, Button, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountInfo from "./account-info";
import WalletIcon from "../../assets/icons/wallet-icon";
import MagicSearchIcon from "../../assets/icons/magic-search";
import { useMediaQuery } from "@mui/material";
import NavigationContext from "../../store/navigation-context";
import fetchUser from "../../utils/api/user-data/get-user-data";
import fetchUserName from "../../utils/api/user-data/get-username";

const TopNavigation: FC = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isCasinoPage = location.pathname === "/slot";
  const isRootPage = location.pathname === "/";
  // const isCasinoSearchPage = location.pathname === "/casino-search";

  const { setAccountUserName, isDesktopGameStarted, user, setUser } =
    useContext(NavigationContext);

  useEffect(() => {
    fetchUser(setUser);
  }, [location.pathname, isDesktopGameStarted, setUser]);

  useEffect(() => {
    fetchUserName(setAccountUserName);
  }, [setAccountUserName, location.pathname]);

  const getNavigationDisplay = () => {
    return location.pathname === "/search" ||
      location.pathname === "/slot-game" ||
      location.pathname === "/slot-search"
      ? "none"
      : "flex";
  };

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  return (
    <Box
      height={80}
      sx={{
        backgroundColor: "#08080F",
        display: getNavigationDisplay(),
        flexDirection: "row",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 3000,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <img
        height={60}
        src="/365ch.png"
        style={{ marginLeft: isDesktop ? "8%" : 4 }}
        onClick={() => navigate("/")}
      ></img>

      {isDesktop && !isCasinoPage && !isRootPage ? (
        <Button
          variant="outlined"
          sx={{
            width: "60%",
            // marginBottom: 2,
            textTransform: "none",
            color: "white",
            // borderColor: "#FFC211",
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
          onClick={() => {
            isCasinoPage ? navigate("/slot-search") : navigate("/search");
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // padding: 0.8,
              alignItems: "center",
            }}
          >
            <MagicSearchIcon fill={"white"} />
            {isCasinoPage ? (
              <Typography fontSize={14} sx={{ marginLeft: 2 }}>
                搜索你的游戏...
              </Typography>
            ) : (
              <Typography fontSize={14} sx={{ marginLeft: 2 }}>
                搜索你的游戏...
              </Typography>
            )}
          </Box>
        </Button>
      ) : null}
      {user ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 1,
          }}
        >
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              color: "#2F3B4B",
            }}
            onClick={() => setShowBox(!showBox)}
          >
            <PersonIcon style={{ fontSize: 36 }} />
            {showBox ? (
              <ArrowDropUpIcon style={{ fontSize: 36, marginLeft: -14 }} />
            ) : (
              <ArrowDropDownIcon style={{ fontSize: 36, marginLeft: -14 }} />
            )}
          </Button>

          {showBox && <AccountInfo user={user} setShowBox={setShowBox} />}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f1b812",
              height: "2.8rem",
              width: "2.8rem",

              marginLeft: 1.5,
              borderRadius: 2.8,
            }}
            onClick={() => navigate("/payment-card")}
          >
            <WalletIcon width={"2rem"} height={"2rem"} color={"#0E0D0E"} />
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            marginRight: 1,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            sx={{ marginRight: 2, borderRadius: 100 }}
            onClick={() => navigate("/account")}
          >
            <LoginIcon sx={{ color: "white", width: "16px" }} />

            <Typography
              fontSize={10}
              sx={{
                padding: " 0 8px",
                textTransform: "capitalize",
                color: "white",
              }}
            >
              <b>登录</b>
              {/* prijavi se */}
            </Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 100,
              background: "linear-gradient(to right bottom, #ff3d24,#ffcf05)",
            }}
            onClick={() => navigate("/registration")}
          >
            <PersonIcon sx={{ color: "white", width: "16px" }} />
            <Typography
              fontSize={10}
              sx={{
                textTransform: "capitalize",
                color: "white",
              }}
            >
              <b>注册</b>
              {/* registracija */}
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TopNavigation;
