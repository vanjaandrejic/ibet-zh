import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";

interface CasinoLiveNavigationProps {
  activeButton: string;
  setActiveButton: (sortValue: string) => void;
  handleSort: (sortValue: string) => void;
}

const CasinoLiveNavigation: FC<CasinoLiveNavigationProps> = ({
  handleSort,
  activeButton,
  setActiveButton,
}) => {
  const handleSortClick = (sortValue: string) => {
    setActiveButton(sortValue);
    handleSort(sortValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        marginBottom: 2,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
          minWidth: "fit-content",
          margin: 1,
        }}
        spacing={1}
      >
        {[
          { sortValue: "3100", label: "Rulet uživo online" },
          { sortValue: "3200", label: "Blackjack uživo" },
          { sortValue: "3700", label: "Igre uživo" },
          { sortValue: "3800", label: "Poker uživo" },
          { sortValue: "3900", label: "Baccarat & sic bo" },
        ].map((button, index) => (
          <Grid item key={index} sx={{ marginBottom: 1 }}>
            <Button
              sx={{
                width: 100,
                height: 30,
                backgroundColor:
                  activeButton === button.sortValue
                    ? "#f1b812 !important"
                    : null,
              }}
              variant={activeButton === button.sortValue ? "contained" : "text"}
              onClick={() => handleSortClick(button.sortValue)}
            >
              <Typography
                fontSize={9}
                color={activeButton === button.sortValue ? "black" : "white"}
                textTransform={"uppercase"}
                textAlign={"center"}
              >
                <b>{button.label}</b>
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CasinoLiveNavigation;
