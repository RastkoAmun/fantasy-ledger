import { AbilityScores } from "@/utils/helpers";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SkillProficiencies from "./SkillProficiencies/SkillProficiencies";
import { useQuery } from "@apollo/client";
import { getCharacterQuery } from "@/state/remote/queries/getCharacter";
import getAbilityScores from "@/state/remote/queries/getAbilityScores";
import SavingThrowsDashboard from "./SavingThrows/SavingThrowsDashboard";
import HealthAndBattleDashboard from "./HealthAndBattle/HealthAndBattleDashboard";

const MainDashboard = () => {
  const {
    data: characterData,
    loading,
    error,
  } = useQuery(getCharacterQuery, {
    variables: { id: 19 },
  });

  const {
    data: abilitiesData,
    loading: abilitiesLoading,
    error: abilitiesError,
  } = useQuery(getAbilityScores, {
    variables: { id: characterData?.character?.abilityScoresId },
  });

  if (loading || abilitiesLoading) return;
  if (error || abilitiesError) return;
  if (!characterData || !abilitiesData) return;

  return (
    <Box mx={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        spacing={1}
        height="78vh"
        width="90%"
      >
        <Grid item height="100%" xs={4}>
          <Stack direction="column" height="100%" width="100%">
            <Box
              height="30%"
              border={2}
              borderColor="purple"
              borderRadius={4}
              bgcolor="#e1e1e1"
              boxSizing="border-box"
            >
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <Box width={80} height={80} m={1} bgcolor="blue">
                    <Image
                      src="/images/ChImage.png"
                      alt="character-picture"
                      width={80}
                      height={80}
                    />
                  </Box>
                  <Stack mt={1}>
                    <Typography>Eryarus</Typography>
                    <Typography>Level: 1</Typography>
                    <Typography>Male / Half-Elf</Typography>
                  </Stack>
                </Stack>
                <Stack mr={3} justifyContent="center">
                  <Typography>Gloomstalker</Typography>
                  <Typography>Ranger</Typography>
                </Stack>
              </Stack>
            </Box>
            <AbilityScoresDashboard
              abilityScores={abilitiesData.abilityScores}
            />
            <SavingThrowsDashboard
              abilityScores={abilitiesData.abilityScores}
              savingThrows={characterData.character.savingThrows}
            />
          </Stack>
        </Grid>
        <Grid item height="100%" xs={2.5}>
          <SkillProficiencies
            proficiencies={characterData.character.proficiencies}
            abilityScores={abilitiesData.abilityScores}
          />
        </Grid>
        <Grid item width="100%" height="100%" xs={5.5}>
          <HealthAndBattleDashboard />
          <Box
            width={500}
            height="31%"
            border={2}
            borderColor="purple"
            borderRadius={5}
            mt={1}
            bgcolor="#e1e1e1"
          ><Typography fontSize={16} fontWeight={700} textAlign='center' mt={1}>CONDITIONS</Typography></Box>
          <Box width={500} height="20%" mt={1}>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    bgcolor: "purple",
                  }}
                >
                  <Typography>Go to Inventory</Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: 80,
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    bgcolor: "purple",
                  }}
                >
                  <Typography textAlign="center">
                    Go to
                    <br />
                    Spells
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: 80,
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    bgcolor: "purple",
                  }}
                >
                  <Typography>Go to Features</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
