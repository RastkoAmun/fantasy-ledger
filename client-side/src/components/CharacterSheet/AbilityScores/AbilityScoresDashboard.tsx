import { Box, Grid } from "@mui/material";
import React from "react";
import AbilityScoreCard from "@/components/CharacterSheet/AbilityScores/AbilityScoreCard";
import { AbilityScores } from "@/utils/helpers";

const AbilityScoresDashboard = () => {
  return (
    <Box
      width={400}
      height={240}
      border={1}
      borderColor="purple"
      margin={2}
      bgcolor="#9A9696"
    >
      <Grid container rowGap={3} mt={1}>
        <AbilityScoreCard name={AbilityScores.STRENGTH} />
        <AbilityScoreCard name={AbilityScores.DEXTERITY} />
        <AbilityScoreCard name={AbilityScores.CONSTITUTION} />
        <AbilityScoreCard name={AbilityScores.INTELLIGENCE} topPosition={70} />
        <AbilityScoreCard name={AbilityScores.WISDOM} topPosition={70} />
        <AbilityScoreCard name={AbilityScores.CHARISMA} topPosition={70} />
      </Grid>
    </Box>
  );
};

export default AbilityScoresDashboard;
