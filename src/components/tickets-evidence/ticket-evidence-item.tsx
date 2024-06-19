import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatKickOffTime } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface TicketEvidenceItemProps {
  ticketInfo: any;
}

const TicketEvidenceItem: FC<TicketEvidenceItemProps> = ({ ticketInfo }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 0.5,
        width: "100%",
        borderBottom: "1px solid #2F3B4B",

        marginTop: 0.5,
      }}
      // onClick(() => {navigate(`user-played-ticket/${ticketInfo}`)})
      onClick={() => navigate(`/user-played-ticket/${ticketInfo.uuid}`)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography>{ticketInfo.payIn.toFixed(2)}RSD</Typography>
        <Typography fontSize={10}>{ticketInfo.code}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        {ticketInfo.status === 1 ? (
          <>
            <Typography>{ticketInfo.win.toFixed(2)}RSD</Typography>
          </>
        ) : ticketInfo.status === -1 ? null : (
          <>
            <Typography>{ticketInfo.possibleWin.toFixed(2)}RSD</Typography>
          </>
        )}
        <Typography fontSize={10}>
          {formatKickOffTime(ticketInfo.creationDate)}
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: "100%",
          backgroundColor:
            ticketInfo.status === 0
              ? "#FFC211"
              : ticketInfo.status === 1
              ? "green"
              : "red",
          width: 20,
          height: 20,
          minWidth: 20,
          minHeight: 20,
          marginRight: 1,
        }}
      ></Box>
      <ChevronRightIcon></ChevronRightIcon>
    </Box>
  );
};

export default TicketEvidenceItem;
