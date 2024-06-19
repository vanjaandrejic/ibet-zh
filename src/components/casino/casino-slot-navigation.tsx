import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";

interface CasinoSlotNavigationProps {
  activeButton: string;
  setActiveButton: (sortValue: string) => void;
  handleSort: (sortValue: string) => void;
}

const CasinoSlotNavigation: FC<CasinoSlotNavigationProps> = ({
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
        height: "fit-content",
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
          { sortValue: "2100", label: "Nove Igre" },
          { sortValue: "2130", label: "Popularno" },
          { sortValue: "2300", label: "Online Slotovi" },
          { sortValue: "2350", label: "Progressive Jackpot" },
          { sortValue: "2400", label: "Book Of" },
          { sortValue: "2500", label: "365 izbor" },
          { sortValue: "2550", label: "Stolovi" },
          { sortValue: "2650", label: "Megaways" },
          { sortValue: "2700", label: "Bonus Buy" },
          { sortValue: "2900", label: "Greb Greb" },
        ].map((button, index) => (
          <Grid item key={index} sx={{ marginBottom: 1 }}>
            <Button
              sx={{
                width: 100,
                height: 30,
                minHeight: 30,
                backgroundColor:
                  activeButton === button.sortValue
                    ? "#f1b812 !important"
                    : "transparent !important",
              }}
              onClick={() => handleSortClick(button.sortValue)}
            >
              <Typography
                fontSize={8}
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

export default CasinoSlotNavigation;
