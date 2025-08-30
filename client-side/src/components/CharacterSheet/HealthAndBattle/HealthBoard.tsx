import AddTempHealthDialog from "@/components/Dialogs/AddingDialogs/AddTempHealthDialog";
import { updateHealth } from "@/state/remote/mutations/updateHealth";
import { CharacterType } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const hitPointsLabels = {
  title: "HEALTH AND BATTLE BOARD",
  hpType: {
    current: "CURRENT",
    max: "MAX",
    temp: "TEMP",
  },
  buttons: {
    heal: "HEAL",
    deal: "DEAL",
  },
};

type HealthStackType = {
  label: string;
  value?: number | string | null;
  color?: string;
};

const HealthStack = ({ label, value, color }: HealthStackType) => {
  return (
    <Stack alignItems="center">
      <Typography fontSize={14} color={color ?? undefined}>
        {label}
      </Typography>
      <Typography fontSize={30}>{value}</Typography>
    </Stack>
  );
};

const HealthBoard = ({ character }: { character: CharacterType }) => {
  const [health, setHealth] = useState("");
  const [isTempHealthDialogOpen, setIsTempHealthDialogOpen] = useState(false);

  const [updateHealthMutation] = useMutation(updateHealth, {
    refetchQueries: ["GetCharacter"],
  });

  const handleHeal = () => {
    const healed = character.currentHealth + Number(health);
    try {
      updateHealthMutation({
        variables: {
          id: character.id,
          input: {
            currentHealth:
              healed > character.maxHealth ? character.maxHealth : healed,
            tempHealth: character.tempHealth,
          },
        },
      });
    } catch (err) {
      console.log("ERROR", err);
    }
    setHealth("");
  };

  const handleDeal = () => {
    let damage = Number(health);
    let tempHealth = character.tempHealth;
    if (character.tempHealth > 0) {
      tempHealth = tempHealth - damage;
      damage = damage - character.tempHealth;
    }

    if (damage > character.currentHealth) {
      damage = character.currentHealth;
    }

    try {
      updateHealthMutation({
        variables: {
          id: character.id,
          input: {
            currentHealth:
              tempHealth > 0
                ? character.currentHealth
                : character.currentHealth - damage,
            tempHealth: tempHealth <= 0 ? 0 : tempHealth,
          },
        },
      });
    } catch (err) {
      console.log("ERROR", err);
    }
    setHealth("");
  };

  return (
    <Stack width={350} height={150}>
      <Typography m={0.8} textAlign="center" fontWeight={700} fontSize={17}>
        {hitPointsLabels.title}
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <Stack direction="row" columnGap={3} justifyContent="center">
            <HealthStack
              label={hitPointsLabels.hpType.current}
              value={character.currentHealth}
            />
            <HealthStack label="/" value="/" color="transparent" />
            <HealthStack
              label={hitPointsLabels.hpType.max}
              value={character.maxHealth}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            alignItems="center"
            onClick={() => setIsTempHealthDialogOpen(true)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: `rgba(255,255,255,0.3)`,
                backgroundBlendMode: "lighten",
              },
            }}
          >
            <Typography fontSize={14}>{hitPointsLabels.hpType.temp}</Typography>
            <Typography fontSize={30}>
              {character.tempHealth != 0 ? character.tempHealth : "-"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        mx={2}
        mt={1}
        columnGap={1}
      >
        <Button
          variant="outlined"
          onClick={handleHeal}
          sx={{
            borderColor: "green",
            color: "green",
            height: 28,
            border: 2,
            "&:hover": {
              backgroundColor: `rgba(62, 131, 83, 0.3)`,
              backgroundBlendMode: "lighten",
              borderColor: "green",
              borderWidth: 2,
            },
          }}
        >
          {hitPointsLabels.buttons.heal}
        </Button>
        <TextField
          size="small"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          sx={{ width: 80 }}
          inputProps={{ style: { textAlign: "center", padding: 3 } }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleDeal}
          sx={{
            borderColor: "red",
            color: "red",
            height: 28,
            border: 2,
            "&:hover": {
              backgroundColor: `rgba(148, 44, 44, 0.3)`,
              backgroundBlendMode: "lighten",
              borderColor: "red",
              borderWidth: 2,
            },
          }}
        >
          {hitPointsLabels.buttons.deal}
        </Button>
      </Stack>
      <AddTempHealthDialog
        isOpen={isTempHealthDialogOpen}
        onClose={() => setIsTempHealthDialogOpen(false)}
        character={character}
      />
    </Stack>
  );
};

export default HealthBoard;
