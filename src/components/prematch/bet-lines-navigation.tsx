// import { Box, Button, Typography } from "@mui/material";
// import { FC } from "react";
// import { BetLines } from "../../types/bet";

// interface BetLinesNavigationProps {
//   selectedButtonCode?: string;
//   filteredBetLines: BetLines[];
//   matchedOdds: object;
//   setSelectedButtonCode?: (code: string) => void;
//   setFilteredMatchedOdds?: (matchedOddsByNameWithKeys: object) => void;
// }

// const BetLinesNavigation: FC<BetLinesNavigationProps> = ({
//   selectedButtonCode,
//   filteredBetLines,
//   matchedOdds: matchedOddsByNameWithKeys,
//   setSelectedButtonCode,
//   setFilteredMatchedOdds: setFilteredMatchedOddsByNameWithKeys,
// }) => {
//   const handleButtonNavClick = (code: string) => {
//     setSelectedButtonCode(code);
//     // Ako je kliknuto dugme "Sve", jednostavno postavite filtrirane kvote na iste kao nefiltrirane
//     if (code === "Sve") {
//       setFilteredMatchedOddsByNameWithKeys(matchedOddsByNameWithKeys);
//     } else {
//       // Inače, filtrirajte kvote na osnovu koda koji odgovara kliknutom dugmetu
//       const filteredOdds: any = {};

//       Object.entries(matchedOddsByNameWithKeys).forEach(([key, value]) => {
//         if (value.code === parseInt(code)) {
//           filteredOdds[key] = value;
//         }
//       });

//       // Ažurirajte stanje filtriranih kvota
//       setFilteredMatchedOddsByNameWithKeys(filteredOdds);
//     }
//   };
//   return (
//     <Box sx={{ display: "flex", flexDirection: "row" }}>
//       <Button
//         fullWidth
//         variant={selectedButtonCode === "Sve" ? "contained" : "outlined"}
//         onClick={() => handleButtonNavClick("Sve")}
//       >
//         Sve
//       </Button>
//       {filteredBetLines.map((line: any) => {
//         return (
//           <Button
//             size="large"
//             fullWidth
//             variant={
//               selectedButtonCode === line.code ? "contained" : "outlined"
//             }
//             key={line.code}
//             onClick={() => handleButtonNavClick(line.code)}
//           >
//             <Typography fontSize={12}>{line.name}</Typography>
//           </Button>
//         );
//       })}
//     </Box>
//   );
// };

// export default BetLinesNavigation;
