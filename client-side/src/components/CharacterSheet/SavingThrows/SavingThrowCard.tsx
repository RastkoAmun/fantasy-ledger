import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const SavingThrowCard = ({
  name,
  modifier,
  proficient,
}: {
  name: string;
  modifier: number | string;
  proficient?: boolean;
}) => {
  return (
    <Grid
      item
      xs={2}
      sm={3}
      xl={3}
      m={1}
      pr={4}
      display="flex"
      position="relative"
      justifyContent="center"
    >
      <Box
        display="flex"
        height={28}
        sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
      >
        <Typography
          alignSelf="center"
          ml={{ xs: 10, lg: 8.5, xl: 10 }}
          mt={{ xs: 1.2, md: 0, xl: 1.2 }}
          fontSize={13}
          fontWeight={700}
        >
          {name}
        </Typography>
      </Box>
      <Box
        width={{ xs: 38, md: 30, xl: 36 }}
        height={{ xs: 38, md: 30, xl: 36 }}
        border={3}
        borderColor={proficient ? "purple" : "#9A9696"}
        position="absolute"
        bgcolor="white"
        borderRadius={10}
      >
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="95%"
        >
          <Typography
            fontSize={{ lg: 15, xl: 17 }}
            fontFamily="monospace"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {modifier}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default SavingThrowCard;
