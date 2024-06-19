import { FC, useContext, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppContext from "../../store/app-context";
import { BetPickMap, BetPickGroupMap } from "../../types/bet";
import { Match, TicketMatch } from "../../types/match";
import { toast } from "react-toastify";

interface PrematchOddsProps {
  match: Match | TicketMatch;
  matchedOdds: {
    [name: string]:
      | {
          odds?: { [key: string]: number };
          code?: number;
          param?: string;
        }
      | undefined;
  };
  betPickMap: BetPickMap | object;
  sportId?: string;
  betPickGroupMap: BetPickGroupMap | object;
}

const PrematchOdds: FC<PrematchOddsProps> = ({
  match,
  matchedOdds,
  betPickMap,
  sportId,
  betPickGroupMap,
}) => {
  const { addMatchToTicket, removeMatchFromTicket, ticketMatches } =
    useContext(AppContext);

  const [search, setSearch] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearch("");
        const textField = document.getElementById("search-textfield");
        if (textField instanceof HTMLInputElement) {
          textField.value = "";
        }
      }
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const memoizedRenderAndHandleAddToTicket = useMemo(() => {
    const matchId = match?.id;

    const isAdded = (oddCode: number) => {
      return ticketMatches.some(
        (ticketMatch) =>
          ticketMatch.id === matchId &&
          ticketMatch.selectedOdd?.code === oddCode
      );
    };
    const getOrderNumberForSelection = (selection: number): number | null => {
      if (betPickGroupMap) {
        for (const [key, group] of Object.entries(betPickGroupMap)) {
          if (
            group &&
            key &&
            Array.isArray(group.tipTypes) &&
            group.tipTypes.includes(selection)
          ) {
            console.log(group.orderNumber);
            return group.id;
          }
        }
      }
      return null;
    };

    const getToastBetLabel = (label: string) => {
      // if (label.includes("%h") || label.includes("%a")) {
      const result = label.replace("$a", match.away).replace("$h", match.home);

      return result;
      // } else {
      //   return stringToDisplay;
      // }
    };

    const handleAddToTicket = (
      selection: number,
      specialValue: string | null,
      betPick: any
    ) => {
      const selectedOdd = match?.odds?.[selection];
      const betPickGroupId = getOrderNumberForSelection(selection);

      console.log("selection", selection);

      console.log(
        "getOrderNumberForSelection",
        getOrderNumberForSelection(selection)
      );

      if (!selectedOdd || !betPickGroupId) return;

      const isMatchAdded = isAdded(selection);

      const selectedOddInfo = {
        code: selection,
        odd: selectedOdd,
        specialValue: Number(specialValue),
        live: false,
        betPickCode: selection,
        betCode: selection,
        betPickGroupId,
        tipTypeCode: selection,
      };

      const convertedMatch = {
        ...match,
        selectedOdd: selectedOddInfo,
      };

      if (match && selection) {
        isMatchAdded
          ? removeMatchFromTicket(match.matchCode, selection)
          : addMatchToTicket(convertedMatch);
      }

      if (!isMatchAdded) {
        toast(getToastBetLabel(betPick.label));
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          // justifyContent: "center",
          // alignItems: "flex-start",
          flexDirection: "column",
          marginTop: 2,
          marginBottom: 12,
          width: "100%",
        }}
      >
        <TextField
          label="Pretraži svoj tip igre...(npr. Poluvreme, Dupla Šansa, Hendikep...)"
          size="small"
          color="warning"
          onChange={handleSearchChange}
          sx={{ m: 2 }}
          id="search-textfield"
        />
        {Object.entries(matchedOdds).map(([description, odds]) => {
          const hasOdds = odds?.odds && Object.keys(odds.odds).length > 0;

          if (!hasOdds) {
            return null;
          }
          setIsLoading(false);

          return (
            <Box width="100%" key={description} sx={{ margin: 0.3 }}>
              {description
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ? (
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon sx={{ color: "#FFBA33" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      backgroundColor: "#0D0D19",
                    }}
                  >
                    <Typography fontSize={12}>
                      <b>{description}</b>
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{ color: "#FFC211", marginLeft: 1 }}
                    >
                      <b>
                        {
                          // @ts-ignore
                          match.params && match.params[odds.param]
                            ? // @ts-ignore
                              match.params[odds.param]
                            : ""
                        }
                      </b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "#0D0D19",
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-evenly"
                      component="div"
                    >
                      {
                        // @ts-ignore
                        Object.entries(odds.odds).map(([key, value]) => {
                          const modifiedKey = `${key}_${sportId}`;
                          // @ts-ignore
                          const betPick = betPickMap[modifiedKey];
                          const caption =
                            // @ts-ignore
                            betPick && match.params && match.params[odds.param]
                              ? // @ts-ignore
                                `${betPick.caption} (${
                                  // @ts-ignore
                                  match.params[odds.param]
                                })`
                              : betPick
                              ? betPick.caption
                              : "";
                          const displayValue = Number(value).toFixed(2);
                          // @ts-ignore
                          const specialValue = match.params[odds.param]
                            ? // @ts-ignore
                              match.params[odds.param]
                            : null;

                          return (
                            <Grid
                              key={key}
                              item
                              xs={4}
                              sm={4}
                              md={4}
                              lg={3}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                sx={{
                                  width: "100%",
                                  borderRadius: 2,
                                  boxShadow: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  backgroundColor: isAdded(parseInt(key))
                                    ? "#FFC211"
                                    : "#121425",
                                  "&:hover": {
                                    backgroundColor: isAdded(parseInt(key))
                                      ? "#FFC211"
                                      : "#121425",
                                  },
                                  "&:active": {
                                    backgroundColor: isAdded(parseInt(key))
                                      ? "#FFC211"
                                      : "#121425",
                                  },
                                }}
                                onClick={() =>
                                  handleAddToTicket(
                                    parseInt(key),
                                    specialValue,
                                    betPick
                                  )
                                }
                                disableRipple
                              >
                                <Typography fontSize={10}>
                                  <b>{caption}</b>
                                </Typography>

                                <Typography
                                  fontSize={12}
                                  sx={{
                                    color: isAdded(parseInt(key))
                                      ? "black"
                                      : "white",
                                  }}
                                >
                                  <b>{displayValue}</b>
                                </Typography>
                              </Button>
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </Box>
          );
        })}
      </Box>
    );
  }, [
    addMatchToTicket,
    betPickGroupMap,
    betPickMap,
    match,
    matchedOdds,
    removeMatchFromTicket,
    search,
    sportId,
    ticketMatches,
  ]);

  return (
    <>
      {isLoading ? ( // Prikazujemo CircularProgress ako je isLoading true
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : (
        memoizedRenderAndHandleAddToTicket // Prikazujemo memoizedRenderAndHandleAddToTicket ako isLoading nije true
      )}
    </>
  );
};

export default PrematchOdds;
