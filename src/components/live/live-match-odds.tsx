import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import { BetPickMap } from "../../types/bet";
import AppContext from "../../store/app-context";
import BetDataContext from "../../store/bet-data-context";
import LiveDataContext from "../../store/live-data-context";
import { LiveHeader } from "../../types/live/live-message";
import { TicketMatch } from "../../types/match";
import { LiveBets, LiveHeaders, LiveResults } from "../../types/live/live";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LiveMatchBanner from "./live-match-banner";
import { toast } from "react-toastify";

interface Props {
  matchedOdds: {
    [name: string]: {
      odds: { [key: string]: number };
      code: number;
    };
  };
  betPickMap: BetPickMap | object;
  s: string | undefined;
  mc: string | undefined;
  exactBets: LiveBets[];
}

const RenderOdds: React.FC<Props> = ({
  matchedOdds,
  betPickMap,
  s,
  mc,
  exactBets,
}) => {
  const [match, setMatch] = useState<LiveHeaders | undefined>({} as LiveHeader);
  const [result, setResult] = useState<LiveResults | undefined>(
    {} as LiveResults
  );

  const [handicaps, setHandicaps] = useState<object>({});

  const [search, setSearch] = useState<string>("");

  const { state } = useContext(LiveDataContext);

  const { addMatchToTicket, removeMatchFromTicket, ticketMatches } =
    useContext(AppContext);
  const { betPickGroupMap } = useContext(BetDataContext);

  useEffect(() => {
    const findMatch = () => {
      if (mc) {
        const match = state.liveHeaders.find(
          (item) => item.mc === parseInt(mc)
        );
        setMatch(match);
      } else {
        return;
      }
    };

    findMatch();
  }, [match, mc, state.liveHeaders]);

  // console.log("exactBets", exactBets);

  useEffect(() => {
    const handicapsHelper = {};
    exactBets.forEach((element) => {
      const omKeys = Object.keys(element.om); // Dobijamo ključeve iz om objekta

      omKeys.forEach((key) => {
        if (element.sv) {
          // Ako postoji svojstvo sv
          // @ts-ignore
          handicapsHelper[key] = element.sv; // Dodajemo sv kao vrednost novog objekta
        }
      });
    });

    setHandicaps(handicapsHelper);
  }, [exactBets]);

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

  useEffect(() => {
    const matchingResult = state.liveResults.find(
      (result: LiveResults) => result.mi === match?.id
    );
    setResult(matchingResult);
  }, [match?.id, result, state.liveResults]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const renderOdds = useMemo(() => {
    const changeSelectedButtonColor = (oddCode: number) => {
      return ticketMatches.some(
        (ticketMatch) =>
          ticketMatch.id === match?.id &&
          ticketMatch.selectedOdd?.code === oddCode
      )
        ? "#FFC211"
        : "#121425";
    };

    const changeSelectedOddColor = (oddCode: number) => {
      return ticketMatches.some(
        (ticketMatch) =>
          ticketMatch.id === match?.id &&
          ticketMatch.selectedOdd?.code === oddCode
      )
        ? "black"
        : "white";
    };

    const getToastBetLabel = (label: string) => {
      // if (label.includes("%h") || label.includes("%a")) {
      // @ts-ignore
      const result = label.replace("$a", match?.a).replace("$h", match?.h);

      return result;
      // } else {
      //   return stringToDisplay;
      // }
    };

    const handleAddToTicket = (
      selection: number,
      value?: number,
      bpc?: number,
      sv?: number | null,
      betPick?: object
    ) => {
      const getOrderNumberForSelection = (selection: number): number | null => {
        if (betPickGroupMap) {
          for (const [key, group] of Object.entries(betPickGroupMap)) {
            if (
              group &&
              key &&
              Array.isArray(group.tipTypes) &&
              group.tipTypes.includes(selection)
            ) {
              return group.orderNumber;
            }
          }
        }
        return null;
      };

      const isAdded = (oddCode: number) => {
        return ticketMatches.some(
          (ticketMatch) =>
            ticketMatch.id === match?.id &&
            ticketMatch.selectedOdd?.code === oddCode
        );
      };

      const betPickGroupId = selection
        ? getOrderNumberForSelection(selection)
        : null;
      if (!betPickGroupId) {
        console.error("Bet pick group ID not found for selection:", selection);
        return;
      }

      const selectedOddInfo = {
        code: selection,
        // @ts-ignore
        odd: value?.odd,
        specialValue: sv,
        live: true,
        betPickCode: bpc,
        betCode: selection,
        betPickGroupId: betPickGroupId,
        tipTypeCode: selection,
      };

      const convertedMatch: TicketMatch = {
        id: match ? match.id : 0, // Podrazumevana vrednost za id
        matchCode: match ? match.mc : 0, // Podrazumevana vrednost za matchCode
        home: match?.h || "", // Podrazumevana vrednost za home
        away: match?.a || "", // Podrazumevana vrednost za away
        kickOffTime: match ? match.kot : 0, // Podrazumevana vrednost za kickOffTime
        blocked: match ? match.bd : false, // Podrazumevana vrednost za blocked
        sport: match?.s || "", // Podrazumevana vrednost za sport
        leagueId: match ? match.lid : 0, // Podrazumevana vrednost za leagueId
        leagueName: match?.lg || "", // Podrazumevana vrednost za leagueName
        round: match ? match.r : 0, // Podrazumevana vrednost za round
        leagueToken: match?.gr || "", // Podrazumevana vrednost za leagueToken
        leagueGroupToken: match?.grl || "", // Podrazumevana vrednost za leagueGroupToken
        tmstmp: match ? match.lct : 0, // Podrazumevana vrednost za tmstmp
        live: match ? match.liv : false, // Podrazumevana vrednost za live
        bonusDisabled: match ? match.bd : false, // Podrazumevana vrednost za bonusDisabled
        selectedOdd: selectedOddInfo,
      };

      if (match && selection) {
        isAdded(selection)
          ? removeMatchFromTicket(match.mc, selection)
          : addMatchToTicket(convertedMatch);
      } else {
        null;
      }

      if (!isAdded(selection)) {
        // @ts-ignore
        toast(getToastBetLabel(betPick?.label));
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
          marginBottom: 12,
          width: "100%",
        }}
      >
        <TextField
          label="Pretraži svoj tip igre...(npr. Poluvreme, Dupla Šansa, Hendikep...)"
          fullWidth
          size="small"
          color="warning"
          onChange={handleSearchChange}
          sx={{ m: 2 }}
          id="search-textfield"
        />
        {Object.entries(matchedOdds).map(([description, odds]) =>
          odds && Object.keys(odds.odds).length > 0 ? (
            <Box width={"100%"} key={description}>
              {Object.entries(odds.odds).some(
                // @ts-ignore
                ([key, value]) => value.odd !== 0
              ) &&
              description
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ? (
                <Accordion key={`${description}-accordion`} defaultExpanded>
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
                      sx={{ color: "#FFBA33", marginLeft: 1 }}
                    >
                      <b>
                        {Object.keys(odds.odds).reduce((acc, key) => {
                          // @ts-ignore
                          if (acc !== "" || handicaps[key] === undefined)
                            return acc;
                          // @ts-ignore
                          return handicaps[key];
                        }, "")}
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
                      {Object.entries(odds.odds).map(([key, value]) => {
                        // console.log(value);
                        const modifiedKey = `${key}_${s}`;
                        const betPick = (betPickMap as BetPickMap)[modifiedKey];
                        const handicapValue =
                          // @ts-ignore
                          handicaps[key] !== undefined ? handicaps[key] : null;
                        const caption = betPick
                          ? betPick.caption.replace("%s", String(handicapValue))
                          : "";

                        // Ensure value is a string before rendering
                        // @ts-ignore
                        const displayValue = value.odd.toFixed(2);

                        if (value !== 0) {
                          const showHandicapValue = !caption.includes("(");
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
                                disabled={displayValue < 1}
                                sx={{
                                  width: "100%",
                                  borderRadius: 2,
                                  boxShadow: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",

                                  backgroundColor: changeSelectedButtonColor(
                                    parseInt(key)
                                  ),
                                  "&:hover": {
                                    // Disable hover effect
                                    backgroundColor: changeSelectedButtonColor(
                                      parseInt(key)
                                    ),
                                  },
                                  "&:active": {
                                    // Disable active effect
                                    backgroundColor: changeSelectedButtonColor(
                                      parseInt(key)
                                    ),
                                  },
                                }}
                                onClick={() =>
                                  handleAddToTicket(
                                    parseInt(key),
                                    value,
                                    // @ts-ignore
                                    value.bpc,
                                    handicapValue,
                                    betPick
                                  )
                                }
                                disableRipple
                              >
                                <Typography fontSize={10}>
                                  <b>{caption}</b>
                                </Typography>
                                <Typography fontSize={10}>
                                  <b>
                                    {showHandicapValue ? handicapValue : null}
                                  </b>
                                </Typography>
                                <Typography
                                  fontSize={12}
                                  sx={{
                                    color: changeSelectedOddColor(
                                      parseInt(key)
                                    ),
                                  }}
                                >
                                  <b>{displayValue}</b>
                                </Typography>
                                {/* Display handicap value */}
                              </Button>
                            </Grid>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </Box>
          ) : null
        )}
      </Box>
    );
  }, [
    matchedOdds,
    ticketMatches,
    match,
    betPickGroupMap,
    removeMatchFromTicket,
    addMatchToTicket,
    search,
    handicaps,
    s,
    betPickMap,
  ]);

  return (
    <>
      <LiveMatchBanner s={s} match={match} result={result} />
      {renderOdds}
    </>
  );
};

export default RenderOdds;
