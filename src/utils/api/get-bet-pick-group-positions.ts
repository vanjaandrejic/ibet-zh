import axios from "axios";

const getBetPickGroupPositions = async (
  // @ts-ignore
  setBetPickGroupPositions: (data: any) => void
) => {
  try {
    const response = await axios.get(
      "https://ibet2.365.rs/restapi/offer/zh/bp",
      {
        params: {
          mobileVersion: "2.27.33",
          locale: "sr",
          annex: 0,
        },
      }
    );

    // console.log(JSON.stringify(response.data.betPages));

    setBetPickGroupPositions(response.data.betPages);
    // @ts-ignore
    // const filteredPosition: BetPickGroupPosition = Object.entries(
    //   // response.data.betPages["MOBILE_PREMATCH_TOP"]
    //   response.data.betPages[betPagesKey]
    // ).filter(([key]) => key === sportId);

    // setBetPickGroupPositions(
    //   // @ts-ignore
    //   filteredPosition[0][1]["DEFAULT"][0]["betPickGroupPositions"]
    // );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getBetPickGroupPositions;
