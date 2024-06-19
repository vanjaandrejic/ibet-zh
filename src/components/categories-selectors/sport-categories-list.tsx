import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import SportCategoriesListItem from "./sport-categories-list-item";
import { SportCategory } from "../../types/sport";
import AppContext from "../../store/app-context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface SportCategoriesListProps {
  id: string | undefined;
}

const SportCategoriesList: FC<SportCategoriesListProps> = ({ id }) => {
  const [categories, setCategories] = useState<SportCategory[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleAccordionChange =
    (panelId: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedId(isExpanded ? panelId : null);
    };
  const { timeParam } = useContext(AppContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/zh/categories/sport/${id}/g?&${
            timeParam ? timeParam : null
          }`,
          {
            params: {
              mobileVersion: "2.27.33",
              locale: "sr",
              // hours: "72",
            },
          }
        );
        setCategories(response.data.categories);

        // console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, [id, timeParam]);

  return (
    <>
      {categories.map((cat) => {
        if (!cat.name || cat.name === "") {
          return (
            <SportCategoriesListItem
              key={cat.id}
              sportId={id}
              leagueId={cat.id}
            />
          );
        } else {
          return (
            <Accordion
              key={cat.id}
              expanded={expandedId === cat.id}
              onChange={handleAccordionChange(cat.id)}
              sx={{
                backgroundColor: "#171B31",
                width: "100%",
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: "#FFC211" }} />}
                onClick={handleClick}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  backgroundColor: "#171B31",
                  width: "100%",
                }}
              >
                <Box
                  width={"100%"}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography fontSize={12}>{cat.name}</Typography>
                  <Typography fontSize={12}>{cat.count}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "#171B31",
                  width: "100%",
                }}
              >
                {expandedId === cat.id && (
                  <SportCategoriesListItem sportId={id} leagueId={cat.id} />
                )}
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </>
  );
};

export default SportCategoriesList;
