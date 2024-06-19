import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grow,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import SportCategoriesList from "../categories-selectors/sport-categories-list";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppContext from "../../store/app-context";

const TimelineMatches: FC<{ sportId: string | undefined }> = ({ sportId }) => {
  const { setTimeParam, timeParam } = useContext(AppContext);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(5); // Dodajemo stanje za vrednost slajdera
  const isDesktop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [timeParam]);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    switch (value) {
      case 1:
        setTimeParam("hours=1");
        break;
      case 2:
        setTimeParam("hours=3");
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        const today = new Date();
        // eslint-disable-next-line no-case-declarations
        const formattedDate = `${today.getDate()}.${
          today.getMonth() + 1
        }.${today.getFullYear()}`;
        setTimeParam(`date=${formattedDate}`);
        break;
      case 4:
        setTimeParam("hours=72");
        break;
      case 5:
        setTimeParam("");
        break;
      default:
        setTimeParam("");
        break;
    }
  };

  const keepSportInSpecial = () => {
    if (sportId === "SP") {
      return "S";
    } else if (sportId === "SK") {
      return "B";
    } else {
      return sportId;
    }
  };

  // const keepSportInSpecialMobile = () => {
  //   if (sportId === "SP") {
  //     return "S";
  //   } else if (sportId === "SK") {
  //     return "B";
  //   } else {
  //     return sportId;
  //   }
  // };

  return (
    <Box sx={{ width: "88%", marginBottom: 2 }}>
      <Slider
        sx={{ color: "#FFC211" }}
        defaultValue={5}
        step={1}
        min={1}
        max={5}
        value={sliderValue}
        onChange={(_event, value) => handleSliderChange(value as number)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -1,
        }}
      >
        <Typography onClick={() => handleSliderChange(1)}>1h</Typography>
        <Typography onClick={() => handleSliderChange(2)}>3h</Typography>
        <Typography onClick={() => handleSliderChange(3)}>Danas</Typography>
        <Typography onClick={() => handleSliderChange(4)}>3d</Typography>
        <Typography onClick={() => handleSliderChange(5)}>Sve</Typography>
      </Box>
      {isDesktop ? (
        <Box mt={2}>
          <SportCategoriesList id={keepSportInSpecial()} />
          {sportId === "S" ||
          sportId === "B" ||
          sportId === "SP" ||
          sportId === "SK" ? (
            <>
              <Box sx={{ mt: 1 }}>
                <Accordion sx={{ marginTop: 3, width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon sx={{ color: "#FFC211" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ backgroundColor: "#0D0D19" }}
                  >
                    Specijal
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#0D0D19", width: "100%" }}
                  >
                    <SportCategoriesList
                      id={sportId === "B" || sportId === "SK" ? "SK" : "SP"}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
              {sportId === "S" ? (
                <>
                  <Box>
                    <Accordion sx={{ marginTop: 3, width: "100%" }}>
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownIcon sx={{ color: "#FFC211" }} />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ backgroundColor: "#0D0D19" }}
                      >
                        Golovi po ligama
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ backgroundColor: "#0D0D19", width: "100%" }}
                      >
                        <SportCategoriesList id={"LG"} />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box>
                    <Accordion sx={{ marginTop: 3, width: "100%" }}>
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownIcon sx={{ color: "#FFC211" }} />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ backgroundColor: "#0D0D19" }}
                      >
                        Antepost
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ backgroundColor: "#0D0D19", width: "100%" }}
                      >
                        <SportCategoriesList id={"AN"} />
                      </AccordionDetails>
                    </Accordion>
                  </Box>{" "}
                </>
              ) : null}
            </>
          ) : null}
        </Box>
      ) : (
        <>
          <Grow key={animationKey} in={true} {...{ timeout: 800 }}>
            <Box>
              <Accordion sx={{ marginTop: 3, width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: "#FFC211" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ backgroundColor: "#0D0D19" }}
                >
                  Kompletna Ponuda
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#0D0D19", width: "100%" }}
                >
                  <SportCategoriesList id={sportId} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grow>
          {/* <Grow key={animationKey} in={true} {...{ timeout: 800 }}> */}
          {sportId === "S" || sportId === "B" ? (
            <Box>
              <Accordion sx={{ marginTop: 3, width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: "#FFC211" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ backgroundColor: "#0D0D19" }}
                >
                  Specijal
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#0D0D19", width: "100%" }}
                >
                  <SportCategoriesList id={sportId === "S" ? "SP" : "SK"} />
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : null}
          {/* </Grow> */}
        </>
      )}
    </Box>
  );
};

export default TimelineMatches;
