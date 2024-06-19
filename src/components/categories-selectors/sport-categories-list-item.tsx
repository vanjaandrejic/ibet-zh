import { AccordionSummary, colors, Box, Typography } from "@mui/material";
import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SportCategory } from "../../types/sport";
import AppContext from "../../store/app-context";

const linkStyle = {
  textDecoration: "none",
  color: colors.yellow[700],
  width: "100%",
};

interface SportCategoriesListItemProps {
  sportId?: string;
  leagueId: string;
}
const SportCategoriesListItem: FC<SportCategoriesListItemProps> = ({
  sportId,
  leagueId,
}) => {
  const [sportCatLeagues, setSportCatLeagues] = useState<SportCategory[]>([]);

  const { timeParam } = useContext(AppContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/zh/categories/sport/${sportId}/group/${leagueId}/l?&${
            timeParam ? timeParam : null
          }`,
          {
            params: {
              mobileVersion: "2.27.33",
              locale: "sr",
            },
          }
        );
        setSportCatLeagues(response.data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, [leagueId, sportId, timeParam]);

  return (
    <>
      {sportCatLeagues.map((league) => (
        <AccordionSummary
          key={league.id}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            width: "100%",
          }}
        >
          <Link style={linkStyle} to={`/league-offer/${sportId}/${league.id}`}>
            <Box
              width={"100%"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={12} color={"white"}>
                {league.name}
              </Typography>

              <Typography fontSize={12} color="white">
                {league.count}
              </Typography>
            </Box>
          </Link>
        </AccordionSummary>
      ))}
    </>
  );
};

export default SportCategoriesListItem;
