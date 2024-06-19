import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FC, useContext } from "react";
import NavigationContext from "../../store/navigation-context";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#2F3B4B",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#FFC211" : "#FFC211",
  },
}));

const UserLoyaltyCard: FC = () => {
  const { accountUserName } = useContext(NavigationContext);

  const isDesktop = useMediaQuery("(min-width:1024px)");
  const location = useLocation();

  const isCasinoPage = location.pathname === "/slot";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: isDesktop ? "90%" : "90%",
        mt: 4,
        ml: isCasinoPage ? 0 : 2,
        // width: 200,
        pl: 0.5,
        pr: 0.5,
        pb: 4,
        border: "1px solid #15151E",
        // border: "1px solid red",
        borderRadius: 3,
        backgroundColor: "#0D0D19",
      }}
    >
      <StarIcon
        sx={{
          mt: "-7%",
          width: 40,
          height: 40,
          color: "#D9D9D9",
        }}
      />
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
        <Typography>
          <b>{accountUserName.substring(0, 10)}</b>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography fontSize={14}>Level 1</Typography>
          <Typography fontSize={14} sx={{ color: "#FFC211", ml: 1 }}>
            <b>50.00%</b>
          </Typography>
        </Box>
      </Box>
      {/* progressbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
        }}
      >
        <Box
          sx={{
            mr: -0.2,
            width: 24,
            height: 24,
            backgroundColor: "#FFC211",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <b>1</b>
        </Box>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={50} />
        </Stack>
        <Box
          sx={{
            ml: -0.1,
            width: 24,
            height: 24,
            backgroundColor: "#2F3B4B",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b>2</b>
        </Box>
      </Box>
      {/* progressbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          //   border: "1px solid blue",
          mb: 2,
          mt: 1,
        }}
      >
        <Typography fontSize={14}>Bonus</Typography>

        <Typography sx={{ color: "#FFC211", ml: 1 }}>
          <b>10,000rsd</b>
        </Typography>
      </Box>
      <Button
        sx={{ width: "80%", borderRadius: 2, backgroundColor: "#FF581D" }}
      >
        <Typography
          sx={{
            textTransform: "none",

            color: "white",
          }}
        >
          <b>Preuzmi bonus</b>
        </Typography>
      </Button>
    </Box>
  );
};

export default UserLoyaltyCard;
