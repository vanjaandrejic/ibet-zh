export interface Welcome {
  systemTime: string;
  elasticTook: number;
  id: string;
  name: string;
  description: null;
  type: string;
  esMatches: Match[];
  totalMatchCount: null;
}

export interface Match {
  id: number;
  matchCode: number;
  home: string;
  away: string;
  kickOffTime: number;
  status: number;
  blocked: boolean;
  favourite: boolean;
  odds: { [key: string]: number };
  params: Params;
  sport: string;
  leagueId: number;
  leagueName: string;
  leagueToken: string;
  leagueRiskLevel: number;
  round: number;
  oddsCount: number;
  matchInfo: string;
  ticketPrintType: number;
  leagueGroupToken: string;
  leagueGroupId: number;
  tmstmp: number;
  live: boolean;
  superMatch: boolean;
  bonusDisabled: boolean;
  homeId: number;
  awayId: number;
}

export interface Params {
  firstGoalMinutes: string;
  hd2: string;
  handicap2: string;
}

// ticket match

export interface TicketMatch {
  id: number;
  matchCode: number;
  home: string;
  away: string;
  kickOffTime: number;
  status?: number;
  blocked: boolean;
  favourite?: boolean;
  odds?: { [key: string]: number };
  params?: Params;
  sport: string;
  leagueId: number;
  leagueName: string;
  leagueToken: string;
  leagueRiskLevel?: number;
  round: number;
  oddsCount?: number;
  matchInfo?: string;
  ticketPrintType?: number;
  leagueGroupToken: string;
  leagueGroupId?: number;
  tmstmp: number;
  live: boolean;
  superMatch?: boolean;
  bonusDisabled: boolean;
  brMatchId?: number;
  homeId?: number;
  awayId?: number;
  selectedOdd: SelectedOdd;
}

export interface Params {
  firstGoalMinutes: string;
  hd2: string;
  handicap2: string;
}

export interface SelectedOdd {
  code?: number;
  odd?: number;
  specialValue?: number | null;
  live?: boolean;
  betPickCode?: number;
  betCode?: number;
  betPickGroupId?: number;
  tipTypeCode?: number;
}
