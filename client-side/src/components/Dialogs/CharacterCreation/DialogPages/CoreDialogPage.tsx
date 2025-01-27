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

type Navigation = {
  goNext: () => void;
  goBack: () => void;
};

type HealthDice = "d6" | "d8" | "d10" | "d12" | "" | null;

type CharacterCreationPageProps = {
  value: number;
  pageNavigation: Navigation;
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
  pageNavigation,
}: CharacterCreationPageProps) => {
  const [name, setName] = useState("");
  const [health, setHealth] = useState("");
  const [level, setLevel] = useState(1);
  const [healthDice, setHealthDice] = useState("");

  // Handlers
  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSetHealth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealth(event.target.value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealthDice(event.target.value);
  };

  return (
    <CustomTabPanel value={value} index={0}>
      <Stack>
        <Stack direction="row">
          <Stack>
            <Typography>{labels.name}</Typography>
            <TextField
              variant="standard"
              value={name}
              onChange={handleSetName}
              onBlur={(e) => console.log(e.target.value)}
            />
          </Stack>
          <Stack ml={5}>
            <Typography>{labels.level}</Typography>
            <Select
              variant="standard"
              defaultValue={1}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "&::-webkit-scrollbar": { display: "none" },
                  },
                },
              }}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                <MenuItem key={lvl} value={lvl} onClick={() => setLevel(lvl)}>
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
              onChange={handleSetHealth}
              sx={{ width: 90 }}
            />
          </Stack>
          <Stack ml={5}>
            <Typography>{labels.dice}</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={healthDice}
              onChange={handleChange}
            >
              <Stack direction="row">
                {healthDiceArray.map((dice) => (
                  <FormControlLabel
                    key={dice}
                    value={dice}
                    control={
                      <Radio
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
          <Button variant="contained" onClick={() => pageNavigation.goNext()}>
            Next
          </Button>
        </Stack>
      </Stack>
    </CustomTabPanel>
  );
};

export default CoreDialogPage;
