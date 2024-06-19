import { FC, useContext, useEffect, useState } from "react";
import MainNavigation from "../components/navigation/main-navigation";
import TopMatches from "../components/top-matches/top-matches";
import TimelineMatches from "../components/timeline-matches/timeline-matches";
import { Box, Button, Grow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MagicSearchIcon from "../assets/icons/magic-search";
import NavigationContext from "../store/navigation-context";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState<number>(0);

  const { sport, setSport } = useContext(NavigationContext);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, []);
  return (
    <>
      <MainNavigation sport={sport} setSport={setSport} />
      <Grow key={animationKey} in={true} {...{ timeout: 1200 }}>
        <Button
          variant="outlined"
          sx={{
            width: "90%",
            marginBottom: 2,
            textTransform: "none",
            color: "white",
            // borderColor: "#FFC211",
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            justifyContent: "flex-start",
            maxWidth: 800,
          }}
          onClick={() => navigate("/search")}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: 0.8,
              alignItems: "center",
            }}
          >
            <MagicSearchIcon fill={"white"} />
            <Typography fontSize={14} sx={{ marginLeft: 2 }}>
              Pronađi svoju igru...
            </Typography>
          </Box>
        </Button>
      </Grow>

      <TimelineMatches sportId={sport} />

      {/* {sport === "S" ? <PopTak /> : null} */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          mb: 2,
          cursor: "pointer",
        }}
        onClick={() => navigate("/league-offer/S/2294162")}
      >
        <img
          width={"100%"}
          height={"100%"}
          src={"https://ibet-365.com/content/banner-veritcal-euro.png"}
        />
      </Box>

      <TopMatches sport={sport} />

      {/* <TopLeagues sportId="S" /> */}
    </>
  );
};

export default HomePage;
