import { Dispatch, SetStateAction, createContext } from "react";

interface SocketContextType {
  socketMessage: object;
  setSocketMessage: Dispatch<SetStateAction<object>>;
}

const SocketContext = createContext<SocketContextType>({
  socketMessage: {},
  setSocketMessage: () => {},
});

export default SocketContext;
