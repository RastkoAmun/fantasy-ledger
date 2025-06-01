import { AbilityScores, Character } from "@/state/remote/__generated__/types";

export type InputEventType = React.ChangeEvent<HTMLInputElement>
export type FormEventType = React.FormEvent<HTMLFormElement>

export type PageNavigation = {
  goNext: () => void;
  goBack: () => void;
};

// Form Types
export type hitDiceType = "d6" | "d8" | "d10" | "d12";


export type AbilityScoresQueryType = Omit<AbilityScores, '__typename'>
export type AbilityScoresQueryKeysType = keyof AbilityScoresQueryType
export type CharacterType = Omit<Character, '__typename'>