import { FC, useContext, useState } from "react";
import MatchItem from "../matches/match-item";
import {
  CircularProgress,
  Box,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import MatchesContext from "../../store/matches-context";

const TopMatchesHomepageShortcut: FC<{ sport: string }> = ({ sport }) => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const visibleCount = 3; // Number of items to show at once
  const navigate = useNavigate();

  const { topMatches, isLoading } = useContext(MatchesContext);

  //   console.log(topMatches);

  const handleNext = () => {
    setVisibleStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, topMatches.length - visibleCount)
    );
  };

  const handlePrev = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleTopMatches = topMatches.slice(
    visibleStartIndex,
    visibleStartIndex + visibleCount
  );

  return (
    <Box
      width={isDesktop ? "90%" : "100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: isDesktop ? null : "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: isDesktop ? null : "90%",
            mr: isDesktop ? 1.4 : 0,
          }}
        >
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#121425",
                mr: 1,
                maxWidth: 36,
                maxHeight: 36,
                minWidth: 36,
                minHeight: 36,
              }}
              onClick={handlePrev}
              disabled={visibleStartIndex === 0}
            >
              <ChevronLeft />
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#121425",
                mr: 1,
                maxWidth: 36,
                maxHeight: 36,
                minWidth: 36,
                minHeight: 36,
              }}
              onClick={handleNext}
              disabled={visibleStartIndex >= topMatches.length - visibleCount}
            >
              <ChevronRight />
            </Button>
          </Box>

          <Button
            onClick={() => {
              navigate("/sport");
            }}
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 3,
              borderWidth: 0.4,
              borderColor: "#25253A",
              borderStyle: "solid",
              mr: isDesktop ? 0 : 4,
              // width: "11%",
            }}
          >
            <VisibilityIcon sx={{ color: "#FFC211", fontSize: 22 }} />
            <Typography
              textTransform={"none"}
              fontSize={11}
              marginLeft={0.4}
              color={"white"}
            >
              所有
              {/* pogledajsve */}
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          visibleTopMatches.map((match) => (
            <MatchItem
              key={match.id}
              match={match}
              sportId={sport}
              leagueName={match.leagueName}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default TopMatchesHomepageShortcut;
