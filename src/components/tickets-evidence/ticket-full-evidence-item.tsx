import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatKickOffTime } from "../../utils/common";
import FootballIcon from "../../assets/icons/football-svg";
import LiveMarkIcon from "../../assets/icons/live-mark-icon";

interface TicketFullEvidenceItemProps {
  ticket: any;
}

const TicketFullEvidenceItem: FC<TicketFullEvidenceItemProps> = ({
  ticket,
}) => {
  // console.log("ticketticketticket", ticket);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#0D0D19",
        borderRadius: 3,
        marginTop: 2,
        overflow: "hidden", // Ensure the overlay doesn't go outside the container
      }}
    >
      {ticket?.deleted && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Typography fontSize={12} color="white">
            {ticket?.bookmakerComment}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0D19",
          paddingLeft: 1,
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        {/* {ticket?.deleted && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Typography fontSize={14} color="white">
              Ticket Deleted
            </Typography>
          </Box>
        )} */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {
                // @ts-ignore
                ticket.ticketStatusTipType[0].live ? (
                  <LiveMarkIcon width={"1.4rem"} />
                ) : null
              }
              <FootballIcon width={"1.4rem"} fill="silver" />
            </Box>

            <Box>
              <Typography fontSize={10} sx={{ marginLeft: 1 }} color="white">
                <b>
                  {
                    // @ts-ignore
                    ticket.home
                  }
                  -{" "}
                  {
                    // @ts-ignore
                    ticket.away
                  }
                </b>
              </Typography>
              <Typography
                fontSize={10}
                color={"#62646D"}
                sx={{ marginLeft: 1, marginTop: 1 }}
              >
                <b>
                  {formatKickOffTime(
                    // @ts-ignore
                    ticket.kickOffTime
                  )}
                </b>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={12} color={"#62646D"} marginRight={3}>
              {
                // @ts-ignore
                ticket.ticketStatusTipType[0].caption
              }
            </Typography>
            <Typography fontSize={12} color="white" marginRight={2}>
              <b>
                {
                  // @ts-ignore
                  ticket.ticketStatusTipType[0].odd.toFixed(2)
                }
              </b>
            </Typography>
          </Box>

          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography fontSize={12} color={"#62646D"} marginRight={3}>
                <b>
                  {getBetCaption(
                    String(match?.selectedOdd?.betCode),
                    match.sport,
                    betPickMap
                  )}
                </b>
              </Typography>
              {match.selectedOdd.specialValue ? (
                <Typography fontSize={12} color={"#62646D"} marginRight={3}>
                  <b>{match.selectedOdd.specialValue}</b>
                </Typography>
              ) : null}
            </Box>
            {match.selectedOdd.live && exactBet ? (
              <Typography fontSize={12} color="white" marginRight={2}>
                <b>
                  {
                    // @ts-ignore
                    exactBet.ov?.toFixed(2)
                  }
                </b>
              </Typography>
            ) : (
              <Typography fontSize={12} color="white" marginRight={2}>
                <b>
                  {match?.selectedOdd?.odd
                    ? Number(match?.selectedOdd?.odd).toFixed(2)
                    : null}
                </b>
              </Typography>
            )}

            
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default TicketFullEvidenceItem;
