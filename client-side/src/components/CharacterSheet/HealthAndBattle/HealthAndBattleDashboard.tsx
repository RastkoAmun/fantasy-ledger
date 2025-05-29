import { Stack } from "@mui/material";
import React from "react";
import HealthBoard from "@/components/CharacterSheet/HealthAndBattle/HealthBoard";
import BattleBoard from "./BattleBoard";
import { CharacterType } from "@/utils/types";
import { calculateProficiency } from "@/utils/helpers";

type HealthAndBattleDashboardType = {
  character: CharacterType;
  initiative: number;
};

const HealthAndBattleDashboard = ({
  character,
  initiative,
}: HealthAndBattleDashboardType) => {
  console.log(character);
  return (
    <Stack
      width='100%'
      height='50%'
      border={2}
      borderColor="purple"
      bgcolor="#e1e1e1"
      borderRadius={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: `rgba(255,255,255,0.5)`,
        backgroundBlendMode: "lighten",
      }}
    >
      <HealthBoard character={character} />
      <BattleBoard
        proficiency={calculateProficiency(character.level) ?? 2}
        armor={character.armor ?? 10}
        speed={character.speed ?? 0}
        initiative={initiative}
      />
    </Stack>
  );
};

export default HealthAndBattleDashboard;
