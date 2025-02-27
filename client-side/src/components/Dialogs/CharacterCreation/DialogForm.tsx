import React, { useState } from "react";
import { Box, Dialog, Tabs, Tab } from "@mui/material";
import CoreDialogPage from "./DialogPages/CoreDialogPage";
import {
  archtypeDefaultForm,
  abilityScoreDefaultForm,
  characterSheetDefault,
  coreInfoDefaultForm,
  healthDefaultForm,
} from "@/utils/defaultForms";
import ArchtypeDialogPage from "./DialogPages/ArchtypeDialogPage";
import { CharacterCreationTabNumbers } from "@/utils/helpers";
import AbilityScoresDialogPage from "./DialogPages/AbilityScoresDialogPage";
import FinalizeDialogPage from "./DialogPages/FinalizeDialogPage";
import { useMutation } from "@apollo/client";
import { createAbilityScores } from "@/state/remote/mutations/createAbilityScores";

const tabLabels = {
  main: {
    core: "Core",
    archtype: "Archtype",
    scores: "Ability Scores",
    // features: "Features",
  },
  finish: "Finish",
};

const CharacterCreationDialog = () => {
  const [value, setValue] = useState(0);
  const [characterSheet, setCharacterSheet] = useState(characterSheetDefault);
  const [coreForm, setCoreForm] = useState(coreInfoDefaultForm);
  const [healthForm, setHealthForm] = useState(healthDefaultForm);
  const [archtypeForm, setArchtypeForm] = useState(archtypeDefaultForm);
  const [abilityScoresForm, setAbilityScoresForm] = useState(
    abilityScoreDefaultForm
  );

  const [createMutation] = useMutation(createAbilityScores);

  const handleSubmit = async () => {
    try {
      const response = await createMutation({
        variables: { input: { ...abilityScoresForm } },
      });
      console.log(
        "Ability Scores Submitted:",
        response.data.createAbilityScores
      );
    } catch (err) {
      console.error("Error submitting ability scores:", err);
    }
  };

  const handlePageNavigation = {
    goNext: () => setValue(value + 1),
    goBack: () => setValue(value - 1),
  };

  return (
    <>
      <Dialog open={true} maxWidth={false}>
        <Box borderBottom={1}>
          <Tabs
            value={value}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {Object.entries(tabLabels.main).map(([key, value], index) => (
              <Tab
                key={key}
                label={value}
                onClick={() => setValue(index)}
                sx={{
                  width: 155,
                  borderRight: 1,
                  "&.Mui-selected": {
                    backgroundColor: "teal",
                    color: "white",
                  },
                }}
              />
            ))}
            <Tab
              label={tabLabels.finish}
              onClick={() => setValue(CharacterCreationTabNumbers.FINALIZE)}
              color="green"
              sx={{
                width: 180,
                "&.Mui-selected": {
                  backgroundColor: "teal",
                  color: "white",
                },
              }}
            />
          </Tabs>
        </Box>
        <CoreDialogPage
          value={value}
          tabNumber={CharacterCreationTabNumbers.CORE}
          handlePageNavigation={handlePageNavigation}
          coreForm={coreForm}
          healthForm={healthForm}
          setCoreForm={setCoreForm}
          setHealthForm={setHealthForm}
        />
        <ArchtypeDialogPage
          value={value}
          tabNumber={CharacterCreationTabNumbers.ARCHTYPE}
          handlePageNavigation={handlePageNavigation}
          setArchtypeForm={setArchtypeForm}
          archtypeForm={archtypeForm}
        />
        <AbilityScoresDialogPage
          value={value}
          tabNumber={CharacterCreationTabNumbers.ABILITY_SCORES}
          handlePageNavigation={handlePageNavigation}
          abilityScoresForm={abilityScoresForm}
          setAbilityScoresForm={setAbilityScoresForm}
        />
        <FinalizeDialogPage
          value={value}
          tabNumber={CharacterCreationTabNumbers.FINALIZE}
          handlePageNavigation={handlePageNavigation}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    </>
  );
};

export default CharacterCreationDialog;
