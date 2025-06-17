"use client";
import React, { useState } from "react";
import { Box, Card, Typography, Grid, Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddFeatureDialog from "../Dialogs/AddingDialogs/AddFeatureDialog";
import { useQuery } from "@apollo/client";
import DisplayFeatureDialog from "../Dialogs/DisplayDialogs/DisplayFeatureDialog";
import { Feature, Spell } from "@/state/remote/__generated__/types";
import { useRouter } from "next/navigation";
import { getSpells } from "@/state/remote/queries/getSpells";
import DisplaySpellDialog from "../Dialogs/DisplayDialogs/DisplaySpellDialog";
import AddSpellDialog from "../Dialogs/AddingDialogs/AddSpellDialog";

enum SCHOOLS_OF_MAGIC {
  ABJURATION = "#b4d1ff",
  CONJURATION = "#ffd387",
  DIVINATION = "#d292fc",
  ENCHANTMENT = "#9dfac2",
  EVOCATION = "#ffaeae",
  ILLUSION = "#cff9ff",
  NECROMANCY = "#878787",
  TRANSMUTATION = "#fffbb8",
}

type SchoolOfMagicType = keyof typeof SCHOOLS_OF_MAGIC;

const Spells = ({ characterId }: { characterId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisplay, setIsOpenDisplay] = useState(false);
  const [spell, setSpell] = useState({});

  const router = useRouter();

  const { data, loading, error } = useQuery(getSpells, {
    variables: { id: characterId },
  });

  if (loading || error) return;
  if (!data) return;

  const handleOpenDisplay = (feature: any) => {
    setIsOpenDisplay(true);
    setSpell(feature);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenDisplay(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={13}
      height="78vh"
      width="100%"
    >
      <Paper
        elevation={3}
        sx={{
          width: "80%",
          height: "100%",
          p: 2,
          backgroundColor: `rgba(255,255,255,0.5)`,
          backgroundBlendMode: "lighten",
          border: "1px solid purple",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={2}>
          Spells
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
          <Grid container spacing={2}>
            {data.spells.map((spell: Spell, index: number) => (
              <Grid item xs={3} key={index}>
                <Card
                  onClick={() => handleOpenDisplay(spell)}
                  sx={{
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: 4,
                    bgcolor: `${
                      SCHOOLS_OF_MAGIC[
                        spell.school.toUpperCase() as SchoolOfMagicType
                      ]
                    }`,
                    "&:hover": {
                      bgcolor: "#f6d1ff",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {spell.name} ({spell.level})
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <IconButton
            size="large"
            sx={{
              bgcolor: "#1e1e2f",
              color: "white",
              "&:hover": {
                bgcolor: "purple",
              },
            }}
            onClick={() => router.push(`/characters/${characterId}`)}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{
              bgcolor: "#1e1e2f",
              color: "white",
              "&:hover": {
                bgcolor: "purple",
              },
            }}
            onClick={() => setIsOpen(true)}
          >
            <AddIcon />
          </IconButton>
          <AddSpellDialog
            open={isOpen}
            onClose={handleClose}
            characterId={characterId}
          />
          <DisplaySpellDialog
            open={isOpenDisplay}
            onClose={handleClose}
            spell={spell}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Spells;
