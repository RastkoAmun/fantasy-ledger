"use client";
import React, { useState } from "react";
import { getCharactersQuery } from "@/state/remote/queries/getCharacters";
import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Character } from "@/state/remote/__generated__/types";
import CharacterCreationDialog from "@/components/Dialogs/CharacterCreation/DialogForm";

const cardStyle = {
  width: 200,
  height: 220,
  "&:hover": {
    backgroundColor: "#b0def3",
    cursor: "pointer",
  },
};

const CharactersDisplay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useQuery(getCharactersQuery);
  console.log(data);

  if (loading || error) return;
  if (!data) return;

  return (
    <Box height="100vh" sx={{ flexGrow: 1 }}>
      <Grid
        height="100vh"
        display="flex"
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {data.characters.map((character: Character) => (
          <Grid key={character.id} item xs={3}>
            <Card onClick={() => console.log(character.id)} sx={cardStyle}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Level: {character.level}
                </Typography>
                <Typography variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {character.subrace} {character.race}
                </Typography>
                <Typography variant="body2">
                  {character.subclass} {character.class}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item>
          <Card onClick={() => setIsOpen(true)} sx={cardStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <ControlPointIcon fontSize="large" />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <CharacterCreationDialog isOpen={isOpen} />
    </Box>
  );
};

export default CharactersDisplay;
