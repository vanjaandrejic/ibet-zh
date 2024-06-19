import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grow,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

// Podaci o takmičenjima
const competitions = [
  {
    id: 2228014,
    country: "/countries/srbicon.png",
    name: "SuperLiga",
    image: "/comp-icons/superliga.jpg",
  },
  {
    id: 2222612,
    country: "/countries/engicon.png",
    name: "Premijer Liga",
    image: "https://ibet-365.com/content/comp-icons/premier.jpg",
  },
  {
    id: 2222601,
    country: "/countries/spainicon.png",
    name: "La Liga",
    image: "https://ibet-365.com/content/comp-icons/la-liga.jpg",
  },
  {
    id: 2222846,
    country: "/countries/nemicon.png",
    name: "Bundesliga",
    image: "https://ibet-365.com/content/comp-icons/bundesliga.jpg",
  },
  {
    id: 2222590,
    country: "/countries/itaicon.png",
    name: "Serija A",
    image: "https://ibet-365.com/content/comp-icons/italija.jpg",
  },
  {
    id: 2222616,
    country: "/countries/fraicon.png",
    name: "Liga 1",
    image: "https://ibet-365.com/content/comp-icons/liga-1.jpg",
  },
  // Dodajte više takmičenja po potrebi
];

const PopTak: FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <Grow key={animationKey} in={true} {...{ timeout: 1200 }}>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        sx={{
          width: "90%",
          marginBottom: 2,
          marginTop: 1,
        }}
        spacing={1}
      >
        {isDesktop ? null : (
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <LocalFireDepartmentIcon sx={{ color: "orange", marginRight: 1 }} />
            <Typography fontSize={18}>Popularna Takmičenja</Typography>
          </Box>
        )}

        <Grid container item xs={12} spacing={1}>
          {competitions.map((competition) => (
            <Grid item key={competition.id} xs={4} sm={4} md={2} lg={2}>
              <Card sx={{ borderRadius: 2 }}>
                <CardActionArea
                  onClick={() => navigate(`/league-offer/S/${competition.id}`)}
                >
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingLeft: 0.5,
                      paddingRight: 0.5,
                    }}
                  >
                    <img height={16} src={competition.country} alt="country" />
                    <Typography
                      fontSize={
                        competition.name === "Premijer Liga" && !isDesktop
                          ? 9
                          : 10
                      }
                      color="black"
                    >
                      <b>{competition.name}</b>
                    </Typography>
                    <PlayArrowIcon sx={{ color: "black", width: 14 }} />
                  </Box>
                  <CardMedia
                    component="img"
                    image={competition.image}
                    alt={competition.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grow>
  );
};

export default PopTak;
