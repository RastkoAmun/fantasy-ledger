import { Box, Grid } from "@mui/material";
import React from "react";
import AbilityScoreCard from "@/components/CharacterSheet/AbilityScores/AbilityScoreCard";
import { AbilityScores } from "@/utils/helpers";
import { useQuery } from "@apollo/client";
import abilityScores from "@/state/remote/queries/getAbilityScores";
import { AbilityScoresQueryKeysType, AbilityScoresQueryType } from "@/utils/types";

const AbilityScoresDashboard = ({
  abilityScores,
}: {
  abilityScores: AbilityScoresQueryType;
}) => {
  return (
    <Box
      height="44%"
      border={2}
      borderRadius={4}
      borderColor="purple"
      marginTop={1}
      bgcolor="#9A9696"
      boxSizing="border-box"
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Grid container rowGap={3}>
        {Object.keys(AbilityScores).map((abilityScore) => {
          return (
            <AbilityScoreCard
              key={abilityScore}
              name={abilityScore}
              value={
                abilityScores[
                  abilityScore.toLowerCase() as AbilityScoresQueryKeysType
                ]
              }
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default AbilityScoresDashboard;
