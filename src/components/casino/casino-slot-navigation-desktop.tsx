import { Box, Button, Typography, styled } from "@mui/material";
import { FC } from "react";

type GradientProps = {
  gradientColors: string[];
};

const options = {
  // @ts-ignore
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

interface CasinoSlotNavigationDesktopProps {
  activeButton: string;
  setActiveButton: (sortValue: string) => void;
  handleSort: (sortValue: string) => void;
}

const CasinoSlotNavigationDesktop: FC<CasinoSlotNavigationDesktopProps> = ({
  handleSort,
  activeButton,
  setActiveButton,
}) => {
  const handleSortClick = (sortValue: string) => {
    setActiveButton(sortValue);
    handleSort(sortValue);
  };

  const borderRadius = 4;
  const RoundGradientBox = styled(
    Box,
    options
  )<GradientProps>(({ gradientColors }) => ({
    position: "relative",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    borderRadius,
    width: "70%",
    backgroundColor: "#0D0D17",
    padding: "0.4%",

    "&:after": {
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: `linear-gradient(to left, ${gradientColors.join(",")})`,
      content: '""',
      zIndex: -1,
      borderRadius,
    },
  }));

  return (
    <RoundGradientBox
      gradientColors={["#08080F", "#171B31"]}
      sx={{
        width: "88%",
        // overflowX: "auto",
        marginBottom: 2,
        display: "flex",
        justifyContent: "space-between",
        // height: "fit-content",
        // backgroundColor: "#171b31",
      }}
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
        <Button
          key={index}
          sx={{
            // width: 100,
            // height: 30,
            // minHeight: 30,
            // backgroundColor:
            //   activeButton === button.sortValue
            //     ? "#f1b812 !important"
            //     : "transparent !important",

            color: activeButton === button.sortValue ? "#FFC211" : "white",
          }}
          onClick={() => handleSortClick(button.sortValue)}
        >
          {activeButton === button.sortValue ? (
            <Typography
              fontSize={12}
              color={activeButton === button.sortValue ? "#FFC211" : "white"}
              textTransform={"uppercase"}
              textAlign={"center"}
            >
              <b>{button.label}</b>
            </Typography>
          ) : (
            <Typography
              fontSize={12}
              color={activeButton === button.sortValue ? "#FFC211" : "white"}
              textTransform={"uppercase"}
              textAlign={"center"}
            >
              {button.label}
            </Typography>
          )}
        </Button>
      ))}
    </RoundGradientBox>
  );
};

export default CasinoSlotNavigationDesktop;
