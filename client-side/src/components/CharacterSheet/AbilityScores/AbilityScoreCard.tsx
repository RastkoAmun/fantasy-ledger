import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { calculateModifier } from "@/utils/helpers";

type AbilityScoreCardProps = {
  name: string;
  value: number;
};

const AbilityScoreCard = ({ name, value }: AbilityScoreCardProps) => {
  const { modifier, sign } = calculateModifier(value);
  return (
    <Grid
      item
      xs={4}
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <Stack direction="column" alignItems="center">
        <Typography
          fontWeight={700}
          fontSize={11}
          textAlign="center"
          color="black"
        >
          {name}
        </Typography>
        <Box
          width={60}
          height={70}
          border={3}
          borderColor="purple"
          bgcolor="whitesmoke"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <Typography fontSize={28} textAlign="center" mb={1}>
            {value}
          </Typography>
        </Box>
      </Stack>
      <Box
        width={30}
        height={30}
        border={3}
        borderColor="purple"
        position="absolute"
        top={68}
        bgcolor="white"
        borderRadius={10}
      >
        <Typography textAlign="center" mt="1px">
          {sign}{modifier}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AbilityScoreCard;
