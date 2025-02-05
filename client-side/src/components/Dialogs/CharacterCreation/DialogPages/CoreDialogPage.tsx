import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { InputEventType, PageNavigation } from "@/utils/types";
import { coreInfoDefaultForm, healthDefaultForm } from "@/utils/defaultForms";

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
  const handleLevelClick = (lvl: number) => {
    setLevel(lvl);
    setCoreForm((prev) => ({ ...prev, level: lvl }));
  };
  const handleHealthInput = (event: InputEventType) => {
    setHealth(event.target.value);
  };
  const handleHealthDiceInput = (event: InputEventType) => {
    setHealthDice(event.target.value);
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack>
        <Stack direction="row">
          <Stack>
            <Typography>{labels.name}</Typography>
            <TextField
              variant="standard"
              value={name}
              onChange={handleNameInput}
              onBlur={(e) => setCoreForm({ ...coreForm, name: e.target.value })}
            />
          </Stack>
          <Stack ml={5}>
            <Typography>{labels.level}</Typography>
            <Select
              variant="standard"
              defaultValue={1}
              value={level}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "&::-webkit-scrollbar": { display: "none" },
                  },
                },
              }}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                <MenuItem
                  key={lvl}
                  value={lvl}
                  onClick={() => handleLevelClick(lvl)}
                >
                  {lvl}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        <Stack direction="row" mt={4}>
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
                })
              }
              sx={{ width: 90 }}
            />
          </Stack>
          <Stack ml={5}>
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
                            hitDice: dice as string,
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
        <Stack direction="row" justifyContent="center" mt={5} columnGap={10}>
          <Button
            variant="contained"
            onClick={() => handlePageNavigation.goNext()}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </CustomTabPanel>
  );
};

export default CoreDialogPage;
