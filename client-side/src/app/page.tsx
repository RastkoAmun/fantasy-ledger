"use client";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import MainDashboard from "@/components/CharacterSheet/MainDashboard";
import CharacterCreationDialog from "@/components/Dialogs/CharacterCreation/DialogForm";
import Test from "@/components/Test";

export default function Home() {
  return (
    <>
      {/* <Test /> */}
      <MainDashboard />
      <CharacterCreationDialog isOpen={false} />
    </>
  );
}
