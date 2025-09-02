"use client";
import React, { useState } from "react";
import { Box, Card, Typography, Grid, Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddFeatureDialog from "../Dialogs/AddingDialogs/AddFeatureDialog";
import { useQuery } from "@apollo/client";
import { getFeatures } from "@/state/remote/queries/getFeatures";
import DisplayFeatureDialog from "../Dialogs/DisplayDialogs/DisplayFeatureDialog";
import { Feature } from "@/state/remote/__generated__/types";
import { useRouter } from "next/navigation"

const Features = ({ characterId }: { characterId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisplay, setIsOpenDisplay] = useState(false);
  const [feature, setFeature] = useState({});

  const router = useRouter()

  const { data, loading, error } = useQuery(getFeatures, {
    variables: { id: characterId },
  });

  if (loading || error) return;
  if (!data) return;

  const handleOpenDisplay = (feature: any) => {
    setIsOpenDisplay(true);
    setFeature(feature);
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
          Class Features
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
          <Grid container spacing={2}>
            {data.features.map((feature: Feature, index: number) => (
              <Grid item xs={3} key={index}>
                <Card
                  onClick={() => handleOpenDisplay(feature)}
                  sx={{
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: 4,
                    "&:hover": {
                      bgcolor: "rgba(109, 8, 131, 0.4)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {feature.name} ({feature.level})
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
          <AddFeatureDialog
            open={isOpen}
            onClose={handleClose}
            characterId={characterId}
          />
          <DisplayFeatureDialog
            open={isOpenDisplay}
            onClose={handleClose}
            feature={feature}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Features;
