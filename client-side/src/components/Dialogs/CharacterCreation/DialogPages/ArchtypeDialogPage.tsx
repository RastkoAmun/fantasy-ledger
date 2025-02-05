import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { archtypeDefaultForm, characterSheetDefault } from "@/utils/defaultForms";
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
  subrace: "Subrace"
}

const ArchtypeDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  archtypeForm,
  setArchtypeForm,
}: ArchtypeType) => {
  const [chClass, setChClass] = useState("");
  const [subclass, setSubclass] = useState("");
  const [race, setRace] = useState("");
  const [subrace, setSubrace] = useState("");

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

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack justifyContent="center" alignItems="center">
        <Stack direction="row" gap={5} mt={3}>
          <Stack>
            <Typography>{inputTitles.class}</Typography>
            <TextField
              variant="standard"
              value={chClass}
              onChange={handleClassInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, class: e.target.value })
              }
            />
          </Stack>
          <Stack>
            <Typography>{inputTitles.subclass}</Typography>
            <TextField
              variant="standard"
              value={subclass}
              onChange={handleSubclassInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, subclass: e.target.value })
              }
            />
          </Stack>
        </Stack>
        <Stack direction="row" mt={5} gap={5}>
          <Stack>
            <Typography>{inputTitles.race}</Typography>
            <TextField
              variant="standard"
              value={race}
              onChange={handleRaceInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, race: e.target.value })
              }
            />
          </Stack>
          <Stack>
            <Typography>{inputTitles.subrace}</Typography>
            <TextField
              variant="standard"
              value={subrace}
              onChange={handleSubraceInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, subrace: e.target.value })
              }
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center" mt={5} columnGap={10}>
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
    </CustomTabPanel>
  );
};

export default ArchtypeDialogPage;
