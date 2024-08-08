import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SavingThrowCard from "./SavingThrowCard";

import { AbilityScores, calculateModifier } from "@/utils/helpers";
import { useQuery } from "@apollo/client";
import abilityScores from "@/state/remote/queries/getAbilityScores";

const SavingThrowsDashboard = () => {
  const { data, loading, error } = useQuery(abilityScores);

  if (loading || error) return;
  if (!data) return;

  console.log(data.abilityScores);

  return (
    <Box
      width={400}
      height={130}
      border={1}
      borderColor="black"
      margin={2}
      bgcolor="#9A9696"
    >
      <Typography textAlign="center" fontSize={12} fontWeight={700} mt={0.5}>
        SAVING THROWS
      </Typography>
      <Grid container rowGap={1} columnGap={5}>
        {Object.keys(AbilityScores).map((abilityScore) => {
          const { modifier, sign } = calculateModifier(
            data.abilityScores[abilityScore.toLowerCase()]
          );
          return (
            <SavingThrowCard
              key={abilityScore}
              name={abilityScore.substring(0, 3)}
              modifier={sign + modifier}
              proficient={Math.random() < 0.5}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SavingThrowsDashboard;
