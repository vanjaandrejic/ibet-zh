import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { formatKickOffTime } from "../../utils/common";
import { useNavigate } from "react-router-dom";

interface TicketEvidenceItemProps {
  ticketInfo: any;
}

const TicketEvidenceItemDesktop: FC<TicketEvidenceItemProps> = ({
  ticketInfo,
}) => {
  const navigate = useNavigate();

  // console.log("ticketInfo", ticketInfo);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0.5,
        width: "100%",
        borderBottom: "1px solid gray",
        marginTop: 0.5,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/user-played-ticket/${ticketInfo.uuid}`)}
    >
      <Box sx={{ width: "14.28%" }}>
        <Typography
          sx={{ flexBasis: "1%", flexGrow: 1, flexShrink: 1 }}
          fontSize={10}
        >
          {ticketInfo.code}
        </Typography>
      </Box>

      <Box sx={{ width: "14.28%" }}>
        <Typography
          sx={{ flexBasis: "0%", flexGrow: 1, flexShrink: 1 }}
          fontSize={14}
        >
          {formatKickOffTime(ticketInfo.creationDate)}
        </Typography>
      </Box>

      <Box sx={{ width: "14.28%" }}>
        <Typography
          fontSize={14}
          sx={{ flexBasis: "0%", flexGrow: 1, flexShrink: 1 }}
        >
          {ticketInfo.payIn.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ width: "14.28%" }}>
        <Typography
          fontSize={14}
          sx={{ flexBasis: "0%", flexGrow: 1, flexShrink: 1 }}
        >
          {ticketInfo.possibleWin.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ width: "14.28%" }}>
        <Typography
          fontSize={14}
          sx={{ flexBasis: "0%", flexGrow: 1, flexShrink: 1 }}
        >
          {ticketInfo.win.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "14.28%",
        }}
      >
        <Box
          sx={{
            borderRadius: "100%",
            backgroundColor:
              ticketInfo.status === 0
                ? "#FFC211"
                : ticketInfo.status === 1
                ? "green"
                : "red",
            width: 12,
            height: 12,
            minWidth: 12,
            minHeight: 12,
          }}
        ></Box>
        <Typography fontSize={14} sx={{ ml: 1 }}>
          {ticketInfo.status === 0
            ? "U igri"
            : ticketInfo.status === 1
            ? "Dobitan"
            : "Gubitan"}
        </Typography>
      </Box>
      <Box sx={{ width: "14.28%" }}>
        <Typography
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            ml: 1,

            display: "flex",
            // justifyContent: "flex-end",
          }}
        >
          {ticketInfo.numOfMatches}
        </Typography>
      </Box>
    </Box>
  );
};

export default TicketEvidenceItemDesktop;
