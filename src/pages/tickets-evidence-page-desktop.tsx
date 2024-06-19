import { Box, Button, Typography, styled } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import getTicketsInfo from "../utils/api/tickets-info/get-tickets-info";
import TicketEvidenceItemDesktop from "../components/tickets-evidence/ticket-evidence-item-desktop";
import CasinoDesktopHomeNavigation from "../components/casino/casino-desktop-home-navigation";
import NavigationContext from "../store/navigation-context";
import { useNavigate } from "react-router-dom";
// import { ArrowBack } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

type GradientProps = {
  gradientColors: string[];
};

const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

export interface TicketStatus {
  key: string | null;
  value: string | null;
}

const TicketsEvidencePageDesktop: FC = () => {
  //   const [sliderValue, setSliderValue] = useState<number>(1);
  //   const [timeParam, setTimeParam] = useState<string>("today");
  const [infoTickets, setInfoTickets] = useState<any[]>([]);
  const [ticketStatusFetch, setTicketStatusFetch] = useState<TicketStatus>({
    key: null,
    value: null,
  });

  const { accountUserName, user } = useContext(NavigationContext);

  const navigate = useNavigate();

  const borderRadius = 4;
  const RoundGradientBox = styled(
    Box,
    options
  )<GradientProps>(({ gradientColors }) => ({
    position: "relative",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    borderRadius,
    width: "70%",
    backgroundColor: "#0D0D17",
    padding: "0.4%",

    "&:after": {
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: `linear-gradient(to left, ${gradientColors.join(",")})`,
      content: '""',
      zIndex: -1,
      borderRadius,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTicketsInfo("rest", "1", ticketStatusFetch);

        // svi - bez won
        // gubitni - won: LOSS
        // active: active

        setInfoTickets(response.tickets);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [ticketStatusFetch]);

  //   const handleSliderChange = (value: number) => {
  //     setSliderValue(value);
  //     switch (value) {
  //       case 1:
  //         setTimeParam("today");
  //         break;
  //       case 2:
  //         setTimeParam("yesterday");
  //         break;
  //       case 3:
  //         setTimeParam("rest");
  //         break;

  //       default:
  //         setTimeParam("today");
  //         break;
  //     }
  //   };

  //   const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <CasinoDesktopHomeNavigation width="26%" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "22%",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          width: "80%",
        }}
      >
        <RoundGradientBox
          gradientColors={["#08080F", "#171B31"]}
          sx={{
            width: "88%",
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {[
            { pathValue: "/user-played-tickets", label: "已玩票据" },
            { pathValue: "/user-transactions", label: "交易记录" },
            { pathValue: "/payment-card", label: "存款" },
            { pathValue: "/payment-card", label: "提款到银行账户" },
            { pathValue: "/payment-card", label: "在支付点提款" },
            { pathValue: "/change-password", label: "修改密码" },
            {
              pathValue: "/user-identitiy-verification",
              label: "身份确认",
            },
          ].map((button, index) => (
            <Button
              key={index}
              sx={
                {
                  // width: 100,
                  // height: 30,
                  // minHeight: 30,
                  // backgroundColor:
                  //   activeButton === button.sortValue
                  //     ? "#f1b812 !important"
                  //     : "transparent !important",
                  // color: activeButton === button.sortValue ? "#FFC211" : "white",
                }
              }
              onClick={() => navigate(button.pathValue)}
            >
              {/* {activeButton === button.sortValue ? (
                <Typography
                  fontSize={12}
                  color={
                    activeButton === button.sortValue ? "#FFC211" : "white"
                  }
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  <b>{button.label}</b>
                </Typography>
              ) : (
                <Typography
                  fontSize={12}
                  color={
                    activeButton === button.sortValue ? "#FFC211" : "white"
                  }
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  {button.label}
                </Typography>
              )} */}
              <Typography
                fontSize={12}
                color={
                  location.pathname === button.pathValue ? "#FFC211" : "white"
                }
                textTransform={"none"}
                textAlign={"center"}
              >
                <b>{button.label}</b>
              </Typography>
            </Button>
          ))}
        </RoundGradientBox>
        {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography fontSize={16} ml={2}>
          <b>Tiketi</b>
        </Typography>
      </Box> */}
        {/* <Slider
        sx={{ color: "#FFC211" }}
        defaultValue={1}
        step={1}
        min={1}
        max={3}
        value={sliderValue}
        onChange={(_event, value) => handleSliderChange(value as number)}
      /> */}
        {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -1,
          width: "100%",
        }}
      >
        <Typography onClick={() => handleSliderChange(1)}>Danas</Typography>
        <Typography onClick={() => handleSliderChange(2)}>Juče</Typography>
        <Typography onClick={() => handleSliderChange(3)}>Mesec</Typography>
      </Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            //   justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <RoundGradientBox
            gradientColors={["#08080F", "#171B31"]}
            sx={{
              width: "20%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[
              { key: null, value: null, label: "所有" },
              { key: "won", value: "WON", label: "盈利" },
              { key: "loss", value: "LOSS", label: "亏损" },
              { key: "active", value: "active", label: "未结" },
            ].map((button, index) => (
              <Button
                key={index}
                sx={{
                  width: "100%",
                  alignItems: "flex-start",
                }}
                onClick={() =>
                  setTicketStatusFetch({ key: button.key, value: button.value })
                }
              >
                <Typography
                  fontSize={12}
                  color={
                    ticketStatusFetch.value === button.value
                      ? "#FFC211"
                      : "white"
                  }
                  textTransform={"none"}
                  textAlign={"center"}
                >
                  <b>{button.label}</b>
                </Typography>
              </Button>
            ))}
          </RoundGradientBox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              m: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: 40,
                borderBottom: "1px solid #FFC211",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>票据号码</Typography>
              </Box>
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>日期/时间</Typography>
              </Box>
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>支付</Typography>
              </Box>
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>可能赢得</Typography>
              </Box>

              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>奖金</Typography>
              </Box>
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>票据状态</Typography>
              </Box>
              <Box sx={{ width: "14.28%" }}>
                <Typography fontSize={12}>配对数量</Typography>
              </Box>
            </Box>
            {infoTickets
              ? infoTickets.map((ticket) => {
                  return (
                    <TicketEvidenceItemDesktop
                      ticketInfo={ticket}
                      key={ticket.code}
                    />
                  );
                })
              : null}
          </Box>

          <RoundGradientBox
            gradientColors={["#171B31", "#08080F"]}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={14}>余额</Typography>
              <Typography fontSize={14}>
                <b>{user?.balance?.toFixed(2)} RSD</b>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={12}>
                <b>{accountUserName}</b>
              </Typography>
              <Typography fontSize={14}>ID {user?.id}</Typography>
            </Box>
          </RoundGradientBox>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketsEvidencePageDesktop;
