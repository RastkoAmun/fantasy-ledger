import React, { useState } from "react";
import {  Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { abilityScoreDefaultForm } from "@/utils/defaultForms";
import { PageNavigation } from "@/utils/types";

type AbilityScoresDialogPageType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  abilityScoresForm: typeof abilityScoreDefaultForm;
  setAbilityScoresForm: React.Dispatch<
    React.SetStateAction<typeof abilityScoreDefaultForm>
  >;
};

const AbilityScoresDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  abilityScoresForm,
  setAbilityScoresForm,
}: AbilityScoresDialogPageType) => {
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);

  const getters = {
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma,
  };

  const setters = {
    strength: setStrength,
    dexterity: setDexterity,
    constitution: setConstitution,
    intelligence: setIntelligence,
    wisdom: setWisdom,
    charisma: setCharisma,
  };

  console.log(abilityScoresForm)

  const handleAbilityInput = (ability: keyof typeof setters, value: number) => {
    const setter = setters[ability];
    setter(value)
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack justifyContent="center" alignSelf="center" textAlign="center">
        <Grid container spacing={3}>
          {Object.keys(getters).map((abilityScore) => {
            return (
              <Grid item key={abilityScore} xs={4}>
                <Typography textTransform="capitalize">
                  {abilityScore.toLowerCase()}
                </Typography>
                <TextField
                  variant="standard"
                  value={getters[abilityScore as keyof typeof getters]}
                  onChange={(e) =>
                    handleAbilityInput(
                      abilityScore as keyof typeof setters,
                      Number(e.target.value)
                    )
                  }
                  onBlur={(e) =>
                    setAbilityScoresForm({
                      ...abilityScoresForm,
                      [abilityScore.toLowerCase()]: Number(e.target.value),
                    })
                  }
                  sx={{ width: 80 }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      <Stack direction="row" justifyContent="center" mt={5} columnGap={10}>
        <Button
          variant="contained"
          onClick={() => handlePageNavigation.goNext()}
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
    </CustomTabPanel>
  );
};

export default AbilityScoresDialogPage;
