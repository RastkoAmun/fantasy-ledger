import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Box, Dialog, Tabs, Tab } from "@mui/material";
import CoreDialogPage from "./DialogPages/CoreDialogPage";
import {
  archtypeDefaultForm,
  abilityScoreDefaultForm,
  coreInfoDefaultForm,
  healthDefaultForm,
  proficienciesDefaultForm,
} from "@/utils/defaultForms";
import ArchtypeDialogPage from "./DialogPages/ArchtypeDialogPage";
import {
  CharacterCreationTabNumbers,
  SavingThrowsProficiencies,
  SkillProficiencies,
} from "@/utils/helpers";
import AbilityScoresDialogPage from "./DialogPages/AbilityScoresDialogPage";
import FinalizeDialogPage from "./DialogPages/FinalizeDialogPage";
import { useMutation } from "@apollo/client";
import { createAbilityScores } from "@/state/remote/mutations/createAbilityScores";
import { createCharacter } from "@/state/remote/mutations/createCharacter";
import ProficienciesDialogPage from "./DialogPages/ProficienciesDialogPage";
import { AbilityScoresQueryType, CharacterType } from "@/utils/types";
import { updateCharacter } from "@/state/remote/mutations/updateCharacter";
import { updateAbilityScores } from "@/state/remote/mutations/updateAbilityScores";
import { getAllCharactersQuery } from "@/state/remote/queries/getAllCharacters";

const tabLabels = {
  main: {
    core: "Core",
    archtype: "Archtype",
    scores: "Ability Scores",
    proficiencies: "Proficiencies",
  },
  finish: "Finish",
};

const CharacterCreationDialog = ({
  isOpen,
  isEditingMode,
  characterInfo,
  abilityScores,
  setIsOpen,
  setIsEditing,
}: {
  isOpen: boolean;
  isEditingMode?: boolean;
  characterInfo?: CharacterType;
  abilityScores?: AbilityScoresQueryType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState(0);
  const [coreForm, setCoreForm] = useState(coreInfoDefaultForm);
  const [healthForm, setHealthForm] = useState(healthDefaultForm);
  const [archtypeForm, setArchtypeForm] = useState(archtypeDefaultForm);
  const [abilityScoresForm, setAbilityScoresForm] = useState(
    abilityScoreDefaultForm
  );
  const [proficienciesForm, setProficienciesForm] = useState(
    proficienciesDefaultForm
  );

  useEffect(() => {
    if (isEditingMode && characterInfo && abilityScores) {
      setCoreForm({
        name: characterInfo.name,
        level: characterInfo.level,
      });
      setArchtypeForm({
        class: characterInfo.class,
        subclass: characterInfo.subclass,
        race: characterInfo.race,
        subrace: characterInfo.subrace,
        speed: characterInfo.speed as number,
        armor: characterInfo.armor as number,
      });
      setHealthForm({
        healthDice: characterInfo.healthDice,
        tempHealth: characterInfo.tempHealth,
        currentHealth: characterInfo.currentHealth,
        maxHealth: characterInfo.maxHealth,
      });
      setAbilityScoresForm({
        strength: abilityScores.strength,
        dexterity: abilityScores.dexterity,
        constitution: abilityScores.constitution,
        intelligence: abilityScores.intelligence,
        wisdom: abilityScores.wisdom,
        charisma: abilityScores.charisma,
      });
      setProficienciesForm({
        proficiencies: characterInfo.proficiencies as SkillProficiencies[],
        savingThrows: characterInfo.savingThrows as SavingThrowsProficiencies[],
      });
    }
  }, [characterInfo, isEditingMode, abilityScores]);

  const [createAbilityScoresMutation] = useMutation(createAbilityScores);
  const [createCharacterMutation] = useMutation(createCharacter, {
    refetchQueries: [getAllCharactersQuery],
  });

  const [updateAbilityScoresMutation] = useMutation(updateAbilityScores);
  const [updateCharacterMutation] = useMutation(updateCharacter);

  const handleSubmit = async () => {
    let abilityScoresID: number = 0;

    try {
      const response = await createAbilityScoresMutation({
        variables: { input: { ...abilityScoresForm } },
      });
      abilityScoresID = response.data.createAbilityScores.id;
      console.log(
        "Ability Scores Submitted:",
        response.data.createAbilityScores
      );
    } catch (err) {
      console.error("Error submitting ability scores:", err);
    }

    const character = {
      ...coreForm,
      ...healthForm,
      ...archtypeForm,
      ...proficienciesForm,
      abilityScoresId: abilityScoresID,
    };

    try {
      const response = await createCharacterMutation({
        variables: { input: { ...character } },
      });
      console.log("Character Submitted:", response.data.createCharacter);
    } catch (err) {
      console.error("Error submitting character:", err);
    }

    setIsOpen(false);
    setValue(0);
  };

  const handleEdit = async () => {
    try {
      const response = await updateAbilityScoresMutation({
        variables: {
          id: characterInfo?.abilityScoresId,
          input: { ...abilityScoresForm },
        },
      });

      console.log(
        "Ability Scores Submitted:",
        response.data.createAbilityScores
      );
    } catch (err) {
      console.error("Error submitting ability scores:", err);
    }

    const character = {
      ...coreForm,
      ...archtypeForm,
      ...proficienciesForm,
      ...healthForm,
      currentHealth: characterInfo?.currentHealth,
      tempHealth: characterInfo?.tempHealth,
    };

    try {
      const response = await updateCharacterMutation({
        variables: { id: characterInfo?.id, input: { ...character } },
      });
      console.log("Character Submitted:", response.data.updateCharacter);
    } catch (err) {
      console.error("Error submitting character:", err);
    }

    setIsOpen(false);
    if (setIsEditing) {
      setIsEditing(false);
    }
    setValue(0);
  };

  const handlePageNavigation = {
    goNext: () => setValue(value + 1),
    goBack: () => setValue(value - 1),
    closeButton: () => {
      setIsOpen(false);
      if (setIsEditing) {
        setIsEditing(false);
      }
      setValue(0);
    },
  };

  return (
    <Dialog open={isOpen} maxWidth={false}>
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
      <ProficienciesDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.PROFICIENCIES}
        handlePageNavigation={handlePageNavigation}
        proficienciesForm={proficienciesForm}
        setProficienciesForm={setProficienciesForm}
      />
      <FinalizeDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.FINALIZE}
        handlePageNavigation={handlePageNavigation}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        isEditing={isEditingMode}
      />
    </Dialog>
  );
};

export default CharacterCreationDialog;
