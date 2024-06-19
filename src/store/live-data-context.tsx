import { createContext, Dispatch } from "react";
import { LiveBets, LiveHeaders, LiveResults } from "../types/live/live";

type Action =
  | { type: "UPDATE_LIVE_HEADERS"; payload: { newHeaders: LiveHeaders[] } }
  | { type: "UPDATE_LIVE_RESULTS"; payload: { newResults: LiveResults[] } }
  | { type: "UPDATE_LIVE_BETS"; payload: { newBets: LiveBets[] } };

interface State {
  liveHeaders: LiveHeaders[];
  liveResults: LiveResults[];
  liveBets: LiveBets[];
}

interface LiveDataContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const LiveDataContext = createContext<LiveDataContextType>({
  state: {
    liveHeaders: [],
    liveResults: [],
    liveBets: [],
  },
  dispatch: () => {},
});

export default LiveDataContext;
