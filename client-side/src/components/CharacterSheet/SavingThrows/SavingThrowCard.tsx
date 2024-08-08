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
        width={160}
        height={30}
        sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
      >
        <Typography alignSelf="center" ml={4.5} fontSize={13} fontWeight={700}>
          {name}
        </Typography>
      </Box>
      <Box
        width={30}
        height={30}
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
          mr={0.3}
          mt="0.5px"
        >
          <Typography>{modifier}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default SavingThrowCard;
