import CharacterCreationDialog from "@/components/Dialogs/CharacterCreation/DialogForm";
import { CLASSES, slug } from "@/utils/helpers";
import { AbilityScoresQueryType, CharacterType } from "@/utils/types";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const CharacterInfo = ({
  character,
  abilityScores,
}: {
  character: CharacterType;
  abilityScores: AbilityScoresQueryType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButton = () => {
    setIsOpen(true);
    setIsEditing(true);
  };

  const bgPath = CLASSES.has(character.class)
    ? `/backgrounds/${slug(character.class)}.png`
    : "/backgrounds/default1.png";
  const iconPath = `/icons/${slug("sorcerer")}.png`;

  return (
    <Box
      height="30%"
      border={2}
      borderColor="purple"
      borderRadius={4}
      bgcolor="#e1e1e1"
      boxSizing="border-box"
      sx={{
        backgroundImage: `url(${bgPath})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgba(255,255,255,0.6)`,
        backgroundBlendMode: "lighten",
        zoom: 1,
        "@media (min-width:1700px) and (min-height:950px)": {
          zoom: 1.3,
        },
        "@media (min-width:2050px) and (min-height:1270px)": {
          zoom: 1.7,
        },
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Stack direction="column" justifyContent="space-between">
            <Stack direction="row">
              <Box
                position="relative"
                m={1}
                bgcolor="transparent"
                borderRadius={1}
                overflow="hidden"
                width={{ lg: 72, xl: 80 }}
                height={{ lg: 72, xl: 80 }}
              >
                <Image
                  src={iconPath}
                  alt="character-picture"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Stack mt={1}>
                <Typography variant="h4" fontSize={{ lg: 28, xl: 32 }}>
                  {character.name}
                </Typography>
                <Typography variant="h6" fontSize={{ lg: 18, xl: 22 }}>
                  Level: {character.level}
                </Typography>
              </Stack>
            </Stack>
            <Stack ml={1.5} justifyContent="center">
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{ fontSize: { lg: "0.9rem", xl: "1rem" } }}
              >
                {character.subclass} {character.class}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{ fontSize: { lg: "0.9rem", xl: "1rem" } }}
              >
                {character.subrace} {character.race}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="column"
          padding={1}
        >
          <Stack>
            <Button
              variant="outlined"
              onClick={handleEditButton}
              sx={{ width: "110px", bgcolor: "white" }}
            >
              Edit
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <CharacterCreationDialog
        isOpen={isOpen}
        isEditingMode={isEditing}
        characterInfo={character}
        abilityScores={abilityScores}
        setIsOpen={setIsOpen}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

export default CharacterInfo;
