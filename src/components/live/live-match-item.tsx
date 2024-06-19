import React, { useContext, useEffect, useMemo, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { LiveBets, LiveHeaders, LiveResults } from "../../types/live/live";
import LiveDataContext from "../../store/live-data-context";
import useFillMatchedOddsState from "../../utils/live-utils/get-matched-odds-live";
import { BetPickGroupMap, BetPickGroupPosition } from "../../types/bet";
import BetDataContext from "../../store/bet-data-context";
import AppContext from "../../store/app-context";
import { TicketMatch } from "../../types/match";
import LiveMatchItemCard from "./live-match-item-card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";

interface LiveMatchItemProps {
  item: LiveHeaders;
  matchingResult?: LiveResults;
  liveBets?: LiveBets[];
}

const LiveMatchItem: React.FC<LiveMatchItemProps> = ({
  item,
  matchingResult,
}) => {
  const [exactBets, setExactBets] = useState<LiveBets[]>([]);
  const [betPickGroupPositionsUsed, setBetPickGroupPositionsUsed] =
    useState<BetPickGroupPosition>({});
  const [filteredBetPickGroupMap, setFilteredBetPickGroupMap] = useState<
    BetPickGroupMap | Record<string, unknown>
  >({});
  const [matchedOdds, setMatchedOdds] = useState<
    Record<
      string,
      { odds: Record<string, { odd: number; bpc: number }>; code: number }
    >
  >({});

  const { state } = useContext(LiveDataContext);
  const { betPickMap, betLines, betPickGroupMap, betPickGroupPositions } =
    useContext(BetDataContext);
  const { addMatchToTicket, removeMatchFromTicket, ticketMatches } =
    useContext(AppContext);

  const filteredBets = useMemo(
    () => state.liveBets.filter((bet: LiveBets) => bet.mc === item.mc),
    [state.liveBets, item.mc]
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      item.s &&
      betPickGroupPositions &&
      // @ts-ignore
      betPickGroupPositions["MOBILE_LIVE_TOP"]
    ) {
      const filteredPosition = Object.entries(
        // @ts-ignore
        betPickGroupPositions["MOBILE_LIVE_TOP"]
      ).filter(([key]) => key === item.s);
      setBetPickGroupPositionsUsed(
        // @ts-ignore
        filteredPosition[0]?.[1]?.DEFAULT?.[0]?.betPickGroupPositions || {}
      );
    }
  }, [betPickGroupPositions, item.s]);

  useEffect(() => {
    setExactBets(filteredBets);
  }, [filteredBets]);

  const fillMatchedOddsState = useFillMatchedOddsState(
    betPickGroupMap,
    betLines,
    exactBets,
    filteredBetPickGroupMap,
    // @ts-ignore
    setMatchedOdds
  );

  useEffect(() => {
    fillMatchedOddsState();
  }, [fillMatchedOddsState]);

  useEffect(() => {
    const extractMembers = () => {
      const extractedMembers: Record<string, unknown> = {};
      for (const member in betPickGroupPositionsUsed) {
        // @ts-ignore
        if (betPickGroupPositionsUsed.hasOwnProperty(member)) {
          const betPickGroupId =
            betPickGroupPositionsUsed[member].betPickGroupId;
          // @ts-ignore
          if (betPickGroupMap.hasOwnProperty(betPickGroupId)) {
            // @ts-ignore
            extractedMembers[member] = betPickGroupMap[betPickGroupId];
          }
        }
      }
      setFilteredBetPickGroupMap(extractedMembers);
    };
    if (betPickGroupMap && betPickGroupPositionsUsed) {
      extractMembers();
    }
  }, [betPickGroupMap, betPickGroupPositionsUsed]);

  const renderButtonsOnly = useMemo(() => {
    const isAdded = (oddCode: number) =>
      ticketMatches.some(
        (ticketMatch) =>
          ticketMatch.id === item.id &&
          ticketMatch.selectedOdd?.code === oddCode
      );

    const getOrderNumberForSelection = (selection: number): number | null => {
      for (const group of Object.values(betPickGroupMap)) {
        if (group.tipTypes.includes(selection)) {
          return group.orderNumber;
        }
      }
      return null;
    };

    const getToastBetLabel = (label: string) => {
      // if (label.includes("%h") || label.includes("%a")) {
      const result = label.replace("$a", item.a).replace("$h", item.h);

      return result;
      // } else {
      //   return stringToDisplay;
      // }
    };

    const handleAddToTicket = (
      selection?: number,
      value?: number,
      bpc?: number,
      betPick?: object
    ) => {
      if (!selection || !item) {
        console.error("Invalid selection or item:", selection, item);
        return;
      }

      const betPickGroupId = getOrderNumberForSelection(selection);

      if (!betPickGroupId) {
        console.error("Bet pick group ID not found for selection:", selection);
        return;
      }

      const selectedOddInfo = {
        code: selection,
        odd: value,
        specialValue: null,
        live: true,
        betPickCode: bpc,
        betCode: selection,
        betPickGroupId,
        tipTypeCode: selection,
      };

      const convertedMatch: TicketMatch = {
        id: item.id || 0,
        matchCode: item.mc || 0,
        home: item.h || "",
        away: item.a || "",
        kickOffTime: item.kot || 0,
        blocked: item.bd || false,
        sport: item.s || "",
        leagueId: item.lid || 0,
        leagueName: item.lg || "",
        round: item.r || 0,
        leagueToken: item.gr || "",
        leagueGroupToken: item.grl || "",
        tmstmp: item.lct || 0,
        live: item.liv || false,
        bonusDisabled: item.bd || false,
        selectedOdd: selectedOddInfo,
      };

      isAdded(selection)
        ? removeMatchFromTicket(item.mc, selection)
        : addMatchToTicket(convertedMatch);

      if (!isAdded(selection)) {
        // @ts-ignore
        toast(getToastBetLabel(betPick?.label));
      }
    };

    const buttonsToRender: JSX.Element[] = [];
    // @ts-ignore
    Object.entries(matchedOdds).forEach(([description, odds]) => {
      if (buttonsToRender.length > 0 || Object.keys(odds.odds).length > 3)
        return;

      if (odds && Object.keys(odds.odds).length > 0) {
        setIsLoading(false);
        Object.entries(odds.odds).forEach(([key, value]) => {
          const modifiedKey = `${key}_${item.s}`;
          // @ts-ignore
          const betPick = betPickMap[modifiedKey];
          const caption = betPick ? betPick.caption : "";
          const displayValue = value.odd?.toFixed(2);

          if (value.odd !== 0) {
            buttonsToRender.push(
              <Button
                key={`${key}_${item.s}`}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 0.5,
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
                    value.odd,
                    value.bpc,
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
                    color: isAdded(parseInt(key)) ? "black" : "white",
                  }}
                >
                  <b>{displayValue}</b>
                </Typography>
              </Button>
            );
          }
        });
      }
    });

    return buttonsToRender.map((button, index) => (
      <Box width={"100%"} m={0.5} key={index}>
        {button}
      </Box>
    ));
  }, [
    addMatchToTicket,
    betPickGroupMap,
    betPickMap,
    item,
    matchedOdds,
    removeMatchFromTicket,
    ticketMatches,
  ]);

  return (
    <Box
      key={item.id}
      sx={{
        boxShadow: 3,
        width: "100%",
        padding: 2,
        backgroundColor: "#0D0D19",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: 168,
      }}
    >
      <LiveMatchItemCard item={item} matchingResult={matchingResult} />
      {isLoading || !item.ba || item.ls === "STOPPED" ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Button
              key={index}
              disabled
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: 0.5,
                backgroundColor: "#121425",
                "&:hover": {
                  backgroundColor: "#121425",
                },
                "&:active": {
                  backgroundColor: "#121425",
                },
              }}
              disableRipple
            >
              <LockOutlinedIcon sx={{ fontSize: 18 }} />
            </Button>
          ))}
        </Box>
      ) : (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          {renderButtonsOnly}
        </Box>
      )}
    </Box>
  );
};

export default LiveMatchItem;
