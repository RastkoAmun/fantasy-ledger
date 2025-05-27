import { CharacterType } from "@/utils/types";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const CharacterInfo = ({ character }: { character: CharacterType }) => {
  return (
    <Box
      height="30%"
      border={2}
      borderColor="purple"
      borderRadius={4}
      bgcolor="#e1e1e1"
      boxSizing="border-box"
      sx={{
        backgroundImage: `url('/backgrounds/${character.class}.png')`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgba(255,255,255,0.6)`,
        backgroundBlendMode: "lighten",
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Stack direction="column" justifyContent="space-between">
            <Stack direction="row">
              <Box width={80} height={80} m={1} bgcolor="blue">
                <Image
                  // src={`/images/${sorcerer}.png`}
                  src='/icons/sorcerer-icon.png'
                  alt="character-picture"
                  width={80}
                  height={80}
                />
              </Box>
              <Stack mt={1}>
                <Typography variant="h4">{character.name}</Typography>
                <Typography variant="h6">
                  Level: {character.level} (Male)
                </Typography>
              </Stack>
            </Stack>
            <Stack ml={1.5} justifyContent="center">
              <Typography variant="body1" fontWeight={700}>
                {character.subclass} {character.class}
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {character.subrace} {character.race}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4} 
          display='flex' 
          justifyContent="space-between" 
          alignItems='flex-end' 
          direction='column'
          padding={1}>
            <Stack>
              <Button variant="outlined" sx={{ width: "110px", bgcolor: 'white' }}>
                Edit
              </Button>
            </Stack>
            <Stack direction="column" rowGap={1} position='relative' top={8}>
              <Button variant="outlined" sx={{ width: "110px", padding: 0, bgcolor: 'white' }}>
                Short Rest
              </Button>
              <Button variant="outlined" sx={{ width: "110px", padding: 0, bgcolor: 'white' }}>
                Long Rest
              </Button>
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterInfo;
