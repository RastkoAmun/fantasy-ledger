"use client";
import MainDashboard from "@/components/CharacterSheet/MainDashboard";
import SelectionDashboard from "@/components/CharacterSheet/SelectionDashboard";
import CharacterCreationDialog from "@/components/Dialogs/CharacterCreation/DialogForm";
import Test from "@/components/Test";

export default function Home() {
  return (
    <>
      {/* <Test />
      <MainDashboard />
      <CharacterCreationDialog isOpen={false} /> */}
      <SelectionDashboard />
    </>
  );
}
