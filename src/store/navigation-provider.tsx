import { FC, ReactNode, useEffect, useState } from "react";
import NavigationContext from "./navigation-context";
import { currentGame } from "../pages/casino-page";
import axios from "axios";
import { User } from "../types/user";

const NavigationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Početna");
  const [provider, setProvider] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("2130");
  const [isDesktopGameStarted, setIsDesktopGameStarted] =
    useState<boolean>(false);
  const [desktopGameUrl, setDesktopGameUrl] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<currentGame>({
    gameId: "",
    provider: "",
    demo: false,
  });
  const [sport, setSport] = useState<string>("S");

  const [favoriteGames, setFavoriteGames] = useState<object>({});
  const [accountUserName, setAccountUserName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [iParametars, setIparametars] = useState<object>({});
  const [logoSTJson, setLogoSTJson] = useState<object[]>([]);
  const [logoBJson, setLogoBJson] = useState<object[]>([]);
  const [freeBetInfo, setFreeBetInfo] = useState<object>({});
  const [liveSportToFilter, setLiveSportToFilter] = useState<string | null>(
    "S"
  );

  const [iUserInfo, setIuserInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        if (!authToken || !utkn) return;

        const result = await axios.get(
          "https://ibet2.365.rs/ibet/profile/iUserInfo.json?mobileVersion=2.32.10.5",
          {
            headers: {
              "X-Auth-Token": authToken,
              Utkn: utkn,
            },
          }
        );
        setIuserInfo(result.data);

        // console.log(result);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserInfo();
  }, [user]);

  useEffect(() => {
    const fetchFreeBetBalance = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        if (!authToken || !utkn) return;

        const result = await axios.get(
          "https://ibet2.365.rs/ibet/profile/iUserFreeBetAccount.json?mobileVersion=2.32.10.5",
          {
            headers: {
              "X-Auth-Token": authToken,
              Utkn: utkn,
            },
          }
        );
        setFreeBetInfo(result.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };
    fetchFreeBetBalance();
  }, [user]);

  useEffect(() => {
    const url = "https://ibet-365.com/content/club-icons/vanja.json";

    axios
      .get(url)
      .then((response) => {
        setLogoSTJson(response.data);
        // console.log("response.dataJSON", response.data);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  useEffect(() => {
    const url = "https://ibet-365.com/content/club-icons-b/basket.json";

    axios
      .get(url)
      .then((response) => {
        setLogoBJson(response.data);
        // console.log("response.dataJSON", response.data);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  useEffect(() => {
    const fetchFavoriteGame = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        if (!authToken || !utkn) return;

        const result = await axios.get(
          "https://ibet2.365.rs/ibet/user/favoriteCasinoGames.html?desktopVersion=2.31.7&locale=sr",
          {
            headers: {
              "X-Auth-Token": authToken,
              Utkn: utkn,
            },
          }
        );
        setFavoriteGames(result.data);

        // console.log(result);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };
    fetchFavoriteGame();
  }, [selectedComponent]);

  useEffect(() => {
    const fetchFavoriteGame = async () => {
      try {
        // const authToken = localStorage.getItem(
        //   "__ibet-mobile/_ionickv/auth-token"
        // );
        // const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

        // if (!authToken || !utkn) return;

        const result = await axios.get(
          "https://ibet2.365.rs/ibet/parametersData.json?mobileVersion=2.32.10.5"
          // {
          //   headers: {
          //     "X-Auth-Token": authToken,
          //     Utkn: utkn,
          //   },
          // }
        );
        setIparametars(result.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching user data:", error);
      }
    };
    fetchFavoriteGame();
  }, [selectedComponent]);

  return (
    <NavigationContext.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        provider,
        setProvider,
        activeButton,
        setActiveButton,
        isDesktopGameStarted,
        setIsDesktopGameStarted,
        desktopGameUrl,
        setDesktopGameUrl,
        currentGame,
        setCurrentGame,
        sport,
        setSport,
        favoriteGames,
        setFavoriteGames,
        accountUserName,
        setAccountUserName,
        user,
        setUser,
        iParametars,
        setIparametars,
        logoSTJson,
        setLogoSTJson,
        logoBJson,
        setLogoBJson,
        iUserInfo,
        setIuserInfo,
        freeBetInfo,
        setFreeBetInfo,
        liveSportToFilter,
        setLiveSportToFilter,
        // isUnique,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
