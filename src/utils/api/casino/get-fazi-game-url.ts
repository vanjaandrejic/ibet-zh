const getFaziGameUrl = async (gameName: string, demo: boolean) => {
  // Dobavljanje vrednosti iz lokalnog skladišta
  const authToken = localStorage.getItem("__ibet-mobile/_ionickv/auth-token");
  const playerId = localStorage.getItem("__ibet-mobile/_ionickv/uuid");

  // Postavljanje moneyType u zavisnosti od demo parametra
  const moneyType = demo ? 0 : 1;

  // Kreiranje URL-a
  const baseUrl = "https://dualsoft365.fazi.rs/Home/IntegrationGameLaunchCcy";
  const tokenParam = `token=${authToken}`;
  const gameNameParam = `gameName=${gameName}`;
  const playerIdParam = `integrationPlayerID=${playerId}`;
  const moneyTypeParam = `moneyType=${moneyType}`;
  const otherParams =
    "integrationType=2&platform=mobile&languageCode=eng&currency=rsd";

  // Ako je demo verzija igre, dodaj demo parametar
  const demoParam = demo ? "0" : "1";

  // Sastavljanje URL-a
  const url = `${baseUrl}?${tokenParam}&${gameNameParam}&${playerIdParam}&${moneyTypeParam}&${demoParam}&${otherParams}`;

  return url;
};

export default getFaziGameUrl;
