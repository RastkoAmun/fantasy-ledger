import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { InputEventType, PageNavigation } from "@/utils/types";
import { coreInfoDefaultForm, healthDefaultForm } from "@/utils/defaultForms";
import { teal } from "@mui/material/colors";

type HealthDice = "d6" | "d8" | "d10" | "d12" | "" | null;

type CharacterCreationPageProps = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  coreForm: typeof coreInfoDefaultForm;
  healthForm: typeof healthDefaultForm;
  setCoreForm: React.Dispatch<React.SetStateAction<typeof coreInfoDefaultForm>>;
  setHealthForm: React.Dispatch<React.SetStateAction<typeof healthDefaultForm>>;
};

const labels = {
  name: "Character Name",
  level: "Level",
  health: "Health Points (HP)",
  dice: "Health Dice",
};

const healthDiceArray: HealthDice[] = ["d6", "d8", "d10", "d12"];

const CoreDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  coreForm,
  healthForm,
  setCoreForm,
  setHealthForm,
}: CharacterCreationPageProps) => {
  const [name, setName] = useState("");
  const [health, setHealth] = useState("");
  const [level, setLevel] = useState(1);
  const [healthDice, setHealthDice] = useState("");

  // Handlers
  const handleNameInput = (event: InputEventType) => {
    setName(event.target.value);
  };
  const handleHealthInput = (event: InputEventType) => {
    setHealth(event.target.value);
  };
  const handleHealthDiceInput = (event: InputEventType) => {
    setHealthDice(event.target.value);
  };

  const levelButtons = useMemo(
    () => (
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={1}>
        {Array.from({ length: 20 }, (_, i) => {
          const n = i + 1;
          const selected = level === n;
          return (
            <Button
              key={n}
              size="small"
              variant={selected ? "contained" : "outlined"}
              onClick={() => {
                setCoreForm({...coreForm, level: n}),
                setLevel(n)
              }}
              sx={{
                minWidth: 30,
                height: 30,
                fontWeight: 500,
                lineHeight: 1,
                px: 0.5,
                borderColor: selected ? teal[700] : teal[500],
                color: selected ? "#fff" : teal[700],
                bgcolor: selected ? teal[600] : "transparent",
                "&:hover": {
                  bgcolor: selected ? teal[700] : "rgba(0,0,0,0.04)",
                  borderColor: teal[700],
                },
              }}
            >
              {n}
            </Button>
          );
        })}
      </Box>
    ),
    [level, coreForm, setCoreForm]
  );

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack rowGap={3}>
        <Stack direction="row" gap={10}>
          <Stack>
            <Typography>{labels.name}</Typography>
            <TextField
              variant="standard"
              value={name}
              onChange={handleNameInput}
              onBlur={(e) => setCoreForm({ ...coreForm, name: e.target.value })}
            />
          </Stack>

          <Stack>
            <Typography>{labels.health}</Typography>
            <TextField
              variant="standard"
              value={health}
              onChange={handleHealthInput}
              onBlur={(e) =>
                setHealthForm({
                  ...healthForm,
                  maxHealth: Number(e.target.value),
                  currentHealth: Number(e.target.value),
                  tempHealth: 0,
                })
              }
              sx={{ width: 90 }}
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography mb={1}>{labels.level}</Typography>
          {levelButtons}
        </Stack>
        <Stack>
          <Typography>{labels.dice}</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={healthDice}
            onChange={handleHealthDiceInput}
          >
            <Stack direction="row">
              {healthDiceArray.map((dice) => (
                <FormControlLabel
                  key={dice}
                  value={dice}
                  control={
                    <Radio
                      onClick={() =>
                        setHealthForm({
                          ...healthForm,
                          healthDice: dice as string,
                        })
                      }
                      sx={{
                        "&.Mui-checked": {
                          color: "teal",
                        },
                      }}
                    />
                  }
                  label={dice}
                />
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={5}
        columnGap={10}
        position="relative"
        bottom={-10}
      >
        <Button variant="contained" onClick={() => console.log("CLOSE HERE")}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePageNavigation.goNext()}
        >
          Next
        </Button>
      </Stack>
    </CustomTabPanel>
  );
};

export default CoreDialogPage;
