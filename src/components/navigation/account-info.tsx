import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Grow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import ProfileRoundedIcon from "../../assets/icons/profile-rounded-icon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WalletIcon from "../../assets/icons/wallet-icon";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PresentIcon from "../../assets/icons/present-icon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { formatter } from "../../utils/common";
import { User } from "../../types/user";
import TicketIcon from "../../assets/icons/ticket-icon";
// import BellIcon from "../../assets/icons/bell-icon";
import { useNavigate } from "react-router-dom";
import NavigationContext from "../../store/navigation-context";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface AccountInfoProps {
  user: User;
  setShowBox: (boolean: boolean) => void;
}
const AccountInfo: FC<AccountInfoProps> = ({ user, setShowBox }) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  // console.log(JSON.stringify(user));
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setShowBox(false); // Ovde postavljamo setShowBox na false pre navigacije
    navigate(path);
  };

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

  const { accountUserName, freeBetInfo, setUser } =
    useContext(NavigationContext);

  // console.log(freeBetInfo);

  const getFreebetBalance = () => {
    const availableFreeBet =
      // @ts-ignore
      freeBetInfo?.balance -
      // @ts-ignore
      freeBetInfo?.freebetTotalBonusInfo?.totalBlockedAmount;

    return availableFreeBet.toFixed(2);
  };

  const handleChange =
    (panel: string) =>
    (_event: React.ChangeEvent<object>, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };
  return (
    <Grow key={animationKey} in={true} {...{ timeout: 1000 }}>
      <Box
        sx={{
          backgroundColor: "#121425",
          height: isDesktop ? "80dvh" : "80dvh",
          position: "absolute",
          top: "100%",
          right: "0",
          width: isDesktop ? "26dvw" : "100dvw",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
          padding: 3,
          zIndex: 3000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 1,
          }}
        >
          <Typography sx={{ color: "#2F3B4B" }}>
            <b>Stanje</b>
          </Typography>
          <Typography>
            <b>{formatter.format(user.balance)}</b>
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "56",
            backgroundColor: "#f1b812",
            marginBottom: 1,
          }}
          onClick={() => {
            handleNavigate("/payment-card");
          }}
        >
          <Typography sx={{ textTransform: "capitalize", color: "black" }}>
            <b>Uplati</b>
          </Typography>
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 1,
          }}
        >
          <Typography>{accountUserName}</Typography>
          <Typography fontSize={12}>ID {user.id}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 1,
          }}
        >
          <Typography fontSize={12}>Zlato</Typography>
          <Typography fontSize={12}>{getFreebetBalance()} RSD</Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <LockOutlinedIcon sx={{ fontSize: 14 }}></LockOutlinedIcon>
            <Typography fontSize={12} ml={0.5}>
              {
                // @ts-ignore
                freeBetInfo?.freebetTotalBonusInfo?.totalBlockedAmount.toFixed(
                  2
                )
              }
              RSD
            </Typography>
          </Box>
        </Box>
        <Grid sx={{ width: "100%" }}>
          <Accordion
            expanded={expandedAccordion === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ width: "100%" }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon sx={{ color: "#4B5E78" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#121425",
                width: "100%",
              }}
            >
              <ProfileRoundedIcon />
              <Typography
                fontSize={14}
                sx={{ marginLeft: 1.6, color: "#4B5E78" }}
              >
                <b>Profil</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ marginTop: -2, width: "100%", backgroundColor: "#121425" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {/* <Button
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/user-details")}
              >
                <Typography fontSize={14} sx={{ color: "#4B5E78" }}>
                  <b>Detalji o korisniku</b>
                </Typography>
              </Button> */}

                <Button
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      marginLeft: 0.5,
                      transition: "0.6s",
                      // webkitFilter: blur(),
                      // filter: "blur(3px)",
                      // cursor: "pointer",
                      // border: " 1px solid red",
                      backgroundColor: "#f1b812",
                    },
                  }}
                  onClick={() => handleNavigate("/change-password")}
                >
                  <Typography
                    fontSize={14}
                    sx={{
                      color:
                        location.pathname === "/change-password"
                          ? "#f1b812"
                          : "#4B5E78",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                  >
                    <b>Promena lozinke</b>
                  </Typography>
                </Button>

                <Button
                  sx={{
                    // width: "100%",
                    // display: "flex",
                    // justifyContent: "flex-start",
                    textTransform: "none",
                    "&:hover": {
                      marginLeft: 0.5,
                      transition: "0.6s",
                      // webkitFilter: blur(),
                      // filter: "blur(3px)",
                      // cursor: "pointer",
                      // border: " 1px solid red",
                      backgroundColor: "#f1b812",
                    },
                  }}
                  onClick={() => handleNavigate("/user-transactions")}
                >
                  <Typography
                    fontSize={14}
                    sx={{
                      color:
                        location.pathname === "/user-transactions"
                          ? "#f1b812"
                          : "#4B5E78",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                  >
                    <b>Transakcije</b>
                  </Typography>
                </Button>
                {/* 
                <Button sx={{ textTransform: "none" }}>
                  <Typography fontSize={14} sx={{ color: "#4B5E78" }}>
                    <b>Limiti</b>
                  </Typography>
                </Button> */}

                <Button
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      marginLeft: 0.5,
                      transition: "0.6s",
                      // webkitFilter: blur(),
                      // filter: "blur(3px)",
                      // cursor: "pointer",
                      // border: " 1px solid red",
                      backgroundColor: "#f1b812",
                    },
                  }}
                  onClick={() => handleNavigate("/user-identitiy-verification")}
                >
                  <Typography
                    fontSize={14}
                    sx={{
                      color:
                        location.pathname === "/user-identitiy-verification"
                          ? "#f1b812"
                          : "#4B5E78",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                  >
                    <b>Potvrda Identiteta</b>
                  </Typography>
                </Button>

                {/* <Button sx={{ textTransform: "none" }}>
                  <Typography fontSize={14} sx={{ color: "#4B5E78" }}>
                    <b>Podešavanja</b>
                  </Typography>
                </Button> */}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedAccordion === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon sx={{ color: "#4B5E78" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#121425",
              }}
            >
              <WalletIcon
                width={"1.3rem"}
                height={"1.3rem"}
                color={"#4B5E78"}
              />
              <Typography
                fontSize={14}
                sx={{ marginLeft: 1.6, color: "#4B5E78" }}
              >
                <b>Uplata - Isplata</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#121425",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Button
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    marginLeft: 0.5,
                    transition: "0.6s",
                    // webkitFilter: blur(),
                    // filter: "blur(3px)",
                    // cursor: "pointer",
                    // border: " 1px solid red",
                    backgroundColor: "#f1b812",
                  },
                }}
                onClick={() => handleNavigate("/payment-card")}
              >
                <Typography
                  fontSize={14}
                  sx={{
                    color:
                      location.pathname === "/payment-card"
                        ? "#f1b812"
                        : "#4B5E78",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <b>Uplata platnom karticom</b>
                </Typography>
              </Button>
              {/* <Button
                sx={{ textTransform: "none" }}
                onClick={() => handleNavigate("/user-transactions")}
              >
                <Typography fontSize={14} sx={{ color: "#4B5E78" }}>
                  <b>Uplata na lokaciji</b>
                </Typography>
              </Button> */}
              <Button
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    marginLeft: 0.5,
                    transition: "0.6s",
                    // webkitFilter: blur(),
                    // filter: "blur(3px)",
                    // cursor: "pointer",
                    // border: " 1px solid red",
                    backgroundColor: "#f1b812",
                  },
                }}
                onClick={() => handleNavigate("/payout-bank-account")}
              >
                <Typography
                  fontSize={14}
                  sx={{
                    color:
                      location.pathname === "/payout-bank-account"
                        ? "#f1b812"
                        : "#4B5E78",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <b>Isplata na tekući račun</b>
                </Typography>
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    marginLeft: 0.5,
                    transition: "0.6s",
                    // webkitFilter: blur(),
                    // filter: "blur(3px)",
                    // cursor: "pointer",
                    // border: " 1px solid red",
                    backgroundColor: "#f1b812",
                  },
                }}
                onClick={() => handleNavigate("/payout-location")}
              >
                <Typography
                  fontSize={14}
                  sx={{
                    color:
                      location.pathname === "/payout-location"
                        ? "#f1b812"
                        : "#4B5E78",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <b>Isplata na uplatnom mestu</b>
                </Typography>
              </Button>
            </AccordionDetails>
          </Accordion>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: 2,
              marginTop: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://ibet-365.com/pomoc/");
            }}
          >
            <HelpOutlineOutlinedIcon sx={{ color: "#4B5E78" }} />
            <Typography
              fontSize={14}
              sx={{ color: "#4B5E78", padding: "4px", marginLeft: 1 }}
            >
              <b>Pomoć</b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: 2,
              marginTop: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://ibet-365.com/odgovorno-kladenje/");
            }}
          >
            <HelpOutlineOutlinedIcon sx={{ color: "#4B5E78" }} />
            <Typography
              fontSize={14}
              sx={{ color: "#4B5E78", padding: "4px", marginLeft: 1 }}
            >
              <b>Odgovorno klađenje</b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: 2,
              marginTop: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("https://ibet-365.com/pravila/");
            }}
          >
            <HelpOutlineOutlinedIcon sx={{ color: "#4B5E78" }} />
            <Typography
              fontSize={14}
              sx={{ color: "#4B5E78", padding: "4px", marginLeft: 1 }}
            >
              <b>Pravila</b>
            </Typography>
          </Box>
        </Grid>

        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            width: "90%",
            backgroundColor: "#121425",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              marginTop: 1,
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "#f1b812",
                  transform: "scale(1.1)",
                  transition: "0.6s",
                },
              }}
            >

              <CoinsIcon fill={"#2F3B4B"} />
             
              <Typography
                fontSize={12}
              
              >
                Moji Dukati
              </Typography>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "#f1b812",
                  transform: "scale(1.1)",
                  transition: "0.6s",
                },
              }}
              onClick={() => {
                navigate("/user-played-tickets");
                setShowBox(false);
              }}
            >
              <TicketIcon fill={"#2F3B4B"} />
              <Typography fontSize={12} sx={{ padding: "4px" }}>
                Tiketi
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "#f1b812",
                  transform: "scale(1.1)",
                  transition: "0.6s",
                },
              }}
            >
              <BellIcon />
              <Typography fontSize={12} sx={{ padding: "4px" }}>
                Notifikacije
              </Typography>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "#f1b812",
                  transform: "scale(1.1)",
                  transition: "0.6s",
                },
              }}
              // onClick={() => {}}
            >
              <PresentIcon color="#2F3B4B" />
              <Typography fontSize={12} sx={{ padding: "4px" }}>
                Promocije
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItemsms: "center",
              marginTop: 2,
            }}
          >
            <Button
              onClick={() => {
                localStorage.removeItem("__ibet-mobile/_ionickv/auth-token");
                localStorage.removeItem("__ibet-mobile/_ionickv/uuid");
                localStorage.removeItem("__ibet-mobile/_ionickv/utkn");
                setUser(null);
                handleNavigate("/");

                // window.location.reload();
              }}
              sx={{
                "&:hover": {
                  marginLeft: 0.5,
                  transition: "0.6s",
                  // webkitFilter: blur(),
                  // filter: "blur(3px)",
                  // cursor: "pointer",
                  // border: " 1px solid red",
                  backgroundColor: "#f1b812",
                },
              }}
            >
              <LogoutOutlinedIcon sx={{ color: "#4B5E78", width: "1.8rem" }} />
              <Typography
                fontSize={14}
                sx={{
                  color: "#4B5E78",
                  textTransform: "capitalize",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <b>Izloguj se</b>
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default AccountInfo;
