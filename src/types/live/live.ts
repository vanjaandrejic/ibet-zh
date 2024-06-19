export interface LiveSports {
  sport: string;
  sportSortValue: string;
  matchsCount: number;
}

export interface LiveResults {
  mi: number;
  mc: number;
  rt: string;
  p: string;
  cm: string;
  hs: { [key: string]: number };
  as: { [key: string]: number };
  lct: number;
  rpt?: number;
  spl?: string;
}

export interface LiveBets {
  id: number;
  bc: number;
  mId: number;
  mc: number;
  sv: string;
  st: string;
  d: boolean;
  om: { [key: string]: Om };
  lct: number;
  ov?: string;
}

export interface Om {
  ov: number;
  bpc: number;
}

export interface LiveHeaders {
  id: number;
  r: number;
  mc: number;
  h: string;
  a: string;
  lg: string;
  s: string;
  sn: string;
  ssv: string;
  kot: number;
  ls: string;
  liv: boolean;
  lct: number;
  eid: string;
  ba: boolean;
  mte: boolean;
  fd: string;
  lid: number;
  gr: string;
  bd: boolean;
  tvd: string;
  hbm: boolean;
  grl: string;
  tm: boolean;
}
