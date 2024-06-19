// import { FC, useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   CircularProgress,
//   colors,
// } from "@mui/material";
// import TicketItem from "../components/ticket/ticket-item";
// import { TicketMatch } from "../types/match";
// import { formatter } from "../utils/common";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import AppContext from "../store/app-context";
// import { TicketResponse } from "../types/ticket";

// const TicketPage: FC = () => {
//   const [totalOdd, setTotalOdd] = useState<number>(1);
//   const [betAmount, setBetAmount] = useState<number>(0);
//   const [tickets, setTickets] = useState<TicketMatch[]>([]);
//   const [ticketResponse, setTicketResponse] = useState<TicketResponse>(
//     {} as TicketResponse
//   );

//   console.log("tickets", ticketResponse.ticket);

//   const { ticketMatches, clearTicket } = useContext(AppContext);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const savedTickets = localStorage.getItem("tickets");
//     if (savedTickets) {
//       setTickets(JSON.parse(savedTickets));
//     }
//   }, []);

//   useEffect(() => {
//     let calculatedOdd = 1;
//     tickets.forEach((match: TicketMatch) => {
//       calculatedOdd *= match.selectedOdd?.odd || 1;
//     });
//     setTotalOdd(calculatedOdd);
//   }, [tickets]);

//   const betAmountValue = isNaN(betAmount) ? 0 : betAmount;
//   const potentialWinning = totalOdd * betAmountValue;

//   const handleBetAmountChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const amount = parseFloat(event.target.value);
//     setBetAmount(isNaN(amount) ? 0 : amount);
//   };

//   const generateTicketObject = () => {
//     if (!tickets || tickets.length === 0) {
//       return;
//     }

//     // Pravimo prazan niz za "systems"
//     const systems = [];

//     // Dodajemo jedan objekat u "systems" sa "hits" od 4 za svaki tiket
//     systems.push({
//       hits: [tickets.length],
//       matches: tickets.map((item) => ({
//         code: item.matchCode,
//         tipTypes: [
//           {
//             code: item.selectedOdd.code,
//             odd: item.selectedOdd.odd,
//             specialValue: null,
//             live: false,
//             betPickCode: item.selectedOdd.betPickCode,
//             betCode: item.selectedOdd.tipTypeCode,
//             betPickGroupId: item.selectedOdd.betPickGroupId,
//             tipTypeCode: item.selectedOdd.betCode,
//           },
//         ],
//       })),
//     });

//     const tJsonObject = {
//       payin: betAmountValue,
//       systems,
//       apiVersion: "v3",
//       uuid: uuidv4(),
//     };

//     const createdObject = {
//       tjson: JSON.stringify(tJsonObject),
//       c: true,
//       freeBet: false,
//       expressTicketEnable: true,
//     };

//     return createdObject;
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const generateFormDataFromObject = (obj: any) => {
//     const formData = new URLSearchParams();

//     Object.keys(obj).forEach((key) => {
//       if (typeof obj[key] === "object" && obj[key] !== null) {
//         // Ako je vrednost objekat, prolazimo kroz svoje ključeve i dodajemo ih kao FormData
//         Object.keys(obj[key]).forEach((subKey) => {
//           formData.append(`${key}[${subKey}]`, obj[key][subKey]);
//         });
//       } else {
//         // Inače, dodajemo vrednost kao običan ključ-vrednost u FormData
//         formData.append(key, obj[key]);
//       }
//     });

//     return formData;
//   };

//   const sendTicket = async () => {
//     setIsLoading(true);
//     try {
//       const authToken = localStorage.getItem(
//         "__ibet-mobile/_ionickv/auth-token"
//       );
//       const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");

//       if (!authToken || !utkn) return;

//       const tjson = generateTicketObject();

//       // console.log(tjson);

//       // Konvertujemo objekat u FormData
//       const formData = generateFormDataFromObject(tjson);

//       const result = await axios.post(
//         "https://ibet2.365.rs/ibet/saveTicketAsyncBet.json",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           params: {
//             mobileVersion: "2.27.33",
//             locale: "sr",
//           },
//         }
//       );
//       setTicketResponse(result.data);
//       clearTicket();
//       setIsLoading(false);
//       console.log("Ticket successfully sent:", result);
//     } catch (error) {
//       console.error("Error sending ticket:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {ticketMatches.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table aria-label="customized table">
//             <TableHead />
//             <TableBody>
//               {ticketMatches.map((ticket, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <TicketItem match={ticket} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Box
//             marginTop={4}
//             width="100%"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "16px",
//             }}
//           >
//             <TextField
//               label="Uplata"
//               variant="outlined"
//               value={betAmountValue}
//               onChange={handleBetAmountChange}
//             />
//             <Box marginTop={2}>
//               <Typography>Ukupna kvota: {totalOdd.toFixed(2)}</Typography>
//               <Typography>
//                 Mogući dobitak: {formatter.format(potentialWinning)}
//               </Typography>
//             </Box>
//             <Button
//               size="large"
//               variant="outlined"
//               sx={{ marginTop: 2 }}
//               onClick={() => sendTicket()}
//             >
//               Uplati
//             </Button>
//           </Box>
//         </TableContainer>
//       ) : (
//         <Box
//           height="800px"
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {Object.keys(ticketResponse).length > 0 ? (
//             <Box
//               sx={{
//                 display: "flex",
//                 textAlign: "center",
//                 flexDirection: "column",
//               }}
//             >
//               {isLoading ? (
//                 <CircularProgress />
//               ) : (
//                 <>
//                   <Typography variant="h4" color={colors.yellow[700]}>
//                     Uspesno ste uplatili tiket, kod vaseg tiketa:
//                   </Typography>
//                   <Typography variant="h3">
//                     {ticketResponse.ticket.code}
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           ) : (
//             <Typography variant="h4" color={colors.yellow[700]}>
//               Niste izabrali ni jedan par!
//             </Typography>
//           )}
//         </Box>
//       )}
//     </>
//   );
// };

// export default TicketPage;
