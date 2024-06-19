import { useState, useEffect } from "react";
import FootballIcon from "../assets/icons/football-svg";
import GoalsIcon from "../assets/icons/goals-icon";
import AntepostIcon from "../assets/icons/antepost-icon";
import RugbiIcon from "../assets/icons/rugbi-icon";
import BaseballIcon from "../assets/icons/baseball-icon";
import HockeyIcon from "../assets/icons/hockey-icon";
import BasketballIcon from "../assets/icons/basketball-svg";
import SunkerIcon from "../assets/icons/snuker-icon";
import TableTennisIcon from "../assets/icons/table-tennis";
import VoleyballIcon from "../assets/icons/voleyball-svg";
import HandballIcon from "../assets/icons/handball-svg";
import TennisIcon from "../assets/icons/tennis-svg";

const useSportIcon = (sportId?: string | null) => {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    switch (sportId) {
      case "S":
        setIcon(
          <FootballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "B":
        setIcon(
          <BasketballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "T":
        setIcon(
          <TennisIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "HB":
        setIcon(
          <HandballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "V":
        setIcon(
          <VoleyballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "TT":
        setIcon(
          <TableTennisIcon
            fill={"#62646D"}
            width={"1.2rem"}
            height={"1.2rem"}
          />
        );
        break;
      case "SN":
        setIcon(
          <SunkerIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "SK":
        setIcon(
          <BasketballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "H":
        setIcon(
          <HockeyIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "BB":
        setIcon(
          <BaseballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "RL":
        setIcon(
          <RugbiIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "AN":
        setIcon(
          <AntepostIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      case "LG":
        setIcon(
          <GoalsIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
        break;
      default:
        setIcon(
          <FootballIcon fill={"#62646D"} width={"1.2rem"} height={"1.2rem"} />
        );
    }
  }, [sportId]);

  return icon;
};

export default useSportIcon;
