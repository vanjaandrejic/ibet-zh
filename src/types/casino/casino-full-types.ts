export interface CasinoResponseData {
  code: string;
  name: string;
  implementationName: string;
  order: number;
  gamesCount: number;
  lobbyCasinoGames: LobbyCasinoGame[];
  casinoRooms: CasinoRoom[];
  // @ts-ignore
  roomTags: any[];
  hasNewGames: boolean;
  hasFavoriteGames: boolean;
  hasBonusGames: boolean;
}

export interface CasinoRoom {
  code: Code;
  label: Label;
  sortValue: string;
  iLobbyCasinoGameSortValue: string;
  isWidget: boolean;
  gameCount: number;
  tag: null;
  imageId: null;
  imageFileType: null;
}

export enum Code {
  BonusBuy = "bonus-buy",
  BookOf = "book-of",
  Grebgreb = "grebgreb",
  Izbor = "izbor",
  Megaways = "megaways",
  Najbolje = "najbolje",
  NoveIgre = "nove-igre",
  Online = "online",
  Progressive = "progressive",
  Stolovi = "stolovi",
}

export enum Label {
  BonusBuy = "BONUS BUY",
  BookOf = "BOOK OF...",
  GrebGreb = "GREB GREB",
  Megaways = "MEGAWAYS",
  NoveIgre = "NOVE IGRE",
  OnlineSlotovi = "ONLINE SLOTOVI",
  Popularno = "POPULARNO",
  ProgressiveJackpot = "PROGRESSIVE JACKPOT",
  Stolovi = "STOLOVI",
  The365Izbor = "365  IZBOR",
}

export interface LobbyCasinoGame {
  sortValue: string;
  casinoRooms: CasinoRoom[];
  casinoGame: CasinoGame;
  evolutionGameExtraDetails: null;
}

export interface CasinoGame {
  gameId: string;
  provider: Provider;
  gameName: string;
  description: null | string;
  type: Type;
  active: boolean;
  orderNumber: number;
  favorite: boolean;
  newGame: boolean;
  demoAvailable: boolean;
  freeBetAvailable: boolean;
  mobile: Mobile;
  html5: boolean;
  flash: boolean;
  hd: boolean;
  gameInfo: null | string;
  gameProducer: string;
  gameURL: null;
  externalGameID: null | string;
  usedInJackpot: boolean;
  hasCashback: boolean;
  provisionTag: string;
  gid: number;
  taxTag: null;
  groupTag: null;
  categoryTag: null;
  depositUnlockDisable: boolean;
  inTournament: boolean;
}

export enum Mobile {
  C = "C",
  M = "M",
  S = "S",
}

export enum Provider {
  Casimi = "CASIMI",
  Evoplay = "EVOPLAY",
  Fazi = "FAZI",
  Gameart = "GAMEART",
  Habanero = "HABANERO",
  Prag = "PRAG",
}

export interface Type {
  value: Value;
  desc: Desc;
  order: number;
}

export enum Desc {
  CardGames = "Card games",
  ClassicSlot = "Classic slot",
  LiveGames = "Live games",
  ScratchCard = "Scratch card",
  TableGames = "Table games",
  VideoPoker = "Video poker",
  VideoSlot = "Video slot",
}

export enum Value {
  CG = "cg",
  CS = "cs",
  Lg = "lg",
  Sc = "sc",
  Tg = "tg",
  Vp = "vp",
  Vs = "vs",
}
