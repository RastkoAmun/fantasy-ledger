import React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import {
  characterSheetDefault,
  proficienciesDefaultForm,
} from "@/utils/defaultForms";
import { InputEventType, PageNavigation } from "@/utils/types";
import { SAVING_THROWS, SavingThrowsProficiencies, SkillProficiencies, SKILLS } from "@/utils/helpers";

type ProficienciesType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  proficienciesForm: typeof characterSheetDefault.proficiencies;
  setProficienciesForm: React.Dispatch<
    React.SetStateAction<typeof proficienciesDefaultForm>
  >;
};

const ProficienciesDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  proficienciesForm,
  setProficienciesForm,
}: ProficienciesType) => {
  
  const handleToggleProficiencies = (skill: SkillProficiencies, checked: boolean) => {
    setProficienciesForm((prev) => {
      const set = new Set(prev.proficiencies);
      checked ? set.add(skill) : set.delete(skill);
      return { ...prev, proficiencies: Array.from(set) };
    });
  };

  const handleToggleSavingThrows = (skill: SavingThrowsProficiencies, checked: boolean) => {
    setProficienciesForm((prev) => {
      const set = new Set(prev.savingThrows);
      checked ? set.add(skill) : set.delete(skill);
      return { ...prev, savingThrows: Array.from(set) };
    });
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack>
        <FormControl sx={{ width: "100%" }}>
          <Typography sx={{ mb: 1, color: "#000" }}>
            Skill Proficiencies
          </Typography>

          <Grid container width={700}>
            {SKILLS.map((skill) => (
              <Grid key={skill} item xs={12} sm={6} md={3}>
                <FormControlLabel
                  label={skill}
                  control={
                    <Checkbox
                      size="small"
                      checked={proficienciesForm.proficiencies.includes(skill)}
                      onChange={(_, ch) => handleToggleProficiencies(skill, ch)}
                    />
                  }
                  sx={{
                    m: 0,
                    px: 1,
                    borderRadius: 1,
                    height: 20,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </FormControl>
        <FormControl component="fieldset" sx={{ width: "100%", mt: 3 }}>
          <Typography sx={{ mb: 1, color: "#000" }}>
            Saving Throw Proficiencies
          </Typography>

          <Grid container width={700}>
            {SAVING_THROWS.map((prof) => (
              <Grid key={prof} item xs={12} sm={6} md={3}>
                <FormControlLabel
                  label={prof}
                  control={
                    <Checkbox
                      size="small"
                      checked={proficienciesForm.savingThrows.includes(prof)}
                      onChange={(_, ch) => handleToggleSavingThrows(prof, ch)}
                    />
                  }
                  sx={{
                    m: 0,
                    px: 1,
                    borderRadius: 1,
                    height: 20,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </FormControl>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={5}
          columnGap={10}
          position="relative"
          bottom={-26}
        >
          <Button variant="contained" onClick={() => console.log("CLOSE")}>
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

export default ProficienciesDialogPage;
