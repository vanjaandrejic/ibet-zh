// import { FC, useContext, useEffect } from "react";
// import BetDataContext from "../store/bet-data-context";
// import fetchBetOptions from "../utils/api/get-ttg";

// const Statusticket: FC = () => {
//   const {
//     betPickMap,
//     betLines,
//     betPickGroupMap,
//     betMap,
//     setBetPickMap,
//     setBetLines,
//     setBetPickGroupMap,
//     setBetMap,
//   } = useContext(BetDataContext);

//   console.log("pcikmap", betPickMap);
//   console.log("LINESSSS", betLines);
//   console.log("pmgr", betPickGroupMap);
//   console.log("betmap", betMap);

//   useEffect(() => {
//     fetchBetOptions(setBetPickMap, setBetLines, setBetPickGroupMap, setBetMap);
//   }, [setBetLines, setBetMap, setBetPickGroupMap, setBetPickMap]);
//   return <div>Statusticket</div>;
// };

// export default Statusticket;
