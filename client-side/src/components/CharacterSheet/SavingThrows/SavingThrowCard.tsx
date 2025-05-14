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
    <Grid item xs={2} m={1} mx={2} display="flex" position="relative">
      <Box
        display="flex"
        height={28}
        sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
      >
        <Typography alignSelf="center" ml={5.5} mt={1.2} fontSize={13} fontWeight={700}>
          {name}
        </Typography>
      </Box>
      <Box
        width={38}
        height={38}
        border={3.5}
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
          height='95%'
        >
          <Typography
            fontSize={17}
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
