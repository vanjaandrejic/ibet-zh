import { Dispatch, SetStateAction, createContext } from "react";
import { currentGame } from "../pages/casino-page";
import { User } from "../types/user";

interface NavigationContextType {
  selectedComponent: string;
  provider: string;
  activeButton: string;
  isDesktopGameStarted: boolean;
  desktopGameUrl: string;
  currentGame: currentGame;
  sport: string;
  freeBetInfo: object;
  setFreeBetInfo: Dispatch<SetStateAction<object>>;
  setCurrentGame: Dispatch<SetStateAction<currentGame>>;
  setDesktopGameUrl: Dispatch<SetStateAction<string>>;
  setIsDesktopGameStarted: Dispatch<SetStateAction<boolean>>;
  setSelectedComponent: Dispatch<SetStateAction<string>>;
  setProvider: Dispatch<SetStateAction<string>>;
  setActiveButton: Dispatch<SetStateAction<string>>;
  setSport: Dispatch<SetStateAction<string>>;
  favoriteGames: object;
  setFavoriteGames: Dispatch<SetStateAction<object>>;
  accountUserName: string;
  setAccountUserName: Dispatch<SetStateAction<string>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  iParametars: object;
  setIparametars: Dispatch<SetStateAction<object>>;
  logoSTJson: object[];
  setLogoSTJson: Dispatch<SetStateAction<object[]>>;
  logoBJson: object[];
  setLogoBJson: Dispatch<SetStateAction<object[]>>;
  iUserInfo: any | null;
  setIuserInfo: Dispatch<SetStateAction<any | null>>;
  liveSportToFilter: string | null;
  setLiveSportToFilter: Dispatch<SetStateAction<string | null>>;
}

const NavigationContext = createContext<NavigationContextType>({
  selectedComponent: "",
  provider: "",
  activeButton: "",
  isDesktopGameStarted: false,
  desktopGameUrl: "",
  currentGame: { gameId: "", provider: "", demo: false },
  sport: "",
  favoriteGames: {},
  accountUserName: "",
  user: null,
  iParametars: {},
  logoSTJson: [],
  logoBJson: [],
  iUserInfo: {},
  freeBetInfo: {},
  liveSportToFilter: "",
  setLiveSportToFilter: () => {},
  setFreeBetInfo: () => {},
  setFavoriteGames: () => {},
  setCurrentGame: () => {},
  setIsDesktopGameStarted: () => {},
  setDesktopGameUrl: () => {},
  setSelectedComponent: () => {},
  setProvider: () => {},
  setActiveButton: () => {},
  setSport: () => {},
  setAccountUserName: () => {},
  setUser: () => {},
  setIparametars: () => {},
  setLogoSTJson: () => {},
  setLogoBJson: () => {},
  setIuserInfo: () => {},
});

export default NavigationContext;
