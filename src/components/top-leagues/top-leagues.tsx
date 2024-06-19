import { Box, Typography } from "@mui/material";
import { FC } from "react";
import SportCategoriesListItem from "../categories-selectors/sport-categories-list-item";

const TopLeagues: FC<{ sportId: string }> = ({ sportId }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
      }}
    >
      <Typography fontSize={20} sx={{ marginLeft: 1, marginBottom: 2 }}>
        Top Lige
      </Typography>
      <SportCategoriesListItem sportId={sportId} leagueId={"1"} />
    </Box>
  );
};

export default TopLeagues;
