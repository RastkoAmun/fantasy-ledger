"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Delete } from "@mui/icons-material";
import { Feature } from "@/state/remote/__generated__/types";
import { useMutation } from "@apollo/client";
import { deleteFeature } from "@/state/remote/mutations/deleteFeatures";
import { getFeatures } from "@/state/remote/queries/getFeatures";

interface Props {
  open: boolean;
  onClose: () => void;
  feature: Partial<Feature>;
}

const DisplayFeatureDialog = ({ open, feature, onClose }: Props) => {
  const [deleteMutation] = useMutation(deleteFeature);

  const handleDelete = () => {
    try {
      deleteMutation({
        variables: { id: feature.id },
        refetchQueries: [getFeatures],
      });
      onClose()
    } catch (err) {
      console.error("Error deleting Feature", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {feature.name} (Level: {feature.level})
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{feature.description}</DialogContent>

      <DialogActions>
        <IconButton onClick={handleDelete} sx={{ color: 'red'}}>
          <Delete />
        </IconButton>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayFeatureDialog;
