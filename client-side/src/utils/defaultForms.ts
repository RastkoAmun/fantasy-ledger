import { SavingThrowsProficiencies, SkillProficiencies } from "./helpers";

const coreInfoDefaultForm = {
  name: "",
  level: 1,
};

const healthDefaultForm = {
  maxHealth: 0,
  currentHealth: 0,
  tempHealth: 0,
  healthDice: "d6",
};

const archtypeDefaultForm = {
  class: "",
  subclass: "",
  race: "",
  subrace: "",
  speed: 0,
  armor: 0
};

const abilityScoreDefaultForm = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

const proficienciesDefaultForm = {
  proficiencies: [] as SkillProficiencies[],
  savingThrows: [] as SavingThrowsProficiencies[]
}

export const characterSheetDefault = {
  coreInfo: coreInfoDefaultForm,
  health: healthDefaultForm,
  archtype: archtypeDefaultForm,
  abilityScores: abilityScoreDefaultForm,
  proficiencies: proficienciesDefaultForm
};

export {
  abilityScoreDefaultForm,
  coreInfoDefaultForm,
  healthDefaultForm,
  archtypeDefaultForm,
  proficienciesDefaultForm
};
