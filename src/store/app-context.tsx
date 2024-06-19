import { Dispatch, SetStateAction, createContext } from "react";
import { TicketMatch } from "../types/match";
interface TicketContextType {
  ticketMatches: TicketMatch[];
  timeParam: string;
  setTicketMatches: Dispatch<SetStateAction<TicketMatch[]>>;
  setTimeParam: (newTimeParam: string) => void;
  addMatchToTicket: (match: TicketMatch) => void;
  removeMatchFromTicket: (matchCode?: number, selectedOddCode?: number) => void;
  clearTicket: () => void;
  updateMatch: (id: number, updatedProperties: object) => void;
  // isUnique: (match: TicketMatch) => boolean;
}

const AppContext = createContext<TicketContextType>({
  ticketMatches: [],
  timeParam: "",
  setTicketMatches: () => {},
  setTimeParam: () => {},
  addMatchToTicket: () => {},
  removeMatchFromTicket: () => {},
  clearTicket: () => {},
  updateMatch: () => {},
  // isUnique: () => true,
});

export default AppContext;
