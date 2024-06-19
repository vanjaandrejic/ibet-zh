import { FC, useContext, useEffect, useState } from "react";
import { TicketMatch } from "../../types/match";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import TicketItem from "../ticket/ticket-item";
import AppContext from "../../store/app-context";
import BetDataContext from "../../store/bet-data-context";
import NavigationContext from "../../store/navigation-context";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// import SocketContext from "../../store/socket-context";
import TicketAuthModal from "../ticket/ticket-auth-modal";
import SocketContext from "../../store/socket-context";

type TipType = {
  code: string;
  odd: string;
  specialValue: number | null;
  live: boolean;
  liveBetPickCode?: string;
  tipTypeCode?: string;
  betPickCode?: string;
  betCode?: string;
  betPickGroupId?: string;
};

type Match = {
  code: string;
  tipTypes: TipType[];
};

type System = {
  hits: number[];
  matches: Match[];
};

const SystemTicket: FC<{ setShowTicket: (bool: boolean) => void }> = ({
  setShowTicket,
}) => {
  const [systemHitsValue, setSystemHitsValue] = useState<number[]>([]);
  const [systemDividedMatches, setSystemDividedMatches] = useState<{
    [key: string]: TicketMatch;
  }>({});
  const [systemChoosen, setSystemChoosen] = useState<System[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpressLoading, setIsExpressLoading] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number>(30);

  const [acceptChanges, setAcceptChanges] = useState<boolean>(true);
  const [useFreeBet, setUseFreeBet] = useState<boolean>(false);

  const [isTicketAuthModalOpen, setIsTicketAuthModalOpen] =
    useState<boolean>(false);

  const [isTicketOnAuth, setIsTicketOnAuth] = useState<boolean>(false);
  const [ticketUuid, setTicketUuid] = useState<string>("");

  // const { socketMessage } = useContext(SocketContext);
  const { ticketMatches, clearTicket } = useContext(AppContext);
  const { betPickMap } = useContext(BetDataContext);
  const { user } = useContext(NavigationContext);

  const betAmountValue = isNaN(betAmount) ? 0 : betAmount;

  const { setSocketMessage } = useContext(SocketContext);

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseFloat(event.target.value);
    setBetAmount(isNaN(amount) ? 0 : amount);
  };

  const handleCheckboxChange = (index: number, match: TicketMatch) => {
    setSystemDividedMatches((prev) => {
      const newMatches = { ...prev };
      if (newMatches[index]) {
        delete newMatches[index];
      } else {
        newMatches[index] = match;
      }
      return newMatches;
    });
  };

  const checkIfMatchInSystemChoosen = (ticket: any) => {
    return systemChoosen.some((system) =>
      system?.matches.some((match: any) => match.code === ticket.matchCode)
    );
  };

  // useEffect(() => {
  //   console.log("systemChoosen", systemChoosen);
  // }, [systemChoosen]);

  useEffect(() => {
    if (ticketMatches.length < 1) {
      setShowTicket(false);
    }
  }, [setShowTicket, ticketMatches]);

  const generateTicketObject = (isExpress: boolean) => {
    if (!ticketMatches || ticketMatches.length === 0) {
      return;
    }

    const systems = [...systemChoosen];

    const tJsonObject = {
      payin: betAmountValue,
      systems,
      apiVersion: "v3",
      uuid: uuidv4(),
      giftUuid: null,
    };

    const createdObject = {
      tjson: JSON.stringify(tJsonObject),
      c: true,
      freeBet: false,
      expressTicketEnable: isExpress,
    };

    return createdObject;
  };

  const generateFormDataFromObject = (obj: any) => {
    const formData = new URLSearchParams();

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.keys(obj[key]).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, obj[key][subKey]);
        });
      } else {
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
      clearTicket();
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
        // toast.success(result.data.message);
        if (result.data.payInResponse === "AUTHORIZATION_REQUIRED") {
          setIsTicketAuthModalOpen(true);
          setIsTicketOnAuth(true);

          // console.log(result.data);

          setTicketUuid(result.data.ticket.uuid);
        } else if (result.data.payInResponse === "CANCELED") {
          console.log(result.data);
          setIsLoading(false);
          setIsExpressLoading(false);
        } else {
          toast.success(result.data.message);
          clearTicket();
          setShowTicket(false);
          setSocketMessage({});
        }
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
        {ticketMatches.map((ticket, index) => {
          const isSelected = checkIfMatchInSystemChoosen(ticket);
          if (isSelected) return null;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                sx={{ mt: 2 }}
                checked={Boolean(systemDividedMatches[index])}
                onChange={() => handleCheckboxChange(index, ticket)}
              />
              <TicketItem match={ticket} betPickMap={betPickMap} />
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          {Object.keys(systemDividedMatches).length > 0 &&
            // @ts-ignore
            Object.entries(systemDividedMatches).map((item, index) => {
              const total = Object.entries(systemDividedMatches).length;
              const buttonText = `${index + 1}/${total}`;
              return (
                <Button
                  key={index}
                  variant={
                    systemHitsValue.includes(index + 1)
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    m: 0.2,
                    color: systemHitsValue.includes(index + 1)
                      ? "black"
                      : "white",
                    backgroundColor: systemHitsValue.includes(index + 1)
                      ? "#FFC211"
                      : null,
                  }}
                  onClick={() => {
                    setSystemHitsValue((prev) => {
                      const newValue = [...prev];
                      const idx = newValue.indexOf(index + 1);
                      if (idx !== -1) {
                        newValue.splice(idx, 1);
                      } else {
                        newValue.push(index + 1);
                      }
                      return newValue;
                    });
                  }}
                >
                  <b>{buttonText}</b>
                </Button>
              );
            })}
          {Object.keys(systemDividedMatches).length &&
          systemHitsValue.length ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FFC211", color: "black", ml: 1 }}
              onClick={() => {
                const newSystem = {
                  hits: [...systemHitsValue],
                  matches: Object.entries(systemDividedMatches).map(
                    // @ts-ignore
                    ([key, item]) => ({
                      code: item.matchCode,
                      tipTypes: [
                        {
                          code: item.selectedOdd.code,
                          odd: item.selectedOdd.odd?.toFixed(2),
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
                    })
                  ),
                };

                // @ts-ignore
                setSystemChoosen([...systemChoosen, newSystem]);

                // const remainingMatches = Object.entries(systemDividedMatches)
                //   .filter(
                //     ([key, item]) =>
                //       !systemHitsValue.includes(parseInt(key) + 1)
                //   )
                //   .reduce((acc, [key, item]) => {
                //     acc[key] = item;
                //     return acc;
                //   }, {});

                setSystemDividedMatches({});
                setSystemHitsValue([]);
              }}
            >
              <b>Dodaj</b>
            </Button>
          ) : null}
        </Box>

        <Box sx={{ width: "98%" }}>
          {systemChoosen.map((system, sysIndex) => {
            const matchesToShow = ticketMatches.filter((ticketMatch) =>
              system.matches.some(
                // @ts-ignore
                (match) => match.code === ticketMatch.matchCode
              )
            );

            return (
              <Box
                key={sysIndex}
                sx={{
                  border: "1px solid #f1b812",
                  borderRadius: 3,
                  padding: 0.4,
                  marginBottom: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography color={"white"} fontSize={14}>
                  <b>Sistem {sysIndex + 1}</b>
                </Typography>
                <Typography color={"#f1b812"} fontSize={12}>
                  <b>Pogodaka {system.hits.join(", ")}</b>
                </Typography>
                {/* <Typography variant="h6">Sistem {sysIndex + 1}</Typography>
                <Typography variant="body2">
                  Hits: {system.hits.join(", ")}
                </Typography> */}
                {matchesToShow.map((match) => (
                  <TicketItem
                    key={match.id}
                    match={match}
                    betPickMap={betPickMap}
                    fromSystem={1}
                  />
                ))}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography color="white" fontSize={10} sx={{ marginRight: 1 }}>
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
              type="number"
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
              disabled={ticketMatches.some((match) => match.blocked)}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography sx={{ color: "black" }}>
                  <b>Uplata</b>
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

export default SystemTicket;
