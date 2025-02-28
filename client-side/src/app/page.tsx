"use client";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import CharacterCreationDialog from "@/components/Dialogs/CharacterCreation/DialogForm";
import Test from "@/components/Test";

export default function Home() {
  return (
    <>
      <Test />
      <AbilityScoresDashboard />
      <CharacterCreationDialog isOpen={false} />
    </>
  );
}
