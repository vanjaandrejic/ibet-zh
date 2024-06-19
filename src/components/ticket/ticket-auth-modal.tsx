import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import SocketContext from "../../store/socket-context";
import axios from "axios";
import TicketFullEvidenceItem from "../tickets-evidence/ticket-full-evidence-item";
import { toast } from "react-toastify";
import AppContext from "../../store/app-context";

interface TicketAuthModalProps {
  isTicketAuthModalOpen: boolean;
  isTicketOnAuth: boolean;
  ticketUuid: string;
  setShowTicket: (bool: boolean) => void;
  setIsTicketOnAuth: Dispatch<SetStateAction<boolean>>;
  setIsTicketAuthModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TicketAuthModal: FC<TicketAuthModalProps> = ({
  isTicketAuthModalOpen,
  isTicketOnAuth,
  ticketUuid,
  setShowTicket,
  setIsTicketOnAuth,
  setIsTicketAuthModalOpen,
}) => {
  const { socketMessage, setSocketMessage } = useContext(SocketContext);
  const { clearTicket } = useContext(AppContext);

  const [ticketToApprove, setTicketToApprove] = useState<any[]>([]);

  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    async function getAuthTicket(ticketUuid?: string): Promise<any> {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Auth-Token": localStorage.getItem(
            "__ibet-mobile/_ionickv/auth-token"
          ),
          Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
        };

