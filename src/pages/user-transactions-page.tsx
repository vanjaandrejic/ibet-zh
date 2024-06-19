import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { formatKickOffTime } from "../utils/common";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const UserTransactionsPage: FC = () => {
  const [transactions, setTransactions] = useState<any[] | undefined>();

  // Define transactions as an array or undefined

  const [daysParam, setDaysParam] = useState<string>("7");
  const [page, setPage] = useState<number>(1);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const authToken = localStorage.getItem(
  //         "__ibet-mobile/_ionickv/auth-token"
  //       );
  //       const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");
  //       const response = await axios.get(
  //         `https://www.365.rs/ibet/profile/transactions.html`,
  //         {
  //           params: {
  //             mobileVersion: "2.27.33",
  //             locale: "sr",
  //           },
  //           headers: {
  //             "X-Auth-Token": authToken,
  //             Utkn: utkn,
  //           },
  //         }
  //       );
  //       setTransactions(response.data.transactionsWithCount.transactions);
  //       // setTransactions(response.data.matches);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, []);

  useEffect(() => {
    const fetchPutTransactions = async () => {
      try {
        const authToken = localStorage.getItem(
          "__ibet-mobile/_ionickv/auth-token"
        );
        const utkn = localStorage.getItem("__ibet-mobile/_ionickv/utkn");
        const response = await axios.put(
          `https://ibet2.365.rs/ibet/profile/transactions.html?mobileVersion=2.32.10.5&locale=sr`,
          {
            accountType: "INTERNET",
            days: daysParam,
            page: page,
            transactionType: "A",
          },
          {
            headers: {
              "X-Auth-Token": authToken,
              Utkn: utkn,
            },
          }
        );
        setTransactions(response.data.transactionsWithCount.transactions);
        // setTransactions(response.data.matches);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPutTransactions();
  }, [daysParam, page]);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: 800,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          mb: 1,
        }}
      >
        <Typography fontSize={16}>
          <b>Transakcije</b>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          mb: 1,
        }}
      >
        {[
          {
            value: "7",
            label: "7 dana",
            bcgColor: "#FFC211",
            textColor: "black",
          },
          {
            value: "30",
            label: "30 dana",
            bcgColor: "#FFC211",
            textColor: "black",
          },
        ].map((button, index) => (
          <Button
            key={index}
            variant={"contained"}
            sx={{
              width: "32%",
              m: 0.5,
              // alignItems: "flex-start",
              backgroundColor:
                daysParam === button.value ? button.bcgColor : "#121425",
              "&:hover": {
                backgroundColor:
                  daysParam === button.value ? button.bcgColor : "#121425",
              },
              "&:active": {
                backgroundColor:
                  daysParam === button.value ? button.bcgColor : "#121425",
              },
            }}
            onClick={() => setDaysParam(button.value)}
          >
            <Typography
              fontSize={12}
              color={daysParam === button.value ? button.textColor : "white"}
              textTransform={"none"}
              textAlign={"center"}
            >
              <b>{button.label}</b>
            </Typography>
          </Button>
        ))}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#121425",
            mr: 1,
            maxWidth: 30,
            maxHeight: 30,
            minWidth: 30,
            minHeight: 30,
          }}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#121425",
            mr: 1,
            maxWidth: 30,
            maxHeight: 30,
            minWidth: 30,
            minHeight: 30,
          }}
          onClick={() => setPage(page + 1)}
          // disabled={
          //   visibleStartIndex >= visibleProviders.length - visibleCount
          // }
        >
          <ChevronRight />
        </Button>
      </Box>

      {transactions && ( // Check if transactions is not undefined
        <Grid container spacing={2}>
          {transactions.map((item: any, index) => {
            return (
              <Grid
                key={index}
                item
                width={"100%"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    // border: "1px solid gray",
                    borderRadius: 1,
                  }}
                >
                  <Typography>
                    {formatKickOffTime(item.transactionDate)}
                  </Typography>
                  {item.applicationName ? item.applicationName : "Tiket"}

                  <Typography
                    sx={{
                      color:
                        item.transactionType === "WIN" ||
                        item.transactionSubType === "WIN"
                          ? "green"
                          : null,
                    }}
                  >
                    {item.amount.toFixed(2)}RSD
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default UserTransactionsPage;
