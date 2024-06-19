import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { fadeIn } from "../../theme/animations";
import CelebrationIcon from "@mui/icons-material/Celebration";
import axios from "axios";
// const data = [
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 24.5,
//     ccy: "din",
//     winDate: 1718652820000,
//     providerCode: "FAZI",
//     gameName: "Wild Hot 40 Free Spins",
//     gid: 4764,
//     gameId: "WildHot40FreeSpins",
//     transactionId: 171818199,
//   },
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 63,
//     ccy: "din",
//     winDate: 1718652830000,
//     providerCode: "FAZI",
//     gameName: "Wild Hot 40 Free Spins",
//     gid: 4764,
//     gameId: "WildHot40FreeSpins",
//     transactionId: 171818241,
//   },
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 2,
//     ccy: "din",
//     winDate: 1718653626000,
//     providerCode: "PRAG",
//     gameName: "Gems Bonanza",
//     gid: 3701,
//     gameId: "vs20goldfever",
//     transactionId: 171820522,
//   },
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 10,
//     ccy: "din",
//     winDate: 1718653710000,
//     providerCode: "PRAG",
//     gameName: "Gems Bonanza",
//     gid: 3701,
//     gameId: "vs20goldfever",
//     transactionId: 171820734,
//   },
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 40,
//     ccy: "din",
//     winDate: 1718653803000,
//     providerCode: "PRAG",
//     gameName: "Big Bass Splash",
//     gid: 2884,
//     gameId: "vs10txbigbass",
//     transactionId: 171821057,
//   },
//   {
//     firstname: "Test",
//     lastnameInitial: "T",
//     amount: 2180,
//     ccy: "din",
//     winDate: 1718653977000,
//     providerCode: "PRAG",
//     gameName: "Big Bass Splashlast",
//     gid: 2884,
//     gameId: "vs10txbigbass",
//     transactionId: 171821601,
//   },
// ];

// type GradientProps = {
//   gradientColors: string[];
// };
// const options = {
//   // @ts-ignore
//   shouldForwardProp: (prop) => prop !== "gradientColors",
// };

const CasinoWinners: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [winnings, setWinnings] = useState<object[]>([]);

  // const borderRadius = 6;
  // const RoundGradientBox = styled(
  //   Box,
  //   options
  // )<GradientProps>(({ gradientColors }) => ({
  //   position: "relative",
  //   border: "2px solid transparent",
  //   backgroundClip: "padding-box",
  //   borderRadius,
  //   width: "70%",
  //   backgroundColor: "#0D0D17",

  //   "&:after": {
  //     position: "absolute",
  //     top: -2,
  //     left: -2,
  //     right: -2,
  //     bottom: -2,
  //     background: `linear-gradient(to left, ${gradientColors.join(",")})`,
  //     content: '""',
  //     zIndex: -2,
  //     borderRadius,
  //   },
  // }));

  useEffect(() => {
    const fetchWinnings = async () => {
      try {
        const response = await axios.get(
          `https://ibet2.365.rs/ibet/lobby/latestWinningsList.json?gameType=casino&tid=0`
        );

        setWinnings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWinnings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % winnings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [winnings.length]);

  const displayedItems = winnings
    .slice(currentIndex, currentIndex + 4)
    .concat(winnings.slice(0, Math.max(0, currentIndex + 4 - winnings.length)));

  // const getGameImage = (gameId: string | undefined | number, item: any) => {
  //   // console.log("gameId", gameId);
  //   const gameIdentity = String(gameId)?.replace(/[^A-Z0-9]/gi, "");
  //   if (item.providerCode && item.providerCode !== "PRAG") {
  //     const gameProducer = item.providerCode.toLocaleLowerCase();
  //     const url = `https://ibet-365.com/content/slot-icons/${gameProducer}/${gameIdentity}.jpg`;
  //     return <img width={"100%"} height={"100%"} src={url} />;
  //   } else {
  //     const url = `https://ibet-365.com/content/slot-icons/pragmatic/${gameIdentity}.jpg`;
  //     // Handle the case where game.gameProducer is null or undefined
  //     return <img width={"100%"} height={"100%"} src={url} />;
  //   }
  // };

  const getGameImage = (gameId: string | undefined, item: any) => {
    // console.log("gameId", gameId);
    const gameIdentity = gameId?.replace(/[^A-Z0-9]/gi, "");
    if (item.providerCode) {
      const gameProducer = item.providerCode.toLocaleLowerCase();
      const url = `https://ibet-365.com/content/slot-icons/${gameProducer}/${gameIdentity}.jpg`;
      return <img width={"100%"} height={"100%"} src={url} alt={item.gameId} />;
    } else {
      // Handle the case where game.gameProducer is null or undefined
      return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        mb: 2,
        mt: 1,
      }}
    >
      <Box
        // width={"30%"}
        sx={{
          display: "flex",
          flexDirection: "row",
          //   border: "1px solid red",
          mb: 2,

          alignItems: "center",
          // marginLeft: isDesktop ? -3 : 0,
        }}
      >
        <CelebrationIcon
          sx={{ color: "orange", marginRight: 1 }}
        ></CelebrationIcon>
        <Typography fontSize={16}>
          <b>POSLEDNJI DOBICI</b>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#171b31",
          width: "100%",
          // mb: 1,
          // mt: 1,

          justifyContent: "space-between",
        }}
      >
        {displayedItems.map((item, index) => {
          const isLastItem: boolean = index === displayedItems.length - 1;
          return (
            <Box
              // @ts-ignore
              key={item.transactionId}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                // border: "1px solid white",
                p: 2,
                borderRadius: 4,
                animation: isLastItem ? `${fadeIn} 1s ease-in-out` : "none",
                backgroundColor: "#0D0D19",

                width: 260,
              }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  width: "26%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CardActionArea>
                  {
                    // @ts-ignore
                    getGameImage(item.gameId, item)
                  }
                </CardActionArea>
              </Card>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 2,
                }}
              >
                <Typography fontSize={14}>
                  {
                    // @ts-ignore
                    item.firstname
                  }
                </Typography>
                <Typography sx={{ color: "#FFC211", fontWeight: "bold" }}>
                  {
                    // @ts-ignore
                    item.amount.toFixed(2)
                  }{" "}
                  RSD
                </Typography>
                <Typography fontSize={12}>
                  {
                    // @ts-ignore
                    item.gameName
                  }
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CasinoWinners;
