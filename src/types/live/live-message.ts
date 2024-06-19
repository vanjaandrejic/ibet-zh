export interface LiveMessage {
  liveSports: LiveSport[];
  liveHeaders: LiveHeader[];
  liveResults: LiveResult[];
  liveBets: LiveBet[];
}

export interface LiveBet {
  id: number;
  bc: number;
  mId: number;
  mc: number;
  sv?: string;
  st: St;
  d: boolean;
  om: { [key: string]: Om };
  lct: number;
}

export interface Om {
  ov: number;
  bpc: number;
}

export enum St {
  L = "L",
  U = "U",
}

export interface LiveHeader {
  id: number;
  r: number;
  mc: number;
  h: string;
  a: string;
  lg: string;
  lsv?: string;
  s: S;
  sn: Sn;
  ssv: string;
  kot: number;
  ls: Ls;
  liv: boolean;
  lct: number;
  bri?: number;
  eid: string;
  ba: boolean;
  mte: boolean;
  fd: Fd;
  lid: number;
  gr: string;
  bd: boolean;
  tvd: string;
  hbm: boolean;
  grl: string;
  tm: boolean;
}

export enum Fd {
  Ba11 = "BA:1:1",
}

export enum Ls {
  Running = "RUNNING",
  Stopped = "STOPPED",
}

export enum S {
  S = "S",
}

export enum Sn {
  Fudbal = "FUDBAL",
}

export interface LiveResult {
  mi: number;
  mc: number;
  rt: Rt;
  p: string;
  cm: string;
  hs: { [key: string]: number };
  as: { [key: string]: number };
  lct: number;
  rpt?: number;
  spl?: string;
}

export enum Rt {
  TwoHalfTimes = "TwoHalfTimes",
}

export interface LiveSport {
  sport: string;
  sportSortValue: string;
  matchsCount: number;
}
