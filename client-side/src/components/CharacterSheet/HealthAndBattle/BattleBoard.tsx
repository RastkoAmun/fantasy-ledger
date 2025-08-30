import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const labels = {
  armor: "ARMOR",
  speed: "SPEED",
  initiative: "INITIATIVE",
  proficiency: "PROFICIENCY"
};

type BattleBoardTypes = {
  armor: number;
  speed: number;
  initiative: number;
  proficiency: number;
};

const BattleBoard = ({ proficiency, armor, speed, initiative }: BattleBoardTypes) => {
  return (
    <Box width={{ xs: '70%', md: '90%'}} height={100} m={2}>
      <Grid
        container
        m={1}
      >
        <Grid item justifyItems='center' xs={6} md={3}>
          <Typography fontSize={14}>{labels.proficiency}</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={55}
            height={55}
            border={4}
            borderRadius={2}
            borderColor='green'
          >
            <Typography fontSize={24}>+{proficiency}</Typography>
          </Box>
        </Grid>
        <Grid item justifyItems='center' xs={6} md={3}>
          <Typography fontSize={14}>{labels.armor}</Typography>
          <Box
            width={50}
            height={60}
            border={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ borderBottomLeftRadius: 75, borderBottomRightRadius: 75 }}
          >
            <Typography fontSize={24} textAlign="center" mb={1}>
              {armor}
            </Typography>
          </Box>
        </Grid>
        <Grid item justifyItems='center' xs={6} md={3}>
          <Typography fontSize={14}>{labels.speed}</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={60}
            height={40}
            border={1}
            borderRadius={1}
          >
            <Typography fontSize={19}>{speed} ft.</Typography>
          </Box>
        </Grid>
        <Grid item justifyItems='center' xs={6} md={3}>
          <Typography fontSize={14}>{labels.initiative}</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={50}
            height={50}
            border={1}
            borderRadius={10}
          >
            <Typography fontSize={24}>+{initiative}</Typography>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default BattleBoard;
