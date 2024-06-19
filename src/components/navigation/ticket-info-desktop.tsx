import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import AppContext from "../../store/app-context";
import TicketItem from "../ticket/ticket-item";
import { TicketMatch } from "../../types/match";
import { formatter } from "../../utils/common";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BetDataContext from "../../store/bet-data-context";
// import { TicketResponse } from "../../types/ticket";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const TicketInfoDesktop: FC<{
  showTicket: boolean;
  setShowTicket: (bool: boolean) => void;
}> = ({ setShowTicket }) => {
  const [totalOdd, setTotalOdd] = useState<number>(1);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpressLoading, setIsExpressLoading] = useState<boolean>(false);

  //  toast.success("Uspešno ste se prijavili!");

  // const { ticketMatches, clearTicket } = useContext(AppContext);

  // const [ticketResponse, setTicketResponse] = useState<TicketResponse>(
  //   {} as TicketResponse
  // );

  const { ticketMatches, clearTicket } = useContext(AppContext);

  const { betPickMap } = useContext(BetDataContext);

  useEffect(() => {
    let calculatedOdd = 1;
    ticketMatches.forEach((match: TicketMatch) => {
      calculatedOdd *= match.selectedOdd?.odd || 1;
    });
    setTotalOdd(calculatedOdd);
  }, [ticketMatches]);

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseFloat(event.target.value);
    setBetAmount(isNaN(amount) ? 0 : amount);
  };

  const betAmountValue = isNaN(betAmount) ? 0 : betAmount;
  const potentialWinning = formatter.format(totalOdd * betAmountValue);

  const generateTicketObject = (isExpress: boolean) => {
    if (!ticketMatches || ticketMatches.length === 0) {
      return;
    }

    // Pravimo prazan niz za "systems"
    const systems = [];

    // Dodajemo jedan objekat u "systems" sa "hits" od 4 za svaki tiket
    systems.push({
      hits: [ticketMatches.length],
      matches: ticketMatches.map((item) => ({
        code: item.matchCode,
        tipTypes: [
          {
            code: item.selectedOdd.code,
            odd: item.selectedOdd.odd?.toFixed(2),
            specialValue: null,
            live: false,
            // Dodajemo uslovni deo samo ako je item.live true
            ...(item.live
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
    };

    const createdObject = {
      tjson: JSON.stringify(tJsonObject),
      c: true,
      freeBet: false,
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
      clearTicket();
      if (isExpress) {
        setIsExpressLoading(false);
      } else {
        setIsLoading(false);
      }
      console.log("Ticket successfully sent:", result);
      if (result.data.expressTicket) {
        toast.success(
          `Ušpesno ste uplatili tiket, kod vaseg tiketa:${result.data.ticket.code}`
        );
      } else {
        toast.success(result.data.message);
      }
    } catch (error) {
      console.error("Error sending ticket:", error);
      if (isExpress) {
        setIsExpressLoading(false);
      } else {
        setIsLoading(false);
      }
    }

    setShowTicket(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFC211",
          height: "80dvh",

          width: "98%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          boxShadow: 3,
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
              <b>Tiket</b>
            </Typography>
          </Box>
          {/* <IconButton
            onClick={() => setShowTicket(false)}
            sx={{ color: "black", marginRight: 2 }}
          >
            <b>x</b>
          </IconButton> */}
        </Box>

        <Box
          sx={{
            width: "101%",
            height: "101%",
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
            <Box>
              <Typography fontSize={14} color="#3D3D47">
                <b>Sistem</b>
              </Typography>
            </Box>
          </Box>
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
            {ticketMatches.map((ticket, index) => (
              <TicketItem key={index} match={ticket} betPickMap={betPickMap} />
            ))}
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
                  <Typography
                    color="white"
                    fontSize={10}
                    sx={{ marginRight: 1 }}
                  >
                    <b>Kvota</b>
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
                    marginLeft: 4,
                  }}
                >
                  <Typography
                    color="white"
                    fontSize={10}
                    sx={{ marginRight: 1 }}
                  >
                    <b>Uplata</b>
                  </Typography>
                  <TextField
                    sx={{
                      width: 100,
                    }}
                    size="small"
                    variant="outlined"
                    value={betAmountValue}
                    onChange={handleBetAmountChange}
                  />
                </Box>
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
                  <b>Pot. Dobitak</b>
                </Typography>
                <Typography fontSize={14} color="#f1b812">
                  <b>{potentialWinning}</b>
                </Typography>
              </Box>

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
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography sx={{ color: "black" }}>
                    <b>Uplata</b>
                  </Typography>
                )}
              </Button>
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
        </Box>
      </Box>
    </>
  );
};

export default TicketInfoDesktop;
