import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Badge,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import AppContext from "../store/app-context";
import { Match } from "../types/match";
import axios from "axios";
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
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LastMinutePage: FC = () => {
  const [sports, setSports] = useState<any[]>([]);
  const [sportId, setSportId] = useState<string>("S");
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState<string>("");

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

  // const [sliderValue, setSliderValue] = useState<number>(3);

  // const [hoursParam, setHoursParam] = useState<string>("");

  const today = new Date();
  const formattedDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;

  // Function to get the date for a specific number of days in the future
  const getFutureDate = (daysToAdd: number) => {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysToAdd);
    return `${futureDate.getDate()}.${
      futureDate.getMonth() + 1
    }.${futureDate.getFullYear()}`;
  };

  const tomorrowDate = getFutureDate(1);
  const dayAfterTomorrowDate = getFutureDate(2);

  const timeButtons = [
    { id: 0, title: "Danas", value: `date=${formattedDate}` },
    { id: 1, title: "Sutra", value: `date=${tomorrowDate}` },
    {
      id: 2,
      title: `${dayAfterTomorrowDate.split(".")[0]}.${
        dayAfterTomorrowDate.split(".")[1]
      }`,
      value: `date=${dayAfterTomorrowDate}`,
    },
  ];

  const { setTimeParam, timeParam } = useContext(AppContext);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/sr/categories/oddrange/s?annex=0&${timeParam}`,
          {
            params: {
              // toOdd: oddValue,
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
  }, [timeParam]);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/sr/oddrange/${sportId}/mob?annex=0&${timeParam}`,
          {
            params: {
              // toOdd: oddValue,
              mobileVersion: "2.32.10.5",
              locale: "sr",
            },
          }
        );
        setMatches(response.data.esMatches);
        console.log("response.data.esMatches", response.data.esMatches);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMatches();
  }, [sportId, timeParam]);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        maxWidth: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        Vremenska Ponuda
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {timeButtons.map((item) => {
          return (
            <Button
              key={item.id}
              variant="outlined"
              onClick={() => {
                setTimeParam(item.value);
                setDay(item.value);
              }}
              sx={{
                width: "100%",
                m: 0.5,
                backgroundColor: day === item.value ? "#FFC211" : "",
                color: day === item.value ? "black" : "white",
                "&:hover": {
                  backgroundColor: day === item.value ? "#FFC211" : "",
                },
                "&:active": {
                  backgroundColor: day === item.value ? "#FFC211" : "",
                },
              }}
            >
              <b>{item.title}</b>
            </Button>
          );
        })}
      </Box>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "flex-start",
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
            width: "100%",
            justifyContent: "space-evenly",
          }}
          spacing={1}
        >
          {sports.map((item) => (
            <Grid item key={item.id}>
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

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Typography>14:00</Typography>
        <Slider
          sx={{ color: "#FFC211" }}
          defaultValue={5}
          step={1}
          min={1}
          max={24}
          value={sliderValue}
          onChange={(_event, value) => handleSliderChange(value as number)}
        />
        <Typography>23:59</Typography>
      </Box> */}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          marginTop={1}
          container
          style={{
            overflowY: "auto",
          }}
        >
          {matches.map((match, index) => {
            return (
              <Grid key={index} item xs={12} sm={12} lg={6}>
                <MatchItem
                  match={match}
                  sportId={match.sport}
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

export default LastMinutePage;
