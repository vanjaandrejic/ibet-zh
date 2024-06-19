import { FC, ReactNode, useEffect, useState } from "react";
import AppContext from "./app-context";
import { TicketMatch } from "../types/match";
import { toast } from "react-toastify";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ticketMatches, setTicketMatches] = useState<TicketMatch[]>([]);
  const [timeParam, setTimeParam] = useState<string>("");

  useEffect(() => {
    // Proveravamo da li postoji nešto u localStorage pod ključem "tickets"
    const savedTickets = sessionStorage.getItem("tickets");

    if (savedTickets) {
      // Ako postoje, parsiramo JSON string i postavljamo ticketMatches
      setTicketMatches(JSON.parse(savedTickets));
    }
  }, []);

  const isUnique = (match: TicketMatch): boolean => {
    return !ticketMatches.some(
      (item) =>
        item.id === match.id &&
        item.selectedOdd?.code === match.selectedOdd?.code
    );
  };

  const isSameMatch = (match: TicketMatch): boolean => {
    return ticketMatches.some((item) => item.id === match.id);
  };

  const addMatchToTicket = (match: TicketMatch) => {
    if (ticketMatches.length >= 35) {
      toast.info("Maksimalan broj meceva na tiketu je 35");
      return;
    }
    let updatedTickets = [];
    if (!isUnique) {
      console.error("Već postoji stavka sa istim selectedOdd u korpi.");
      alert("Već postoji meč sa istim odabirom u korpi");
      return;
    }

    if (isSameMatch(match)) {
      const helperArray = ticketMatches.filter((item) => item.id !== match.id);

      updatedTickets = [...helperArray, match];
    } else {
      updatedTickets = [...ticketMatches, match];
    }

    setTicketMatches(updatedTickets);
    sessionStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const removeMatchFromTicket = (
    matchCode?: number,
    selectedOddCode?: number
  ) => {
    const updatedTickets = ticketMatches.filter(
      (item) =>
        item.matchCode !== matchCode ||
        item.selectedOdd.code !== selectedOddCode
    );
    setTicketMatches(updatedTickets);
    sessionStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const clearTicket = () => {
    setTicketMatches([]);
    sessionStorage.clear();
  };

  const updateMatch = (id: number, updatedProperties: object) => {
    setTicketMatches((prevMatches) => {
      const updatedMatches = prevMatches.map((match) =>
        match.id === id ? { ...match, ...updatedProperties } : match
      );
      // Ažuriramo localStorage sa novim stanjem
      sessionStorage.setItem("tickets", JSON.stringify(updatedMatches));
      return updatedMatches;
    });
  };

  return (
    <AppContext.Provider
      value={{
        ticketMatches,
        timeParam,
        setTicketMatches,
        setTimeParam,
        addMatchToTicket,
        removeMatchFromTicket,
        clearTicket,
        updateMatch,
        // isUnique,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
