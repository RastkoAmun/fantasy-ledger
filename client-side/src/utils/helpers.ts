export enum AbilityScores {
  STRENGTH = "STRENGTH",
  DEXTERITY = "DEXTERITY",
  CONSTITUTION = "CONSTITUTION",
  INTELLIGENCE = "INTELLIGENCE",
  WISDOM = "WISDOM",
  CHARISMA = "CHARISMA",
}

export enum CharacterCreationTabNumbers {
  CORE = 0,
  ARCHTYPE = 1,
  ABILITY_SCORES = 2
}

type AbilityScoreModifierType = {
  modifier: number;
  sign: string;
};

export const calculateModifier = (value: number): AbilityScoreModifierType => {
  switch (value) {
    case 10:
    case 11:
      return {
        modifier: 0,
        sign: "",
      };
    case 12:
    case 13:
      return {
        modifier: 1,
        sign: "+",
      };
    case 14:
    case 15:
      return {
        modifier: 2,
        sign: "+",
      };
    case 16:
    case 17:
      return {
        modifier: 3,
        sign: "+",
      };
    case 18:
    case 19:
      return {
        modifier: 4,
        sign: "+",
      };
    case 20:
      return {
        modifier: 5,
        sign: "+",
      };
    case 9:
    case 8:
      return {
        modifier: -1,
        sign: "",
      };
    case 7:
    case 6:
      return {
        modifier: -2,
        sign: "",
      };
    case 5:
    case 4:
      return {
        modifier: -3,
        sign: "",
      };
    case 3:
      return {
        modifier: -4,
        sign: "",
      };
    default:
      return {
        modifier: 0,
        sign: "",
      };
  }
};
