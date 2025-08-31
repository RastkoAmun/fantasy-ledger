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
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { createSpell } from "@/state/remote/mutations/createSpell";
import { getSpells } from "@/state/remote/queries/getSpells";
import { SpellsSchool } from "@/utils/types";

interface Props {
  open: boolean;
  onClose: () => void;
  characterId: string;
}

const AddSpellDialog: React.FC<Props> = ({ open, onClose, characterId }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<number | null>(null);
  const [school, setSchool] = useState<SpellsSchool>("unknown");
  const [casting, setCasting] = useState("");
  const [range, setRange] = useState("");
  const [components, setComponents] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const [createSpellMutation] = useMutation(createSpell);

  const handleFormReset = () => {
    setName("");
    setLevel(null);
    setSchool("unknown");
    setCasting("");
    setRange("");
    setComponents("");
    setDuration("");
    setDescription("");
  };

  const handleChange = (e: SelectChangeEvent<SpellsSchool>) => {
    setSchool(e.target.value as SpellsSchool);
  };

  const handleSubmit = () => {
    createSpellMutation({
      variables: {
        input: {
          name,
          level,
          school,
          casting,
          range,
          components,
          duration,
          description,
          characterId: Number(characterId),
        },
      },
      refetchQueries: [getSpells],
    });

    handleFormReset();
    onClose();
  };

  const levelButtons = useMemo(
    () => (
      <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gap={1}>
        {[...Array(9)].map((_, i) => {
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
        Add Spell
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

        <Stack direction="row" columnGap={1} rowGap={0}>
          <TextField
            label="Range"
            fullWidth
            variant="outlined"
            color="secondary"
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <TextField
            label="Casting Time"
            fullWidth
            variant="outlined"
            color="secondary"
            size="small"
            value={casting}
            onChange={(e) => setCasting(e.target.value)}
          />
          <TextField
            label="Duration"
            fullWidth
            variant="outlined"
            color="secondary"
            size="small"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Stack>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="school-of-magic-selection">
            School of Magic
          </InputLabel>
          <Select
            labelId="school-of-magic-selection"
            id="school-of-magic-simple-select"
            value={school}
            label="School of Magic"
            margin="dense"
            onChange={handleChange}
          >
            <MenuItem value="abjuration">Abjuration</MenuItem>
            <MenuItem value="conjuration">Conjuration</MenuItem>
            <MenuItem value="divination">Divination</MenuItem>
            <MenuItem value="enchantment">Enchantment</MenuItem>
            <MenuItem value="evocation">Evocation</MenuItem>
            <MenuItem value="illusion">Illusion</MenuItem>
            <MenuItem value="necromancy">Necromancy</MenuItem>
            <MenuItem value="transmutation">Transmutation</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Components"
          fullWidth
          variant="outlined"
          color="secondary"
          size="small"
          margin="dense"
          value={components}
          onChange={(e) => setComponents(e.target.value)}
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
          sx={{ mt: 1 }}
        />

        <Typography variant="subtitle1" mt={2} mb={1}>
          Select Level
        </Typography>
        {levelButtons}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            handleFormReset();
          }}
          color="secondary"
        >
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

export default AddSpellDialog;