        const response = await axios.get(
          `https://ibet2.365.rs/ibet/profile/getTicketAuthByUuid/${ticketUuid}.json?mobileVersion=2.32.10.5&locale=sr`,
          { headers }
        );
        setTicketToApprove(response.data.ITicketList);
        setIsTicketOnAuth(false);
        return response.data;
      } catch (error) {
        setIsTicketOnAuth(false);
        setIsTicketAuthModalOpen(false);
        console.error("Error fetching ticket data:", error);
        throw error;
      }
    }

    if (
      // @ts-ignore
      socketMessage.notificationType === "TICKET_ACCEPTED_WITH_CHANGES"
    ) {
      getAuthTicket(ticketUuid);
      // @ts-ignore
    } else if (socketMessage.notificationType === "TICKET_CONFIRM_TIMEOUT") {
      setIsTicketAuthModalOpen(false);
      setIsTicketOnAuth(false);
      setShowTicket(false);
      //   clearTicket();
      toast.info("Niste se izjasnili u roku od 60 sekundi!");
      setSocketMessage({});
    } else if (
      // @ts-ignore
      socketMessage.notificationType === "TICKET_ACCEPTED"
    ) {
      setIsTicketAuthModalOpen(false);
      setIsTicketOnAuth(false);
      setShowTicket(false);
      clearTicket();
      toast.success("Uspešno ste uplatili tiket!");
      setSocketMessage({});

      // @ts-ignore
    } else if (socketMessage.notificationType === "PAYIN_DENIED") {
      setIsTicketAuthModalOpen(false);
      setIsTicketOnAuth(false);
      setShowTicket(false);
      toast.warning("Tiket je odbijen!");
    }
  }, [
    clearTicket,
    setIsTicketAuthModalOpen,
    setIsTicketOnAuth,
    setShowTicket,
    setSocketMessage,
    socketMessage,
    ticketUuid,
  ]);

  // useEffect(() => {
  //   console.log("TicketUuid", ticketUuid);
  // }, [ticketUuid]);

  // useEffect(() => {
  //   console.log("ticketToApprove", ticketToApprove[1]);
  // }, [ticketToApprove]);

  const acceptOrRejectTicket = async (accept: boolean) => {
    try {
      const formData = new URLSearchParams();
      formData.append("uuid", ticketUuid);
      formData.append("accept", String(accept));

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Auth-Token": localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        ),
        Utkn: localStorage.getItem("__ibet-mobile/_ionickv/utkn"),
      };

      const response = await axios.post(
        "https://ibet2.365.rs/ibet/profile/acceptOrRejectChangedRequestByUuid.html?mobileVersion=2.32.10.5&locale=sr",
        formData.toString(), // Convert formData to string
        {
          headers: headers,
        }
      );
      {
        accept
          ? toast.success(response.data.message)
          : toast.info(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error("Greška prilikom slanja zahteva:", error);
      throw error;
    } finally {
      setIsTicketAuthModalOpen(false);
      setIsTicketOnAuth(false);
      setShowTicket(false);
      clearTicket();
      setSocketMessage({});
    }
  };

  return (
    <Modal
      open={isTicketAuthModalOpen}
      sx={{
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          width: "100%",
          maxWidth: 1000,
          overflowY: "auto",
        }}
      >
        {isTicketOnAuth ? (
          <>
            <CircularProgress sx={{ color: "#FFC211" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFC211",
                mt: 3,
                pt: 1,
                pb: 1,
                pl: 3,
                pr: 3,
                borderRadius: 2,
              }}
            >
              <Typography
                color={"black"}
                textTransform={"uppercase"}
                textAlign={"center"}
                fontSize={isDesktop ? 16 : 14}
              >
                <b>Vaš tiket je na autorizaciji. Molimo vas sačekajte...</b>
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 2,
              // overflowY: "auto",
            }}
          >
            {ticketToApprove[1]?.ticketStatusSystem ? (
              ticketToApprove[1].ticketStatusSystem.map(
                (item: any, index: any) => (
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
                    {item.ticketStatusMatch.map(
                      (match: any, matchIndex: any) => (
                        <Box
                          key={matchIndex}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <TicketFullEvidenceItem ticket={match} />
                          {match.ticketStatusTipType[0].oldOdd &&
                          match.ticketStatusTipType[0].odd &&
                          match.ticketStatusTipType[0].oldOdd !==
                            match.ticketStatusTipType[0].odd ? (
                            <Typography sx={{ color: "#FFC211" }} fontSize={14}>
                              Kvota je promenjena iz&nbsp;
                              {match.ticketStatusTipType[0].oldOdd.toFixed(2)}
                              &nbsp;u&nbsp;
                              {match.ticketStatusTipType[0].odd.toFixed(2)}
                            </Typography>
                          ) : null}
                        </Box>
                      )
                    )}
                  </Box>
                )
              )
            ) : (
              <Typography sx={{ color: "white" }}>
                Nema dostupnih podataka za prikaz.
              </Typography>
            )}
            <Typography sx={{ mt: 2 }}>
              Imate 60 sekundi da prihvatite ponudu!
            </Typography>
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
                  {ticketToApprove.length > 1 && ticketToApprove[1].minTotalOdd
                    ? ticketToApprove[1].minTotalOdd.toFixed(2)
                    : ""}
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
                  {ticketToApprove.length > 1 && ticketToApprove[1].payIn
                    ? ticketToApprove[1].payIn.toFixed(2) + "RSD"
                    : ""}
                </Typography>
              </Box>

              {ticketToApprove && ticketToApprove[1] ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography>Stara uplata:</Typography>
                  <Typography>
                    {ticketToApprove.length > 1 && ticketToApprove[1].oldPayIn
                      ? ticketToApprove[1].payIn.toFixed(2) + "RSD"
                      : ""}
                  </Typography>
                </Box>
              ) : null}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography>Potencijalna isplata:</Typography>
                <Typography>
                  {ticketToApprove.length > 1 && ticketToApprove[1].maxTotalWin
                    ? ticketToApprove[1].maxTotalWin.toFixed(2) + "RSD"
                    : ""}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 2,
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "40%",
                  height: "44px",
                  backgroundColor: "#f1b812",
                  marginBottom: 1,
                  borderRadius: 2,
                }}
                onClick={() => {
                  acceptOrRejectTicket(true);
                }}
              >
                <Typography sx={{ color: "black" }}>
                  <b>Prihvati</b>
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "40%",
                  height: "44px",
                  backgroundColor: "#0D0D19",
                  marginBottom: 1,
                  borderRadius: 2,
                }}
                onClick={() => {
                  acceptOrRejectTicket(false);
                }}
              >
                <Typography sx={{ color: "#62646D" }}>
                  <b>Odbij</b>
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default TicketAuthModal;
