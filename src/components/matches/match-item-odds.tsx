import { FC, useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../../store/app-context";
import BetDataContext from "../../store/bet-data-context";
import {
  BetPickGroupMap,
  BetPickGroupPosition,
  BetPickMap,
} from "../../types/bet";
import { Match, TicketMatch } from "../../types/match";
import { Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface MatchItemOddsProps {
  match: Match | TicketMatch;
}

const MatchItemOdds: FC<MatchItemOddsProps> = ({ match }) => {
  const [betPickGroupPositionsUsed, setBetPickGroupPositionsUsed] =
    useState<BetPickGroupPosition>({});
  const [filteredBetPickGroupMap, setFilteredBetPickGroupMap] = useState<
    BetPickGroupMap | object
  >({});
  const [matchedOdds, setMatchedOdds] = useState<{
    [name: string]: { odds: { [key: string]: number }; code: number };
  }>({});

  const { betPickMap, betPickGroupMap, betPickGroupPositions } =
    useContext(BetDataContext);
  const { ticketMatches, addMatchToTicket, removeMatchFromTicket } =
    useContext(AppContext);

  useEffect(() => {
    if (match.sport && betPickGroupPositions) {
      const filteredPosition = Object.entries(
        // @ts-ignore
        betPickGroupPositions["MOBILE_PREMATCH_TOP"] || {}
      ).filter(([key]) => key === match.sport);

      if (filteredPosition.length > 0) {
        setBetPickGroupPositionsUsed(
          // @ts-ignore
          filteredPosition[0][1]["DEFAULT"][0]["betPickGroupPositions"] || {}
        );
      }
    }
  }, [betPickGroupPositions, match.sport]);

  // console.log(match);

  useEffect(() => {
    const extractMembers = () => {
      // @ts-ignore
      const extractedMembers: any = {};

      for (const member in betPickGroupPositionsUsed) {
        if (
          Object.prototype.hasOwnProperty.call(
            betPickGroupPositionsUsed,
            member
          )
        ) {
          const betPickGroupId =
            betPickGroupPositionsUsed[member].betPickGroupId;
          if (
            betPickGroupId &&
            Object.prototype.hasOwnProperty.call(
              betPickGroupMap,
              betPickGroupId
            )
          ) {
            // @ts-ignore
            extractedMembers[member] = betPickGroupMap[betPickGroupId];
          }
        }
      }

      setFilteredBetPickGroupMap(extractedMembers);
    };

    if (betPickGroupPositionsUsed && betPickGroupMap) {
      extractMembers();
    }
  }, [betPickGroupPositionsUsed, betPickGroupMap]);

  useEffect(() => {
    // @ts-ignore
    const matchedOddsHelper: any = {};
    // @ts-ignore
    Object.values(filteredBetPickGroupMap).forEach((item: any) => {
      if (
        item &&
        Object.prototype.hasOwnProperty.call(item, "picks") &&
        Array.isArray(item.picks)
      ) {
        matchedOddsHelper[item.name] = {
          odds: {},
          code: item.lineCode,
        };
        // @ts-ignore
        item.picks.forEach((pick: any) => {
          if (
            match &&
            match.odds &&
            Object.prototype.hasOwnProperty.call(match.odds, pick.betPickCode)
          ) {
            matchedOddsHelper[item.name].odds[pick.betPickCode] =
              match.odds[pick.betPickCode];
          }
        });
      }
    });

    setMatchedOdds(matchedOddsHelper);
  }, [filteredBetPickGroupMap, match]);

  const renderButtonsOnly = useMemo(() => {
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
      const result = label.replace("$a", match.away).replace("$h", match.home);

      return result;
      // } else {
      //   return stringToDisplay;
      // }
    };

    const handleAddToTicket = (
      selection?: number,
      value?: number,
      betPick?: object,
      specialValue?: string | null
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
              // console.log(group.orderNumber);
              return group.id;
            }
          }
        }
        return null;
      };

      const isAdded = (oddCode: number | undefined) => {
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
        odd: value,
        specialValue: Number(specialValue),
        live: false,
        betPickCode: selection,
        betCode: selection,
        betPickGroupId: betPickGroupId,
        tipTypeCode: selection,
      };

      if (match && selection) {
        isAdded(selection)
          ? removeMatchFromTicket(match.matchCode, selection)
          : addMatchToTicket({
              ...match,
              selectedOdd: selectedOddInfo,
            });
      }
      const isMatchAdded = isAdded(selection);
      if (!isMatchAdded) {
        // @ts-ignore
        toast(getToastBetLabel(betPick?.label));
      }
    };
    // @ts-ignore
    const buttons = [];
    let hasKonacanIshod = false;

    if (["B", "T", "V", "TT"].includes(match.sport)) {
      let count = 0;
      Object.entries(matchedOdds).forEach(([description, odds]) => {
        if (count >= 2) return;
        if (
          odds &&
          Object.keys(odds.odds).length > 0 &&
          description !== "Konačan ishod"
        ) {
          Object.entries(odds.odds).forEach(([key, value]) => {
            if (count >= 2) return;
            const modifiedKey = `${key}_${match.sport}`;
            const betPick = (betPickMap as BetPickMap)[modifiedKey];
            const caption = betPick ? betPick.caption : "";
            const displayValue = value.toFixed(2);

            if (value !== 0) {
              buttons.push(
                <Button
                  key={key}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 0.5,
                    backgroundColor: changeSelectedButtonColor(parseInt(key)),
                    "&:hover": {
                      backgroundColor: changeSelectedButtonColor(parseInt(key)),
                    },
                    "&:active": {
                      backgroundColor: changeSelectedButtonColor(parseInt(key)),
                    },
                  }}
                  onClick={() =>
                    handleAddToTicket(parseInt(key), value, betPick)
                  }
                >
                  <Typography fontSize={12}>
                    <b>{caption}</b>
                  </Typography>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: changeSelectedOddColor(parseInt(key)),
                    }}
                  >
                    <b>{displayValue}</b>
                  </Typography>
                </Button>
              );
              count++;
            }
          });
        }
      });
    } else {
      Object.entries(matchedOdds).forEach(([description, odds]) => {
        if (description === "Konačan ishod") {
          hasKonacanIshod = true;
          if (odds && Object.keys(odds.odds).length > 0) {
            Object.entries(odds.odds).forEach(([key, value]) => {
              const modifiedKey = `${key}_${match.sport}`;
              const betPick = (betPickMap as BetPickMap)[modifiedKey];
              const caption = betPick ? betPick.caption : "";
              const displayValue = value.toFixed(2);

              if (value !== 0) {
                buttons.push(
                  <Button
                    key={key}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 0.5,
                      backgroundColor: changeSelectedButtonColor(parseInt(key)),
                      "&:hover": {
                        backgroundColor: changeSelectedButtonColor(
                          parseInt(key)
                        ),
                      },
                      "&:active": {
                        backgroundColor: changeSelectedButtonColor(
                          parseInt(key)
                        ),
                      },
                    }}
                    onClick={() =>
                      handleAddToTicket(parseInt(key), value, betPick)
                    }
                  >
                    <Typography fontSize={12}>
                      <b>{caption}</b>
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: changeSelectedOddColor(parseInt(key)),
                      }}
                    >
                      <b>{displayValue}</b>
                    </Typography>
                  </Button>
                );
              }
            });
          }
        }
      });

      if (!hasKonacanIshod) {
        let count = 0;
        Object.entries(matchedOdds).forEach(([description, odds]) => {
          if (count >= 3) return;
          if (
            odds &&
            Object.keys(odds.odds).length > 0 &&
            description !== "Konačan ishod"
          ) {
            Object.entries(odds.odds).forEach(([key, value]) => {
              if (count >= 3) return;
              const modifiedKey = `${key}_${match.sport}`;
              const betPick = (betPickMap as BetPickMap)[modifiedKey];
              const caption =
                // @ts-ignore
                betPick && match.params && match.params["overUnder"]
                  ? // @ts-ignore
                    `${betPick.caption} (${match.params["overUnder"]})`
                  : betPick
                  ? betPick.caption
                  : "";
              const displayValue = value.toFixed(2);

              // @ts-ignore
              const specialValue = match.params
                ? // @ts-ignore
                  match.params["overUnder"]
                : null;

              if (value !== 0) {
                buttons.push(
                  <Button
                    key={`${key}_${match.sport}`}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 0.5,
                      backgroundColor: changeSelectedButtonColor(parseInt(key)),
                      "&:hover": {
                        backgroundColor: changeSelectedButtonColor(
                          parseInt(key)
                        ),
                      },
                      "&:active": {
                        backgroundColor: changeSelectedButtonColor(
                          parseInt(key)
                        ),
                      },
                    }}
                    onClick={() =>
                      handleAddToTicket(
                        parseInt(key),
                        value,
                        betPick,
                        specialValue
                      )
                    }
                  >
                    <Typography fontSize={12}>
                      <b>{caption}</b>
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: changeSelectedOddColor(parseInt(key)),
                      }}
                    >
                      <b>{displayValue}</b>
                    </Typography>
                  </Button>
                );
                count++;
              }
            });
          }
        });
      }
    }
    // @ts-ignore
    return buttons;
  }, [
    addMatchToTicket,
    betPickGroupMap,
    betPickMap,
    match,
    matchedOdds,
    removeMatchFromTicket,
    ticketMatches,
  ]);

  return <>{renderButtonsOnly}</>;
};

export default MatchItemOdds;
