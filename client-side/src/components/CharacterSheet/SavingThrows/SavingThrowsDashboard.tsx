import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SavingThrowCard from "./SavingThrowCard";

import { AbilityScores, calculateModifier } from "@/utils/helpers";
import { useQuery } from "@apollo/client";
import abilityScores from "@/state/remote/queries/getAbilityScores";
import {
  AbilityScoresQueryKeysType,
  AbilityScoresQueryType,
} from "@/utils/types";

const SavingThrowsDashboard = ({
  abilityScores,
  savingThrows,
}: {
  abilityScores: AbilityScoresQueryType;
  savingThrows: string[];
}) => {
  const savingThrowsSet = new Set(savingThrows);
  console.log(savingThrowsSet)
  return (
    <Box
      width="100%"
      height="26%"
      border={2}
      borderColor="purple"
      borderRadius={5}
      mt={1}
      bgcolor="#e1e1e1"
    >
      <Typography textAlign="center" fontWeight={700} mt={0.5}>
        SAVING THROWS
      </Typography>
      <Grid container rowGap={1} columnGap={5} justifyContent='center'>
        {Object.keys(AbilityScores).map((abilityScore) => {
          const { modifier, sign } = calculateModifier(
            abilityScores[
              abilityScore.toLowerCase() as AbilityScoresQueryKeysType
            ]
          );
          return (
            <SavingThrowCard
              key={abilityScore}
              name={abilityScore.substring(0, 3)}
              modifier={
                sign +
                (modifier +
                  (savingThrowsSet.has(abilityScore.toLocaleLowerCase()) ? 2 : 0))
              }
              proficient={savingThrowsSet.has(abilityScore.toLocaleLowerCase())}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SavingThrowsDashboard;
