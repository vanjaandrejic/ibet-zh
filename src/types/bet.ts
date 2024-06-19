export interface BetMap {
  [key: string]: {
    code: number;
    caption: string;
    useSpecifiers: boolean;
    displaySpecifiers: null;
    sport: string;
    orderNumber: number;
  };
}

export interface BetLines {
  code: number;
  name: string;
  orderNumber: number;
}

export interface BetPickGroupMap {
  [key: string]: {
    id: number;
    description: string;
    favorite: boolean;
    handicapParam: string;
    specialBetValueTypes: string[];
    name: string;
    orderNumber: number;
    tipTypes: number[];
    formatCode: number;
    lineCode: number;
    hideHeader: boolean;
    specialValuePosition: null;
    sport: string;
    picksPerRow: number;
    initialCollapsed: boolean;
    showOnMain: boolean;
    showOnMobileMain: boolean;
    showOnSpecial: boolean;
    showOnSuper: boolean;
    showOnHeader: boolean;
    hidePicksWithoutOdd: boolean;
    displaySpecifiers: null;
    betMedTranslation: null;
    active: boolean;
    picks: Pick[];
    displayType: null;
  };
}

export interface Pick {
  betPickCode: number;
  specValue: null;
}

export interface BetPickMap {
  [key: string]: {
    label: string;
    caption: string;
    tipTypeCode: number;
    betPickCode: number;
    betCode: number;
    position: null;
    tipTypeTag: string;
    mainType: boolean;
    displaySpecifiers: null;
    tipTypeName: string;
    betMedCaption: null;
  };
}

export interface BetPickGroupPosition {
  [key: string]: {
    betPickGroupId: number;
    rowPosition: number;
    columnPosition: number;
    picksPerRow: number;
    specialValuePosition: string;
    phasePosition: string;
    specialBetValueAlgType: string;
    grouping: boolean;
  };
}
