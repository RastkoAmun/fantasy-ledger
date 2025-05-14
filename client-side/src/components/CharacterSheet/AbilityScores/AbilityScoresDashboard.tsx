import { Box, Grid } from "@mui/material";
import React from "react";
import AbilityScoreCard from "@/components/CharacterSheet/AbilityScores/AbilityScoreCard";
import { AbilityScores } from "@/utils/helpers";
import { useQuery } from "@apollo/client";
import abilityScores from "@/state/remote/queries/getAbilityScores";

const AbilityScoresDashboard = ({
  abilityScoresId,
}: {
  abilityScoresId: number;
}) => {
  const { data, loading, error } = useQuery(abilityScores, {
    variables: { id: abilityScoresId },
  });
  console.log(data);

  if (loading || error) return;
  if (!data) return;

  return (
    <Box
      height={240}
      border={1}
      borderRadius={4}
      borderColor="purple"
      marginTop={1}
      bgcolor="#9A9696"
      boxSizing="border-box"
    >
      <Grid container rowGap={3} mt={1}>
        {Object.keys(AbilityScores).map((abilityScore) => {
          return (
            <AbilityScoreCard
              key={abilityScore}
              name={abilityScore}
              value={data.abilityScores[abilityScore.toLowerCase()]}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default AbilityScoresDashboard;
