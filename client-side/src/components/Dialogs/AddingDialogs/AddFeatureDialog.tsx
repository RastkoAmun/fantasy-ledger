"use client";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { createFeature } from "@/state/remote/mutations/createFeature";
import { getFeatures } from "@/state/remote/queries/getFeatures";

interface Props {
  open: boolean;
  onClose: () => void;
  characterId: string;
}

const AddFeatureDialog: React.FC<Props> = ({ open, onClose, characterId }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const [createFeatureMutation] = useMutation(createFeature);

  const handleSubmit = () => {
    createFeatureMutation({
      variables: {
        input: {
          name,
          level,
          description,
          characterId: Number(characterId),
        }, 
      },
      refetchQueries: [getFeatures]
    });
    setName("")
    setLevel(null)
    setDescription("")
    onClose()
  };

  const levelButtons = useMemo(
    () => (
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={1}>
        {[...Array(20)].map((_, i) => {
          const n = i + 1;
          return (
            <Button
              key={n}
              variant={level === n ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setLevel(n)}
              sx={{
                minWidth: "30px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <Typography fontSize="12px">{n}</Typography>
            </Button>
          );
        })}
      </Box>
    ),
    [level]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Feature
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          color="secondary"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          maxRows={10}
          variant="outlined"
          color="secondary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Typography variant="subtitle1" mt={2} mb={1}>
          Select Level
        </Typography>
        {levelButtons}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "purple" }}
          disabled={!name || level === null}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFeatureDialog;
