import { ArrowBack } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../store/app-context";
import axios from "axios";
import { Match } from "../types/match";
import MatchItem from "../components/matches/match-item";
import FootballIcon from "../assets/icons/football-svg";
import BasketballIcon from "../assets/icons/basketball-svg";
import TennisIcon from "../assets/icons/tennis-svg";
import HandballIcon from "../assets/icons/handball-svg";
import VoleyballIcon from "../assets/icons/voleyball-svg";
import TableTennisIcon from "../assets/icons/table-tennis";
import SunkerIcon from "../assets/icons/snuker-icon";
import HockeyIcon from "../assets/icons/hockey-icon";
import BaseballIcon from "../assets/icons/baseball-icon";
import RugbiIcon from "../assets/icons/rugbi-icon";
import AntepostIcon from "../assets/icons/antepost-icon";
import GoalsIcon from "../assets/icons/goals-icon";

const OddsPage: FC = () => {
  const [oddValue, setOddValue] = useState<number>(1.75);
  const [sliderValue, setSliderValue] = useState<number>(3);
  const [sports, setSports] = useState<any[]>([]);
  const [sportId, setSportId] = useState<string>("S");
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setTimeParam, timeParam } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/zh/categories/oddrange/s?annex=0&${timeParam}`,
          {
            params: {
              toOdd: oddValue,
              mobileVersion: "2.32.10.5",
              locale: "sr",
            },
          }
        );
        setSports(response.data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSports();
  }, [oddValue, timeParam]);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/zh/oddrange/${sportId}/mob?annex=0&${timeParam}`,
          {
            params: {
              toOdd: oddValue,
              mobileVersion: "2.32.10.5",
              locale: "sr",
            },
          }
        );
        setMatches(response.data.esMatches);
        console.log("response.data.esMatches", response.data.esMatches);
        setIsLoading(false); // Nakon što su podaci učitani, postavljamo isLoading na false
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMatches();
  }, [oddValue, sportId, timeParam]);

  // console.log("sports", sports);

  const oddButtons = [
    { id: 0, name: "1.25", odd: 1.25 },
    { id: 1, name: "1.5", odd: 1.5 },
    { id: 2, name: "1.75", odd: 1.75 },
    { id: 3, name: "2", odd: 2 },
  ];

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    switch (value) {
      case 1:
        setTimeParam("hours=1");
        break;
      case 2:
        setTimeParam("hours=3");
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        const today = new Date();
        // eslint-disable-next-line no-case-declarations
        const formattedDate = `${today.getDate()}.${
          today.getMonth() + 1
        }.${today.getFullYear()}`;
        setTimeParam(`date=${formattedDate}`);
        break;
      case 4:
        setTimeParam("hours=72");
        break;
      case 5:
        setTimeParam("");
        break;
      default:
        setTimeParam("");
        break;
    }
  };

  const getSportIcon = (sportId: string) => {
    switch (sportId) {
      case "S":
        return <FootballIcon fill={"#62646D"} />;
      case "B":
        return <BasketballIcon fill={"#62646D"} />;
      case "T":
        return <TennisIcon fill={"#62646D"} />;
      case "HB":
        return <HandballIcon fill={"#62646D"} />;
      case "V":
        return <VoleyballIcon fill={"#62646D"} />;
      case "TT":
        return <TableTennisIcon fill={"#62646D"} />;
      case "SN":
        return <SunkerIcon fill={"#62646D"} />;
      case "SK":
        return <BasketballIcon fill={"#62646D"} />;
      case "H":
        return <HockeyIcon fill={"#62646D"} />;
      case "BB":
        return <BaseballIcon fill={"#62646D"} />;
      case "RL":
        return <RugbiIcon fill={"#62646D"} />;
      case "AN":
        return <AntepostIcon fill={"#62646D"} />;
      case "LG":
        return <GoalsIcon fill={"#62646D"} />;
      default:
        return <FootballIcon fill={"#62646D"} />;
    }
  };

  const title = "赔率 < 2";

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        // maxWidth: "1024px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
          maxWidth: "800px",
          mb: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography fontSize={18}>
          <b>{title}</b>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          width: "100%",
          mb: 2,
        }}
      >
        <Typography mb={1}>选择最高赔率</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
          }}
        >
          {oddButtons.map((item) => {
            return (
              <Button
                key={item.id}
                variant={oddValue === item.odd ? "contained" : "outlined"}
                onClick={() => setOddValue(item.odd)}
                sx={{
                  width: "100%",
                  m: 0.5,
                  backgroundColor: oddValue === item.odd ? "#FFC211" : "",
                  color: oddValue === item.odd ? "black" : "",
                }}
              >
                <b>{item.name}</b>
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Typography>选择时间</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            width: "88%",
          }}
        >
          <Slider
            sx={{ color: "#FFC211" }}
            defaultValue={5}
            step={1}
            min={1}
            max={5}
            value={sliderValue}
            onChange={(_event, value) => handleSliderChange(value as number)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -1,
              width: "100%",
            }}
          >
            <Typography onClick={() => handleSliderChange(1)}>1小时</Typography>
            <Typography onClick={() => handleSliderChange(2)}>3小时</Typography>
            <Typography onClick={() => handleSliderChange(3)}>今天</Typography>
            <Typography onClick={() => handleSliderChange(4)}>3天</Typography>
            <Typography onClick={() => handleSliderChange(5)}>全部</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "flex-start",
          maxWidth: "800px",
          mb: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            flexDirection: "row",
            flexWrap: "nowrap",
            minWidth: "fit-content",
            margin: 1,
          }}
          spacing={1}
        >
          {sports.map((item) => (
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} item key={item.id}>
              <IconButton
                sx={{
                  margin: 0.5,
                  backgroundColor: sportId === item.id ? "#FFC211" : null,
                }}
                onClick={() => {
                  setSportId(item.id);
                }}
              >
                <Badge
                  badgeContent={item.count}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "white",
                      color: "black",
                      height: "12px",
                      fontSize: 8,
                    },
                  }}
                  overlap="circular"
                >
                  {getSportIcon(item.id)}
                </Badge>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {matches.map((match, index) => {
            return (
              <Grid key={index} item xs={12} sm={12} md={6} lg={3}>
                <MatchItem
                  match={match}
                  sportId={sportId}
                  leagueName={match.leagueName}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default OddsPage;
