import { FC, ReactNode, useState } from "react";
import SocketContext from "./socket-context";

const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socketMessage, setSocketMessage] = useState<object>({});

  return (
    <SocketContext.Provider
      value={{
        socketMessage,
        setSocketMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
