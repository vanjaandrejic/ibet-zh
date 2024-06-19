import { FC, useContext } from "react";
import MainNavigation from "../components/navigation/main-navigation";
import TopMatches from "../components/top-matches/top-matches";
import TimelineMatches from "../components/timeline-matches/timeline-matches";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SwitchBetButton from "../components/navigation/switch-bet-button";
import NavigationContext from "../store/navigation-context";

const HomePageDesktop: FC = () => {
  // const [sport, setSport] = useState<string>("S");
  const { sport, setSport } = useContext(NavigationContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setAnimationKey((prevKey) => prevKey + 1);
  // }, []);

  return (
    <>
      <MainNavigation sport={sport} setSport={setSport} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start", // Postavljamo na vrh
        }}
      >
        <Box
          sx={{
            width: "24%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SwitchBetButton />
          <TimelineMatches sportId={sport} />
        </Box>

        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* {sport === "S" ? <PopTak /> : null} */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "90%",
              mb: 4,
              cursor: "pointer",
            }}
            onClick={() => navigate("/league-offer/S/2294162")}
          >
            <img
              width={"100%"}
              height={"100%"}
              src={"https://ibet-365.com/content/banner-euro.png"}
            />
          </Box>

          <TopMatches sport={sport} />
        </Box>
      </Box>
    </>
  );
};

export default HomePageDesktop;
