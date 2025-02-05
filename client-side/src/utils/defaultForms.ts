const coreInfoDefaultForm = {
  name: "",
  level: 1,
};

const healthDefaultForm = {
  maxHealth: 0,
  currentHealth: 0,
  temporaryHealth: 0,
  hitDice: "d6",
};

const archtypeDefaultForm = {
  class: "",
  subclass: "",
  race: "",
  subrace: "",
};

const abilityScoreDefaultForm = {
  strength: 0,
  dexterity: 0,
  consitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

export const characterSheetDefault = {
  coreInfo: coreInfoDefaultForm,
  health: healthDefaultForm,
  archtype: archtypeDefaultForm,
  abilityScores: abilityScoreDefaultForm,
};

export {
  abilityScoreDefaultForm,
  coreInfoDefaultForm,
  healthDefaultForm,
  archtypeDefaultForm,
};
