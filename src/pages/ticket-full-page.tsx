import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketItem } from "../utils/api/tickets-info/get-ticket-item";
import TicketFullEvidenceItem from "../components/tickets-evidence/ticket-full-evidence-item";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import SocketContext from "../store/socket-context";

const TicketFullPage: FC = () => {
  const { ticketCode } = useParams();
  const [ticket, setTicket] = useState<any>({});
  const [isCashoutOptionsVisible, setIsCashoutOptionsVisible] =
    useState<boolean>(false);

  const { socketMessage, setSocketMessage } = useContext(SocketContext);

  const [prepaymentValue, setPrepaymentValue] = useState<string>("");

  const [requestUuid, setRequestUUid] = useState<string>("");

  const [isSendRequestOpen, setIsSendRequestOpen] = useState<boolean>(false);
  // const [remainingSeconds, setRemainingSeconds] = useState<number>(15);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfrimLoading, setisConfrimLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTicketItem(ticketCode);
        setTicket(response.ITicket);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [ticketCode]);

  const cashoutSubmit = async () => {
    setIsLoading(true);
    const reqUuid = uuidv4();
    setRequestUUid(reqUuid);
    try {
      const formData = new URLSearchParams();
      formData.append("tuuid", ticket.uuid);
      formData.append("requestUuid", reqUuid);
      formData.append("cashoutValue", ticket.proposedCashout);
      formData.append("token", ticket.prepaymentToken);

      const headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "X-Auth-Token": localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        ),
        Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
      };

      const response = await axios.post(
        "https://ibet2.365.rs/ibet/ticket/submitPrePayoutRequest.json?mobileVersion=2.32.10.5&locale=sr",
        formData.toString(),
        { headers: headers }
      );

      // toast.success(response.data.message);
      // setIsCashoutOptionsVisible(true);
      // setRequestUUid(response.data.ticket.uuid);

      return response.data;
    } catch (error) {
      console.error("Error submitting cashout request:", error);
      setIsCashoutOptionsVisible(false);
      throw error;
    } finally {
      // sessionStorage.clear();
      // window.location.reload();
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    const refetch = async () => {
      try {
        const response = await getTicketItem(ticketCode);
        setTicket(response.ITicket);
      } catch (error) {
        console.error(error);
      }
    };

    // @ts-ignore
    if (socketMessage.notificationType === "PREPAYMENT_APPROVED") {
      toast.success("Uspešno ste uzeli cashout");
      setSocketMessage({});
      refetch();
    } else if (
      // @ts-ignore
      socketMessage?.notificationType === "PREPAYMENT_CONFIRM_REQUIRED"
    ) {
      setIsCashoutOptionsVisible(true);
      // @ts-ignore
      setPrepaymentValue(socketMessage?.data.proposedPayout);
    } else if (
      // @ts-ignore
      socketMessage?.notificationType === "PREPAYMENT_CONFIRM_EXPIRED"
    ) {
      setIsCashoutOptionsVisible(false);
      setIsLoading(false);
      toast.info("Niste se izjasnili u odredjenom roku");
      setSocketMessage({});
    }
  }, [setSocketMessage, socketMessage, ticketCode]);

  //Requset sent from Modal!
  const cashoutSubmitLast = async () => {
    setisConfrimLoading(true);
    try {
      const formData = new URLSearchParams();
      // formData.append("tuuid", ticket.uuid);
      formData.append("uuid", requestUuid);
      // formData.append("cashoutValue", ticket.proposedCashout);
      // formData.append("token", ticket.prepaymentToken);

      const headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "X-Auth-Token": localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        ),
        Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
      };

      const response = await axios.post(
        "https://ibet2.365.rs/ibet/ticket/acceptPrepayment.json?mobileVersion=2.32.10.5&locale=sr",
        formData.toString(),
        { headers: headers }
      );

      // toast.success(response.data.message);

      return response.data;
    } catch (error) {
      console.error("Error submitting cashout request:", error);
      throw error;
    } finally {
      try {
        const response = await getTicketItem(ticketCode);
        setTicket(response.ITicket);
      } catch (error) {
        console.error(error);
      }
      setIsCashoutOptionsVisible(false);
      setisConfrimLoading(false);
      setIsSendRequestOpen(false);
    }
  };

  // useEffect(() => {
  //   let timer: number;
  //   if (isCashoutOptionsVIsible) {
  //     setRemainingSeconds(15);
  //     timer = setInterval(() => {
  //       setRemainingSeconds((prevSeconds) => {
  //         if (prevSeconds <= 1) {
  //           setIsCashoutOptionsVisible(false);
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prevSeconds - 1;
  //       });
  //     }, 1000);
  //   }

  //   return () => clearInterval(timer);
  // }, [isCashoutOptionsVIsible]);

  // console.log("ticket", ticket);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        maxWidth: 800,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>
            <b>Broj tiketa</b>
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box
              sx={{
                borderRadius: "100%",
                backgroundColor:
                  ticket.status === 0
                    ? "#FFC211"
                    : ticket.status === 1
                    ? "green"
                    : "red",
                width: 18,
                height: 18,
                minWidth: 18,
                minHeight: 18,
                mr: 1,
              }}
            ></Box>
            <Typography>{ticket.code}</Typography>
          </Box>
        </Box>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {ticket.ticketStatusSystem &&
        // ticket.ticketStatusSystem[0].ticketStatusMatch.map(
        //   (item: any, index: any) => (
        //     <TicketFullEvidenceItem key={index} ticket={item} />
        //   ))

        ticket.ticketStatusSystem.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",

                flexDirection: "column",
                width: "100%",
                mb: 2,
                mt: 2,
              }}
            >
              <Typography>
                Potrebno Pogodaka: <b>{item.hits.join(" ili ")}</b>
              </Typography>
              {item.ticketStatusMatch.map((item: any, index: any) => {
                return <TicketFullEvidenceItem key={index} ticket={item} />;
              })}
            </Box>
          );
        })}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>Ukupna kvota:</Typography>
          <Typography>
            {ticket.minTotalOdd ? ticket.minTotalOdd.toFixed(2) : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>Ukupna uplata:</Typography>
          <Typography>
            {ticket.payIn ? ticket.payIn.toFixed(2) + "RSD" : ""}
          </Typography>
        </Box>
        {ticket.possibleWin !== undefined && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {ticket.status === 1 ? (
              <>
                <Typography>Dobitak:</Typography>
                <Typography>{ticket.win.toFixed(2)}RSD</Typography>
              </>
            ) : ticket.status === -1 ? null : (
              <>
                <Typography>Potencijalna isplata:</Typography>
                <Typography>{ticket.possibleWin.toFixed(2)}RSD</Typography>
              </>
            )}
          </Box>
        )}
      </Box>
      {ticket?.prepaymentAllowed ? (
        <Button
          variant={"contained"}
          disabled={isLoading}
          sx={{
            mt: 2,
            mb: 2,
            width: "80%",
            height: "44px",
            backgroundColor: "#FFC211",
            "&:hover": {
              backgroundColor: "#FFC211",
            },
            "&:active": {
              backgroundColor: "#FFC211",
            },
            color: "black",
          }}
          onClick={() => {
            setIsSendRequestOpen(true);
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress />
              <Typography sx={{ ml: 1 }}>
                <b>Cashout je na autorizaciji</b>
              </Typography>
            </>
          ) : (
            <Typography color={"black"}>
              {<b>CASHOUT {ticket?.proposedCashout?.toFixed(2)} RSD</b>}
            </Typography>
          )}
        </Button>
      ) : null}

      <Modal
        open={isCashoutOptionsVisible}
        sx={{
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 1000,
            backgroundColor: "#08080F",
          }}
        >
          <Typography
            sx={{ mb: 2 }}
            fontWeight={"bold"}
          >{`Da li želite da uzmete ${Number(prepaymentValue).toFixed(
            2
          )} RSD`}</Typography>

          {/* <Typography>{`Preostalo vreme: ${remainingSeconds}s`}</Typography> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <Button
              disabled={isConfrimLoading}
              variant="contained"
              // disabled={isLoading}
              sx={{
                width: "40%",
                backgroundColor: "#FFC211",
                "&:hover": {
                  backgroundColor: "#FFC211",
                },
                "&:active": {
                  backgroundColor: "#FFC211",
                },
                height: "44px",
              }}
              onClick={() => cashoutSubmitLast()}
            >
              {isConfrimLoading ? (
                <CircularProgress />
              ) : (
                <Typography color={"black"}>
                  <b>DA</b>
                </Typography>
              )}
            </Button>
            <Button
              disabled={isConfrimLoading}
              variant="contained"
              sx={{ width: "40%", height: "44px" }}
              onClick={() => {
                setIsCashoutOptionsVisible(false);
                setIsLoading(false);
              }}
            >
              <Typography>
                <b>NE</b>
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isSendRequestOpen}
        sx={{
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            maxWidth: 1000,
            backgroundColor: "#08080F",
          }}
        >
          <Typography sx={{ mb: 2 }} fontWeight={"bold"}>
            Da li ste sigurni?
          </Typography>

          {/* <Typography>{`Preostalo vreme: ${remainingSeconds}s`}</Typography> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <Button
              disabled={isLoading}
              variant="contained"
              // disabled={isLoading}
              sx={{
                width: "40%",
                backgroundColor: "#FFC211",
                "&:hover": {
                  backgroundColor: "#FFC211",
                },
                "&:active": {
                  backgroundColor: "#FFC211",
                },
                height: "44px",
              }}
              onClick={() => {
                cashoutSubmit();
                setIsSendRequestOpen(false);
              }}
            >
              {isConfrimLoading ? (
                <CircularProgress />
              ) : (
                <Typography color={"black"}>
                  <b>DA</b>
                </Typography>
              )}
            </Button>
            <Button
              disabled={isLoading}
              variant="contained"
              sx={{ width: "40%", height: "44px" }}
              onClick={() => {
                setIsCashoutOptionsVisible(false);
                setIsLoading(false);
                setIsSendRequestOpen(false);
              }}
            >
              <Typography>
                <b>NE</b>
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TicketFullPage;
