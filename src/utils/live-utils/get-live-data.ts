import { Dispatch, SetStateAction } from "react";
import { LiveSport } from "../../types/live/live-message";
import { LiveBets, LiveHeaders, LiveResults } from "../../types/live/live";

type Action =
  | { type: "UPDATE_LIVE_HEADERS"; payload: { newHeaders: LiveHeaders[] } }
  | { type: "UPDATE_LIVE_RESULTS"; payload: { newResults: LiveResults[] } }
  | { type: "UPDATE_LIVE_BETS"; payload: { newBets: LiveBets[] } };

export const getLiveData = (
  dispatch: Dispatch<Action>,
  lastInitRef: React.MutableRefObject<number | undefined>,
  lastPingTmstmpRef: React.MutableRefObject<number | undefined>,
  setLiveSports?: Dispatch<SetStateAction<LiveSport[]>>
) => {
  const loadLiveInit = () => {
    const initEventSource = new EventSource(
      "https://ibet2.365.rs/live/events/sr?lastInitId=" + lastInitRef.current
    );

    initEventSource.addEventListener("message", (message: MessageEvent) => {
      if (message.data.toString().startsWith("END")) {
        // Ovde se obradjuje kraj eventa
        const tmstmp = message.data.toString().split(" ")[1];
        lastInitRef.current = tmstmp;
        subscribeOnLiveEvents();
        initEventSource.close();
      } else {
        // Ovde se obradjuje dolazna poruka
        const msg = JSON.parse(message.data);
        if (Array.isArray(msg.liveHeaders) && msg.liveHeaders.length > 0) {
          // Ako poruka sadrži liveHeaders, ažuriramo stanje pomoću dispatch funkcije
          dispatch({
            type: "UPDATE_LIVE_HEADERS",
            payload: { newHeaders: msg.liveHeaders },
          });
        }
        if (Array.isArray(msg.liveSports) && msg.liveSports.length > 0) {
          {
            setLiveSports
              ? setLiveSports(() => {
                  return [...msg.liveSports];
                })
              : null;
          }
        }
        if (Array.isArray(msg.liveResults) && msg.liveResults.length > 0) {
          dispatch({
            type: "UPDATE_LIVE_RESULTS",
            payload: { newResults: msg.liveResults },
          });
        }

        if (Array.isArray(msg.liveBets) && msg.liveBets.length > 0) {
          dispatch({
            type: "UPDATE_LIVE_BETS",
            payload: { newBets: msg.liveBets },
          });
        }
      }
    });

    initEventSource.onerror = () => {
      if (initEventSource.readyState === 2) {
        setTimeout(() => {
          initEventSource.close();
          loadLiveInit();
        }, 2000);
      }
    };
  };

  const subscribeOnLiveEvents = () => {
    const subscribeEventSource = new EventSource(
      "https://ibet2.365.rs/live/subscribe/sr?lastInitId=" + lastInitRef.current
    );

    subscribeEventSource.onerror = () => {
      if (subscribeEventSource.readyState === 2) {
        setTimeout(() => {
          subscribeEventSource.close();
        }, 1000);
      }
    };

    subscribeEventSource.addEventListener("PART", (e: MessageEvent) => {
      const partData = JSON.parse(e.data);
      // console.log("PART-MSG", partData);
      if (
        Array.isArray(partData.liveSports) &&
        partData.liveSports.length > 0
      ) {
        {
          setLiveSports
            ? setLiveSports(() => {
                return [...partData.liveSports];
              })
            : null;
        }
      }

      if (Array.isArray(partData.liveBets) && partData.liveBets.length > 0) {
        dispatch({
          type: "UPDATE_LIVE_BETS",
          payload: { newBets: partData.liveBets },
        });
      }
      // updateStateFromMessage(partData);

      lastPingTmstmpRef.current = Date.now();
    });

    subscribeEventSource.addEventListener("LIVE", (e: MessageEvent) => {
      const liveData = JSON.parse(e.data);
      if (
        Array.isArray(liveData.liveResults) &&
        liveData.liveResults.length > 0
      ) {
        dispatch({
          type: "UPDATE_LIVE_RESULTS",
          payload: { newResults: liveData.liveResults },
        });
      }
      if (
        Array.isArray(liveData.liveSports) &&
        liveData.liveSports.length > 0
      ) {
        {
          setLiveSports
            ? setLiveSports(() => {
                return [...liveData.liveSports];
              })
            : null;
        }
      }
      if (Array.isArray(liveData.liveBets) && liveData.liveBets.length > 0) {
        dispatch({
          type: "UPDATE_LIVE_BETS",
          payload: { newBets: liveData.liveBets },
        });
      }
      lastPingTmstmpRef.current = Date.now();
    });

    subscribeEventSource.addEventListener("CLOSE", (e: MessageEvent) => {
      console.log(e);
      loadLiveInit();
    });

    subscribeEventSource.addEventListener("PING", (e: MessageEvent) => {
      console.log(e);
      lastPingTmstmpRef.current = Date.now();
    });

    const checkForPing = setInterval(() => {
      const now = Date.now();
      const lastPing = lastPingTmstmpRef.current;
      if (lastPing && now - lastPing > 10000) {
        console.log(
          "Connection inactive for more than 10 seconds. Reconnecting..."
        );
        subscribeEventSource.close();
        subscribeOnLiveEvents();
        clearInterval(checkForPing);
      }
    }, 10000);
  };

  return loadLiveInit;
};
