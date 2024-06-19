import { Badge, IconButton } from "@mui/material";
import { LiveSports } from "../../types/live/live";
import FootballIcon from "../../assets/icons/football-svg";
import BasketballIcon from "../../assets/icons/basketball-svg";
import TennisIcon from "../../assets/icons/tennis-svg";
import HandballIcon from "../../assets/icons/handball-svg";
import VoleyballIcon from "../../assets/icons/voleyball-svg";
import TableTennisIcon from "../../assets/icons/table-tennis";
import SunkerIcon from "../../assets/icons/snuker-icon";
import HockeyIcon from "../../assets/icons/hockey-icon";
import BaseballIcon from "../../assets/icons/baseball-icon";
import RugbiIcon from "../../assets/icons/rugbi-icon";
import AntepostIcon from "../../assets/icons/antepost-icon";
import GoalsIcon from "../../assets/icons/goals-icon";

interface LiveMatchesNavigationProps {
  liveSportItem: LiveSports;
  sportToFilter: string | null;
  handleButtonClick?: (sport: string | null) => void;
}

const LiveMatchesNavigation: React.FC<LiveMatchesNavigationProps> = ({
  liveSportItem,
  sportToFilter,
  handleButtonClick,
}) => {
  // console.log(liveSportItem);

  const getSportIcon = (sportId: string) => {
    switch (sportId) {
      case "S":
        return (
          <FootballIcon
            fill={sportToFilter === liveSportItem.sport ? "white" : "#62646D"}
          />
        );
      case "B":
        return (
          <BasketballIcon
            fill={sportToFilter === liveSportItem.sport ? "#FF5811" : "#62646D"}
          />
        );
      case "T":
        return (
          <TennisIcon
            fill={sportToFilter === liveSportItem.sport ? "#DBFF00" : "#62646D"}
          />
        );
      case "HB":
        return (
          <HandballIcon
            fill={sportToFilter === liveSportItem.sport ? "#DBFF00" : "#62646D"}
          />
        );
      case "V":
        return (
          <VoleyballIcon
            fill={sportToFilter === liveSportItem.sport ? "#00C2FF" : "#62646D"}
          />
        );
      case "TT":
        return (
          <TableTennisIcon
            fill={sportToFilter === liveSportItem.sport ? "#FF2828" : "#62646D"}
          />
        );
      case "SN":
        return (
          <SunkerIcon
            fill={sportToFilter === liveSportItem.sport ? "white" : "#62646D"}
          />
        );
      case "SK":
        return (
          <BasketballIcon
            fill={sportToFilter === liveSportItem.sport ? "#FF5811" : "#62646D"}
          />
        );
      case "H":
        return (
          <HockeyIcon
            fill={sportToFilter === liveSportItem.sport ? "white" : "#62646D"}
          />
        );
      case "BB":
        return <BaseballIcon fill={"#62646D"} />;
      case "RL":
        return (
          <RugbiIcon
            fill={sportToFilter === liveSportItem.sport ? "#FFC211" : "#62646D"}
          />
        );
      case "AN":
        return (
          <AntepostIcon
            fill={sportToFilter === liveSportItem.sport ? "#FFC211" : "#62646D"}
          />
        );
      case "LG":
        return (
          <GoalsIcon
            fill={sportToFilter === liveSportItem.sport ? "#FFC211" : "#62646D"}
          />
        );
      default:
        return (
          <FootballIcon
            fill={sportToFilter === liveSportItem.sport ? "#FFC211" : "#62646D"}
          />
        );
    }
  };

  return (
    <>
      <IconButton
        key={liveSportItem.sport}
        sx={{
          margin: 0.5,
          // backgroundColor:
          //   sportToFilter === liveSportItem.sport ? "yellow" : null,
        }}
        onClick={() =>
          handleButtonClick && handleButtonClick(liveSportItem?.sport)
        }
      >
        <Badge
          badgeContent={liveSportItem.matchsCount}
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
          {getSportIcon(liveSportItem.sport)}
        </Badge>
        {/* <Typography fontSize={10} sx={{ marginTop: -0.2 }} color={"white"}>
          <b>{liveSportItem.sport}</b>
        </Typography> */}
      </IconButton>
    </>
  );
};

export default LiveMatchesNavigation;
