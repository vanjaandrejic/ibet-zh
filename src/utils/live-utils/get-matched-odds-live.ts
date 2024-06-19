import { Dispatch, SetStateAction, useMemo } from "react";
import { BetLines, BetPickGroupMap } from "../../types/bet";
import { LiveBets } from "../../types/live/live";

const useFillMatchedOddsState = (
  betPickGroupMap: BetPickGroupMap | object,
  betLines: BetLines | object,
  exactBets: LiveBets[] | object,
  filteredBetPickGroupMap: BetPickGroupMap | object, // Dodatni parametar
  setMatchedOdds: Dispatch<
    SetStateAction<{
      [name: string]: { odds: { [key: string]: number }; code: number };
    }>
  >
) => {
  const fillMatchedOddsState = useMemo(() => {
    const uniqueLineCodes = {};
    if (betPickGroupMap) {
      Object.values(betPickGroupMap).forEach((item) => {
        if (item && Object.prototype.hasOwnProperty.call(item, "lineCode")) {
          // @ts-ignore
          uniqueLineCodes[item.lineCode] = true;
        }
      });
    }
    const lineCodesArray = Object.keys(uniqueLineCodes);
    const filteredBetLines = [];
    lineCodesArray.forEach((lineCode) => {
      const filteredLines = Object.keys(betLines).filter(
        // @ts-ignore
        (line: any) => line.code === Number(lineCode)
      );
      filteredBetLines.push(...filteredLines);
    });

    const getMatchedOdds = (exactBets: LiveBets[]) => {
      const matchedOdds = {};
      exactBets.forEach((bet) => {
        if (bet.om) {
          const om = bet.om;
          Object.keys(om).forEach((key) => {
            const keyy = parseInt(key);
            const value = om[key].ov;
            const bpc = om[key].bpc;
            // @ts-ignore
            matchedOdds[keyy] = { odd: value, bpc: bpc };
          });
        }
      });
      return matchedOdds;
    };
    // @ts-ignore
    const mo = getMatchedOdds(exactBets);

    // console.log("mo", mo);

    // console.log("filteredBetPickGroupMap", filteredBetPickGroupMap);

    const matchedOddsHelper = {};
    Object.values(filteredBetPickGroupMap).forEach((item) => {
      if (
        Object.prototype.hasOwnProperty.call(item, "picks") &&
        Array.isArray(item.picks)
      ) {
        // @ts-ignore
        matchedOddsHelper[item.name] = {
          odds: {},
          code: item.lineCode,
        };
        // @ts-ignore
        item.picks.forEach((pick) => {
          if (Object.prototype.hasOwnProperty.call(mo, pick.betPickCode)) {
            // @ts-ignore
            matchedOddsHelper[item.name].odds[pick.betPickCode] =
              // @ts-ignore
              mo[pick.betPickCode];
          }
        });
      }
    });

    return () => {
      setMatchedOdds(matchedOddsHelper);
    };
  }, [
    betPickGroupMap,
    betLines,
    exactBets,
    filteredBetPickGroupMap,
    setMatchedOdds,
  ]);

  return fillMatchedOddsState;
};

export default useFillMatchedOddsState;
