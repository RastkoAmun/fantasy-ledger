import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { updateHealth } from "@/state/remote/mutations/updateHealth";
import { CharacterType } from "@/utils/types";

const AddTempHealth = ({
  isOpen,
  onClose,
  character,
}: {
  isOpen: boolean;
  onClose: () => void;
  character: CharacterType;
}) => {
  const [tempHealth, setTempHealth] = useState("0");

  const [updateHealthMutation] = useMutation(updateHealth, {
    refetchQueries: ["GetCharacter"],
  });

  const handleTempHealthMutation = () => {
    try {
      updateHealthMutation({
        variables: {
          id: character.id,
          input: {
            currentHealth: character.currentHealth,
            tempHealth: Number(tempHealth),
          },
        },
      });
    } catch (err) {
      console.log("ERROR", err);
    }
    onClose()
    setTempHealth("0")
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => console.log()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
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

      <Stack display="flex" alignItems="center" rowGap={3} width={400}>
        <TextField
          variant="standard"
          fullWidth
          value={tempHealth}
          onChange={(e) => setTempHealth(e.target.value)}
          sx={{ width: 60, "& .MuiInputBase-input": { textAlign: "center" } }}
        />
        <Button
          variant="contained"
          onClick={handleTempHealthMutation}
          sx={{ bgcolor: "purple" }}
        >
          Submit
        </Button>
      </Stack>

      <DialogActions
        sx={{ display: "flex", justifyContent: "center" }}
      ></DialogActions>
    </Dialog>
  );
};

export default AddTempHealth;
