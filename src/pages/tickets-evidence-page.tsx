import { Box, Button, IconButton, Slider, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import getTicketsInfo from "../utils/api/tickets-info/get-tickets-info";
import TicketEvidenceItem from "../components/tickets-evidence/ticket-evidence-item";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { TicketStatus } from "./tickets-evidence-page-desktop";

const TicketsEvidencePage: FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [timeParam, setTimeParam] = useState<string>("today");
  const [infoTickets, setInfoTickets] = useState<any[]>([]);
  const [ticketStatusFetch, setTicketStatusFetch] = useState<TicketStatus>({
    key: null,
    value: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTicketsInfo(
          timeParam,
          "1",
          ticketStatusFetch
        );

        setInfoTickets(response.tickets);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [ticketStatusFetch, timeParam]);

  // console.log(ticketStatusFetch);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    switch (value) {
      case 1:
        setTimeParam("today");
        break;
      case 2:
        setTimeParam("yesterday");
        break;
      case 3:
        setTimeParam("rest");
        break;

      default:
        setTimeParam("today");
        break;
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography fontSize={16} ml={2}>
          <b>票据</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {[
          {
            key: null,
            value: null,
            label: "所有",
            bcgColor: "#121425",
            textColor: "white",
          },
          {
            key: "won",
            value: "WON",
            label: "盈利",
            bcgColor: "#37E51B",
            textColor: "black",
          },
          {
            key: "loss",
            value: "LOSS",
            label: "亏损",
            bcgColor: "red",
            textColor: "white",
          },
          {
            key: "active",
            value: "active",
            label: "未结",
            bcgColor: "#FFC211",
            textColor: "black",
          },
        ].map((button, index) => (
          <Button
            key={index}
            variant={"contained"}
            sx={{
              width: "100%",
              m: 0.5,
              // alignItems: "flex-start",
              backgroundColor:
                ticketStatusFetch.value === button.value
                  ? button.bcgColor
                  : "#121425",
              "&:hover": {
                backgroundColor:
                  ticketStatusFetch.value === button.value
                    ? button.bcgColor
                    : "#121425",
              },
              "&:active": {
                backgroundColor:
                  ticketStatusFetch.value === button.value
                    ? button.bcgColor
                    : "#121425",
              },
            }}
            onClick={() =>
              setTicketStatusFetch({ key: button.key, value: button.value })
            }
          >
            <Typography
              fontSize={12}
              color={
                ticketStatusFetch.value === button.value
                  ? button.textColor
                  : "white"
              }
              textTransform={"none"}
              textAlign={"center"}
            >
              <b>{button.label}</b>
            </Typography>
          </Button>
        ))}
      </Box>
      <Slider
        sx={{ color: "#FFC211" }}
        defaultValue={1}
        step={1}
        min={1}
        max={3}
        value={sliderValue}
        onChange={(_event, value) => handleSliderChange(value as number)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -1.4,
          width: "100%",
          mb: 1,
        }}
      >
        <Typography fontSize={12} onClick={() => handleSliderChange(1)}>
          今天
        </Typography>
        <Typography fontSize={12} onClick={() => handleSliderChange(2)}>
          昨天
        </Typography>
        <Typography fontSize={12} onClick={() => handleSliderChange(3)}>
          月
        </Typography>
      </Box>
      {infoTickets.map((ticket) => {
        return <TicketEvidenceItem ticketInfo={ticket} key={ticket.code} />;
      })}
    </Box>
  );
};

export default TicketsEvidencePage;
