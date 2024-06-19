export interface CasinoWholeGame {
  sortValue: string;
  casinoRooms: CasinoRoom[];
  casinoGame: CasinoGameClass;
  evolutionGameExtraDetails: null;
}

export interface CasinoGameClass {
  gameId: string;
  provider: string;
  gameName: string;
  description: null;
  type: Type;
  active: boolean;
  orderNumber: number;
  favorite: boolean;
  newGame: boolean;
  demoAvailable: boolean;
  freeBetAvailable: boolean;
  mobile: string;
  html5: boolean;
  flash: boolean;
  hd: boolean;
  gameInfo: null;
  gameProducer: string;
  gameURL: null;
  externalGameID: string;
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

export interface Type {
  value: string;
  desc: string;
  order: number;
}

export interface CasinoRoom {
  code: string;
  label: string;
  sortValue: string;
  iLobbyCasinoGameSortValue: string;
  isWidget: boolean;
  gameCount: number;
  tag: null;
  imageId: null;
  imageFileType: null;
}
