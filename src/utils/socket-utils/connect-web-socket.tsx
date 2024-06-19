import SockJS from "sockjs-client";
import Stomp from "stompjs";

// @ts-ignore
const connectWebSocket = ({ accountUserName, iUserInfo, setSocketMessage }) => {
  const socket = new SockJS("https://ibet2.365.rs/ws3/stomp", null, {
    transports: "websocket",
  });

  const stompClient = Stomp.over(socket);

  stompClient.debug = () => null;

  stompClient.connect(
    {
      username: accountUserName,
      "auth-token": localStorage.getItem("__ibet-mobile/_ionickv/auth-token"),
      instanceCode: "www365rs",
      info: "Platform mobile",
    },
    // @ts-ignore
    function (frame) {
      const subscription = stompClient.subscribe(
        `/exchange/IBET_LIVE_USER/${localStorage.getItem(
          "__ibet-mobile/_ionickv/uuid"
        )}`,
        (message) => {
          console.log("Received: " + message.body);
          setSocketMessage(JSON.parse(message.body));
        },
        {
          username: accountUserName,
          "auth-token": localStorage.getItem(
            "__ibet-mobile/_ionickv/auth-token"
          ),
          instanceCode: "www365rs",
          info: "Platform mobile",
          lang: "sr",
          userUuid: localStorage.getItem("__ibet-mobile/_ionickv/uuid"),
          terminal: String(iUserInfo.terminal),
          location: String(iUserInfo.location),
          group: String(iUserInfo.group),
          version: "v3",
          id: "sub-0",
          "x-queue-name": `stomp-wss-${localStorage.getItem(
            "__ibet-mobile/_ionickv/uuid"
          )}-0w3ak`,
        }
      );

      // Clean up on unmount or dependency change
      return () => {
        subscription.unsubscribe();
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      };
    }
  );
};

export default connectWebSocket;
