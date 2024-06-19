import { FC, ReactNode, useReducer } from "react";
import { LiveBets, LiveHeaders, LiveResults } from "../types/live/live";
import LiveDataContext from "./live-data-context";

// Definišemo tipove za stanje i akcije
interface State {
  liveHeaders: LiveHeaders[];
  liveResults: LiveResults[];
  liveBets: LiveBets[];
}

type Action =
  | { type: "UPDATE_LIVE_HEADERS"; payload: { newHeaders: LiveHeaders[] } }
  | { type: "UPDATE_LIVE_RESULTS"; payload: { newResults: LiveResults[] } }
  | { type: "UPDATE_LIVE_BETS"; payload: { newBets: LiveBets[] } };

const initialState: State = {
  liveHeaders: [],
  liveResults: [],
  liveBets: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_LIVE_HEADERS": {
      const { newHeaders } = action.payload;
      const uniqueIds = new Set(state.liveHeaders.map((header) => header.id));
      const filteredHeaders = newHeaders.filter(
        (header) => !uniqueIds.has(header.id)
      );
      return {
        ...state,
        liveHeaders: [...state.liveHeaders, ...filteredHeaders],
      };
    }
    case "UPDATE_LIVE_RESULTS": {
      const { newResults } = action.payload;
      const updatedResults = [...state.liveResults];
      newResults.forEach((newResult) => {
        const existingIndex = updatedResults.findIndex(
          (result) => result.mi === newResult.mi
        );
        if (existingIndex !== -1) {
          updatedResults.splice(existingIndex, 1, newResult);
        } else {
          updatedResults.push(newResult);
        }
      });
      return {
        ...state,
        liveResults: updatedResults,
      };
    }
    case "UPDATE_LIVE_BETS": {
      const { newBets } = action.payload;
      const updatedResults = [...state.liveBets];
      newBets.forEach((newBet) => {
        const existingIndex = updatedResults.findIndex(
          (result) => result.id === newBet.id
        );
        if (existingIndex !== -1) {
          updatedResults.splice(existingIndex, 1, newBet);
        } else {
          updatedResults.push(newBet);
        }
      });
      return {
        ...state,
        liveBets: updatedResults,
      };
    }
    default:
      return state;
  }
};

const LiveDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LiveDataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LiveDataContext.Provider>
  );
};

export default LiveDataProvider;
