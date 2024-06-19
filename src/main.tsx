import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import App from "./app";
import theme from "./theme/index";
import { ThemeProvider } from "@emotion/react";
import AppProvider from "./store/app-provider";
import LiveDataProvider from "./store/live-data-provider";
import BetDataProvider from "./store/bet-data-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationProvider from "./store/navigation-provider";
import MatchesProvider from "./store/matches-provider";
// import WebSocketComponent from "./socket/socket";
import SocketProvider from "./store/socket-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <SocketProvider>
          {/* <WebSocketComponent /> */}
          <NavigationProvider>
            <BetDataProvider>
              <MatchesProvider>
                <LiveDataProvider>
                  {/* <CustomScroll> */}
                  <App />
                  {/* </CustomScroll> */}
                </LiveDataProvider>
              </MatchesProvider>
            </BetDataProvider>
          </NavigationProvider>
        </SocketProvider>
      </AppProvider>
    </ThemeProvider>
    <ToastContainer
      position="top-center"
      autoClose={3600}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // theme="dark"
    />
  </React.StrictMode>
);
