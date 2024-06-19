import { BetPickMap } from "../types/bet";
import { Match, TicketMatch } from "../types/match";

export const formatKickOffTime = (kickOffTime?: number) => {
  if (kickOffTime) {
    const date = new Date(kickOffTime);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return date.toLocaleString("sr-RS", options);
  }
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RSD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const getBetCaption = (
  oddkey: string,
  sportId: string,
  betPickMap: BetPickMap | object
) => {
  const modifiedKey = `${oddkey}_${sportId}`;
  const betPick = (betPickMap as BetPickMap)[modifiedKey];
  const caption = betPick ? betPick.caption : "";
  return caption;
};

export const changeSelectedButtonColor = (
  oddCode: number,
  ticketMatches: TicketMatch[],
  match: Match | TicketMatch
) => {
  return ticketMatches.some(
    (ticketMatch) =>
      ticketMatch.id === match.id && ticketMatch.selectedOdd?.code === oddCode
  )
    ? "#FFC211"
    : "#121425";
};

export const changeSelectedOddColor = (
  oddCode: number,
  ticketMatches: TicketMatch[],
  match: Match | TicketMatch
) => {
  return ticketMatches.some(
    (ticketMatch) =>
      ticketMatch.id === match.id && ticketMatch.selectedOdd?.code === oddCode
  )
    ? "black"
    : "white";
};

export const formatLiveTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};
