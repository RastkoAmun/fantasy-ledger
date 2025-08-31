"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Delete } from "@mui/icons-material";
import { Feature, Spell } from "@/state/remote/__generated__/types";
import { useMutation } from "@apollo/client";
import { deleteFeature } from "@/state/remote/mutations/deleteFeatures";
import { getFeatures } from "@/state/remote/queries/getFeatures";

interface Props {
  open: boolean;
  onClose: () => void;
  spell: Partial<Spell>;
}



const DisplaySpellDialog = ({ open, spell, onClose }: Props) => {
  // const [deleteMutation] = useMutation(deleteFeature);

  // const handleDelete = () => {
  //   try {
  //     deleteMutation({
  //       variables: { id: feature.id },
  //       refetchQueries: [getFeatures],
  //     });
  //     onClose()
  //   } catch (err) {
  //     console.error("Error deleting Feature", err);
  //   }
  // };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack>
          {spell.name} 
          <Typography variant="body2">Level: {spell.level} ({spell.school})</Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>


      <DialogContent>
        <Typography><strong>Casting Time</strong>: {spell.casting}</Typography>
        <Typography><strong>Range</strong>: {spell.range}</Typography>
        <Typography><strong>Components</strong>: {spell.components} </Typography>
        <Typography><strong>Duration</strong>: {spell.duration} </Typography>
        <br></br>
        <Typography>{spell.description} </Typography>
      </DialogContent>

      <DialogActions>
        <IconButton 
        // onClick={handleDelete} 
        sx={{ color: 'red'}}>
          <Delete />
        </IconButton>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplaySpellDialog;
