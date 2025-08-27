import React, { useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import {
  archtypeDefaultForm,
  characterSheetDefault,
} from "@/utils/defaultForms";
import { InputEventType, PageNavigation } from "@/utils/types";

type ArchtypeType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  archtypeForm: typeof characterSheetDefault.archtype;
  setArchtypeForm: React.Dispatch<
    React.SetStateAction<typeof archtypeDefaultForm>
  >;
};

const inputTitles = {
  class: "Class",
  subclass: "Subclass",
  race: "Race",
  subrace: "Subrace",
  speed: "Speed",
  armor: "Armor",
};

const ArchtypeDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  archtypeForm,
  setArchtypeForm,
}: ArchtypeType) => {
  const [chClass, setChClass] = useState(archtypeForm.class);
  const [subclass, setSubclass] = useState(archtypeForm.subclass);
  const [race, setRace] = useState(archtypeForm.race);
  const [subrace, setSubrace] = useState(archtypeForm.subrace);
  const [speed, setSpeed] = useState(archtypeForm.speed);
  const [armor, setArmor] = useState(archtypeForm.armor);

  // TextField Handlers
  const handleClassInput = (event: InputEventType) => {
    setChClass(event.target.value);
  };
  const handleSubclassInput = (event: InputEventType) => {
    setSubclass(event.target.value);
  };
  const handleRaceInput = (event: InputEventType) => {
    setRace(event.target.value);
  };
  const handleSubraceInput = (event: InputEventType) => {
    setSubrace(event.target.value);
  };
  const handleSpeedInput = (event: InputEventType) => {
    setSpeed(Number(event.target.value));
  };
  const handleArmorInput = (event: InputEventType) => {
    setArmor(Number(event.target.value));
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack mt={2}>
        <Grid container width={600} spacing={5} alignSelf="center">
          {/* Class */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.class}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={chClass}
              onChange={handleClassInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, class: e.target.value })
              }
            />
          </Grid>

          {/* Subclass */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.subclass}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={subclass}
              onChange={handleSubclassInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, subclass: e.target.value })
              }
            />
          </Grid>

          {/* Race */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.race}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={race}
              onChange={handleRaceInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, race: e.target.value })
              }
            />
          </Grid>

          {/* Subrace */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.subrace}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={subrace}
              onChange={handleSubraceInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, subrace: e.target.value })
              }
            />
          </Grid>

          {/* Speed */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.speed}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={speed}
              onChange={handleSpeedInput}
              onBlur={(e) =>
                setArchtypeForm({
                  ...archtypeForm,
                  speed: Number(e.target.value),
                })
              }
            />
          </Grid>

          {/* Armor */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.armor}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={armor}
              onChange={handleArmorInput}
              onBlur={(e) =>
                setArchtypeForm({
                  ...archtypeForm,
                  armor: Number(e.target.value),
                })
              }
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={5}
          columnGap={10}
          position="relative"
          bottom={-16}
        >
          <Button
            variant="contained"
            onClick={() => handlePageNavigation.closeButton()}
          >
            Close
          </Button>
          <Stack direction="row" columnGap={2}>
            <Button
              variant="contained"
              onClick={() => handlePageNavigation.goBack()}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => handlePageNavigation.goNext()}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </CustomTabPanel>
  );
};

export default ArchtypeDialogPage;
