import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportCategoriesList from "./sport-categories-list";
import { SportCategory } from "../../types/sport";
import AppContext from "../../store/app-context";

const SportCategories: FC = () => {
  const [sports, setSports] = useState<SportCategory[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { timeParam } = useContext(AppContext);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/restapi/offer/zh/categories/s?&${
            timeParam ? timeParam : null
          }`,
          {
            params: {
              mobileVersion: "2.27.33",
              locale: "sr",
            },
          }
        );
        setSports(response.data.categories);

        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSports();
  }, [timeParam]);

  const handleAccordionChange =
    (panelId: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedId(isExpanded ? panelId : null);
    };

  return (
    <>
      {sports.map((sport) => (
        <Box key={sport.id}>
          <Accordion
            expanded={expandedId === sport.id}
            onChange={handleAccordionChange(sport.id)}
            sx={{ width: "100%", backgroundColor: "#0D0D19" }}
          >
            <AccordionSummary
              onClick={handleClick}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${sport.id}-content`}
              id={`panel-${sport.id}-header`}
              sx={{ backgroundColor: "#0D0D19" }}
            >
              <Box
                width={"100%"}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography fontSize={12}>{sport.name}</Typography>
                <Typography fontSize={12}>{sport.count}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#0D0D19" }}>
              {expandedId === sport.id && <SportCategoriesList id={sport.id} />}
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </>
  );
};

export default SportCategories;
