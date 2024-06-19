import { Box, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FootballIcon from "../../assets/icons/football-svg";
import BasketballIcon from "../../assets/icons/basketball-svg";
import LiveIcon from "../../assets/icons/live-svg";
import TennisIcon from "../../assets/icons/tennis-svg";
import HandballIcon from "../../assets/icons/handball-svg";
import VoleyballIcon from "../../assets/icons/voleyball-svg";
import TableTennisIcon from "../../assets/icons/table-tennis";
import HockeyIcon from "../../assets/icons/hockey-icon";
import BaseballIcon from "../../assets/icons/baseball-icon";
import WaterpoloIcon from "../../assets/icons/waterpolo-icon";
import MmaIcon from "../../assets/icons/mma-icon";
import F1Icon from "../../assets/icons/f1-icon";
import BoxIcon from "../../assets/icons/box-icon";
import RugbiIcon from "../../assets/icons/rugbi-icon";

const MainNavigation: FC<{
  sport?: string;
  setSport?: (newSport: string) => void;
}> = ({ sport, setSport }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getIconColor = (route: string): string => {
    return location.pathname === route ? "#f1b812" : "#697484";
  };

  // const getIconTextColor = (route: string): string => {
  //   return location.pathname === route ? "white" : "#697484";
  // };

  const handleSportChange = (newSport: string) => {
    setSport ? setSport(newSport) : null;
  };

  const getIconStateColor = (sport: string) => {
    switch (sport) {
      case "S":
        return "white";
      case "B":
        return "#FF5811";
      case "T":
        return "#DBFF00";
      case "H":
        return "white";
      case "HB":
        return "#DBFF00";
      case "V":
        return "#00C2FF";
      case "BB":
        return "white";
      case "W":
        return "#006CFF";
      case "FS":
        return "white";
      case "TT":
        return "#FF2828";
      case "MM":
        return "#FFC211";
      case "F1":
        return "#FF0000";
      case "BO":
        return "#00C2FF";

      default:
        return "white";
    }
  };

  return (
    <Box
      height={80}
      width="100%"
      sx={{
        overflowX: "auto",
        overflowY: "hidden", // Omogućava horizontalni scroll
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: 3,
        justifyContent: "flex-start",
        marginBottom: 4,
        borderTop: "0.5px solid #2F3B4B",
        borderBottom: "0.5px solid #2F3B4B",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
          minWidth: "fit-content",
        }}
        spacing={1}
      >
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -1.4,
              marginRight: -1.6,
            }}
          >
            <IconButton onClick={() => navigate("/live")}>
              <LiveIcon fill={getIconColor("/live")} />
            </IconButton>
            <Typography fontSize={8} sx={{ marginTop: -2 }} color="white">
              <b>直播</b>
              {/* uzivo */}
            </Typography>
          </Box>
        </Grid>
        {[
          { sport: "S", label: "足球", icon: FootballIcon },
          { sport: "B", label: "篮球", icon: BasketballIcon },
          { sport: "T", label: "网球", icon: TennisIcon },
          { sport: "H", label: "曲棍球", icon: HockeyIcon },
          { sport: "HB", label: "手球", icon: HandballIcon },
          { sport: "V", label: "排球", icon: VoleyballIcon },
          { sport: "BB", label: "棒球", icon: BaseballIcon },
          { sport: "W", label: "水球", icon: WaterpoloIcon },
          { sport: "FS", label: "室内五人制足球", icon: FootballIcon },
          { sport: "TT", label: "乒乓球", icon: TableTennisIcon },
          { sport: "MM", label: "综合格斗", icon: MmaIcon },
          { sport: "F1", label: "一级方程式", icon: F1Icon },
          { sport: "BO", label: "拳击", icon: BoxIcon },
          { sport: "RL", label: "橄榄球", icon: RugbiIcon },
        ].map((item) => (
          <Grid item key={item.sport}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                  // Postavlja širinu na auto kako bi zauzeo samo jedan red
                }}
                onClick={() => handleSportChange(item.sport)}
              >
                <item.icon
                  fill={
                    sport === item.sport ? getIconStateColor(sport) : "#697484"
                  }
                />
              </IconButton>
              <Typography fontSize={8} sx={{ marginTop: -0.2 }} color={"white"}>
                <b>{item.label}</b>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainNavigation;
