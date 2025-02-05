export type InputEventType = React.ChangeEvent<HTMLInputElement>

export type PageNavigation = {
  goNext: () => void;
  goBack: () => void;
};

// Form Types
export type hitDiceType = "d6" | "d8" | "d10" | "d12";
