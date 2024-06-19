import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";

import TicketItem from "../ticket/ticket-item";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import NavigationContext from "../../store/navigation-context";
import AppContext from "../../store/app-context";
import BetDataContext from "../../store/bet-data-context";
import { formatter } from "../../utils/common";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { TicketMatch } from "../../types/match";
// import SocketContext from "../../store/socket-context";
import TicketAuthModal from "../ticket/ticket-auth-modal";
import SocketContext from "../../store/socket-context";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FFC211",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FFC211",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const NormalTicket: FC<{
  setShowTicket: (bool: boolean) => void;
}> = ({ setShowTicket }) => {
  const { user, iParametars } = useContext(NavigationContext);
  const { setSocketMessage } = useContext(SocketContext);
  const { ticketMatches, clearTicket } = useContext(AppContext);
  const { betPickMap } = useContext(BetDataContext);

  const [totalOdd, setTotalOdd] = useState<number>(1);
  const [betAmount, setBetAmount] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpressLoading, setIsExpressLoading] = useState<boolean>(false);
  const [bonusParameters, setBonusParameters] = useState<any[]>([]);
  const [bonusTipsNumber, setBonusTipsNumber] = useState<number>(0);
  const [acceptChanges, setAcceptChanges] = useState<boolean>(true);
  const [useFreeBet, setUseFreeBet] = useState<boolean>(false);

  const [isTicketAuthModalOpen, setIsTicketAuthModalOpen] =
    useState<boolean>(false);

  const [isTicketOnAuth, setIsTicketOnAuth] = useState<boolean>(false);
  const [ticketUuid, setTicketUuid] = useState<string>("");

  // useEffect(() => {
  //   console.log(socketMessage);
  // }, [socketMessage]);

  useEffect(() => {
    // @ts-ignore
    const stringParams =
      // @ts-ignore
      iParametars.parameterValueMap["BONUS_PARAMETERS"].value.split("#");

    // console.log("stringParams", stringParams);

    let helpArr = [];

    for (let i = 0; i < stringParams.length; i = i + 2) {
      helpArr.push(stringParams[i]);
    }
    helpArr = helpArr.slice(1);
    helpArr.splice(-15);

    setBonusParameters(helpArr);
    // @ts-ignore
  }, [iParametars.parameterValueMap]);

  useEffect(() => {
    let calculatedOdd = 1;
    ticketMatches.forEach((match: TicketMatch) => {
      calculatedOdd *= match?.selectedOdd?.odd || 1;
    });
    setTotalOdd(calculatedOdd);
  }, [ticketMatches]);

  useEffect(() => {
    if (ticketMatches.length < 1) {
      setShowTicket(false);
    }
  }, [setShowTicket, ticketMatches]);

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseFloat(event.target.value);
    setBetAmount(isNaN(amount) ? 0 : amount);
  };

  const betAmountValue = isNaN(betAmount) ? 0 : betAmount;
  // const potentialWinning = formatter.format(totalOdd * betAmountValue);

  //!! Calculate odd with bonus
  const potentialWiningWithBonus =
    totalOdd * betAmountValue +
    ((totalOdd * betAmountValue) / 100) *
      Number(bonusParameters[ticketMatches.length - 1]);

  const limitedPotentialWiningWithBonus = Math.min(
    potentialWiningWithBonus,
    12000000
  );

  const potentialWiningWithBonusDislpay = formatter.format(
    limitedPotentialWiningWithBonus
  );
  //!! Calculate odd with bonus

  useEffect(() => {
    let validTips = 0;

    ticketMatches.forEach((item) => {
      // @ts-ignore
      if (item.selectedOdd.odd > 1.25) {
        validTips += 1;
      }
    });

    setBonusTipsNumber(validTips);
  }, [ticketMatches]);

  const generateTicketObject = (isExpress: boolean) => {
    if (!ticketMatches || ticketMatches.length === 0) {
      return;
    }

    // Pravimo prazan niz za "systems"
    const systems = [];

    // Dodajemo jedan objekat u "systems" sa "hits" od 4 za svaki tiket
    systems.push({
      // hits: isSystemTicket ? [systemHitsValue] : [ticketMatches.length],
      hits: [ticketMatches.length],
      matches: ticketMatches.map((item) => ({
        code: item.matchCode,
        tipTypes: [
          {
            code: item.selectedOdd.code,
            odd: item.selectedOdd.odd,
            specialValue: item.selectedOdd.specialValue,
            live: item.selectedOdd.live,

            ...(item.selectedOdd.live
              ? {
                  liveBetPickCode: item.selectedOdd.betPickCode,
                  tipTypeCode: item.selectedOdd.betCode,
                }
              : {
                  betPickCode: item.selectedOdd.betPickCode,
                  betCode: item.selectedOdd.tipTypeCode,
                  betPickGroupId: item.selectedOdd.betPickGroupId,
                  tipTypeCode: item.selectedOdd.betCode,
                }),
          },
        ],
      })),
    });

    const tJsonObject = {
      payin: betAmountValue,
      systems,
      apiVersion: "v3",
      uuid: uuidv4(),
      giftUuid: null,
    };

    const createdObject = {
      tjson: JSON.stringify(tJsonObject),
      c: acceptChanges,
      freeBet: useFreeBet,
      expressTicketEnable: isExpress,
    };

    return createdObject;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateFormDataFromObject = (obj: any) => {
    const formData = new URLSearchParams();

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Ako je vrednost objekat, prolazimo kroz svoje ključeve i dodajemo ih kao FormData
        Object.keys(obj[key]).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, obj[key][subKey]);
        });
      } else {
        // Inače, dodajemo vrednost kao običan ključ-vrednost u FormData
        formData.append(key, obj[key]);
      }
    });

    return formData;
  };

  const sendTicket = async (isExpress: boolean) => {
    if (isExpress) {
      setIsExpressLoading(true);
    } else {
      setIsLoading(true);
    }
    try {
      const authToken = localStorage.getItem(
        "__ibet-mobile/_ionickv/auth-token"
      );
      const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

      if (!authToken || !utkn) return;

      const tjson = generateTicketObject(isExpress);

      // console.log(tjson);

      // Konvertujemo objekat u FormData
      const formData = generateFormDataFromObject(tjson);

      const result = await axios.post(
        "https://ibet2.365.rs/ibet/saveTicketAsyncBet.json",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Auth-Token": authToken,
            Utkn: utkn,
          },
          params: {
            mobileVersion: "2.27.33",
            locale: "sr",
          },
        }
      );
      // setTicketResponse(result.data);
      // clearTicket();
      if (isExpress) {
        setIsExpressLoading(false);
      } else {
        setIsLoading(false);
      }
      // console.log("Ticket successfully sent:", result);
      if (result.data.expressTicket) {
        toast.success(
          `Ušpesno ste uplatili tiket, kod vaseg tiketa:${result.data.ticket.code}`
        );
      } else {
        if (result.data.payInResponse === "AUTHORIZATION_REQUIRED") {
          setIsTicketAuthModalOpen(true);
          setIsTicketOnAuth(true);
          // console.log(result.data);
          // setShowTicket(false);

          setTicketUuid(result.data.ticket.uuid);
        } else if (result.data.payInResponse === "CANCELED") {
          console.log(result.data);
          setIsLoading(false);
          setIsExpressLoading(false);
          clearTicket();
          toast(result.data.message);
        } else {
          toast.success(result.data.message);
          clearTicket();
          setShowTicket(false);
          setSocketMessage({});
        }
        // setIsTicketAuthModalOpen(true);
        // setIsTicketOnAuth(true);
        // console.log(result.data);
        // // setShowTicket(false);

        // setTicketUuid(result.data.ticket.uuid);
      }
    } catch (error) {
      setIsTicketAuthModalOpen(false);
      setIsTicketOnAuth(false);
      console.error("Error sending ticket:", error);
      if (isExpress) {
        setIsExpressLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptChanges(event.target.checked);
  };

  const handleFreeBetSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseFreeBet(event.target.checked);
  };

  return (
    <>
      <TicketAuthModal
        setIsTicketAuthModalOpen={setIsTicketAuthModalOpen}
        isTicketAuthModalOpen={isTicketAuthModalOpen}
        setIsTicketOnAuth={setIsTicketOnAuth}
        isTicketOnAuth={isTicketOnAuth}
        ticketUuid={ticketUuid}
        setShowTicket={setShowTicket}
      />
      <Grid
        container
        sx={{
          width: "90%",
          marginTop: 2,
          marginBottom: 2,
          overflowY: "auto",
          maxHeight: "90%",
          justifyContent: "center",
        }}
      >
        {ticketMatches.map((ticket) => (
          <TicketItem key={ticket.id} match={ticket} betPickMap={betPickMap} />
        ))}

        {/* Bonus Steper */}

        <Box
          // height={120}
          width="100%"
          sx={{
            overflowX: "auto",
            overflowY: "hidden", // Omogućava horizontalni scroll
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // boxShadow: 3,
            justifyContent: "flex-start",
            mt: 2,
            mb: 2,
            // marginBottom: 4,
            // borderTop: "0.5px solid #2F3B4B",
            // borderBottom: "0.5px solid #2F3B4B",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            sx={{
              flexDirection: "row",
              flexWrap: "nowrap",
              minWidth: "fit-content",
            }}
            spacing={1}
          >
            <Grid item>
              <Stepper
                alternativeLabel
                activeStep={bonusTipsNumber}
                connector={<QontoConnector />}
              >
                {bonusParameters.map((label, index) => (
                  <Step
                    key={index}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "#FFC211", // circle color (COMPLETED)
                      },
                    }}
                  >
                    <StepLabel>{label}%</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
        </Box>

        {/* Bonus Steper */}

        <Typography sx={{ color: "white" }} fontSize={12}>
          {`Jos jedna utakmica do ${
            bonusParameters[ticketMatches.length]
          }% bonusa`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 1,
            marginTop: 2,
            justifyContent: "center",
            alignItems: "center",
            // position: "fixed",
            // bottom: 56,
            backgroundColor: "#08080f",
            width: "86%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 2,
              // backgroundColor: "#08080f",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography color="white" fontSize={10} sx={{ marginRight: 1 }}>
                <b>赔率</b>
              </Typography>
              <Typography fontSize={14} color="#f1b812">
                <b>{totalOdd.toFixed(2)}</b>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                color="white"
                fontSize={10}
                sx={{ marginRight: 1, ml: 1 }}
              >
                <b>Bonus</b>
              </Typography>
              <Typography fontSize={14} color="#f1b812">
                <b>{bonusParameters[ticketMatches.length - 1]}%</b>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 4,
              }}
            >
              <Typography color="white" fontSize={10} sx={{ marginRight: 1 }}>
                <b>支付</b>
              </Typography>
              <TextField
                sx={{
                  width: 100,
                }}
                size="small"
                variant="outlined"
                type="number"
                value={betAmountValue}
                onChange={handleBetAmountChange}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography fontSize={14} color={"white"}>
              <b>Prihvatam promene</b>
            </Typography>
            <Switch
              checked={acceptChanges}
              onChange={handleSwitchChange}
              color="warning"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography fontSize={14} color={"white"}>
              <b>Koristi Zlato</b>
            </Typography>
            <Switch
              checked={useFreeBet}
              onChange={handleFreeBetSwitchChange}
              color="warning"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography color="white" fontSize={10} sx={{ marginRight: 1 }}>
              <b>可能赢得</b>
            </Typography>
            <Typography fontSize={14} color="#f1b812">
              <b>{potentialWiningWithBonusDislpay}</b>
            </Typography>
          </Box>

          {user ? (
            <Button
              variant="contained"
              sx={{
                width: "90%",
                height: "44px",
                backgroundColor: "#f1b812",
                marginBottom: 1,
                borderRadius: 2,
              }}
              onClick={() => sendTicket(false)}
              disabled={
                ticketMatches.some((match) => match.blocked) || isLoading
              }
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography sx={{ color: "black" }}>
                  <b>支付</b>
                </Typography>
              )}
            </Button>
          ) : null}
          <Button
            variant="contained"
            sx={{
              width: "90%",
              height: "44px",
              backgroundColor: "#0D0D19",
              marginBottom: 1,
              borderRadius: 2,
            }}
            onClick={() => sendTicket(true)}
            disabled={ticketMatches.some((match) => match.blocked)}
          >
            {isExpressLoading ? (
              <CircularProgress />
            ) : (
              <Typography sx={{ color: "#62646D" }}>
                <b>Express Tiket</b>
              </Typography>
            )}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default NormalTicket;
