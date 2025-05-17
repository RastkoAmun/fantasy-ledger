import { Stack } from "@mui/material";
import React from "react";
import HealthBoard from "@/components/CharacterSheet/HealthAndBattle/HealthBoard";
import BattleBoard from "./BattleBoard";

const HealthAndBattleDashboard = () => {
  return (
    <Stack
      width={500}
      height='50%'
      border={2}
      borderColor='purple'
      bgcolor="#e1e1e1"
      borderRadius={3}
      justifyContent="center"
      alignItems='center'
    >
      <HealthBoard />
      <BattleBoard proficiency={2} armor={16} speed={30} initiative={5} />
    </Stack>
  );
};

export default HealthAndBattleDashboard;
