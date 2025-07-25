"use client";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { getCharacterQuery } from "@/state/remote/queries/getCharacter";
import getAbilityScores from "@/state/remote/queries/getAbilityScores";
import SavingThrowsDashboard from "@/components/CharacterSheet/SavingThrows/SavingThrowsDashboard";
import SkillProficiencies from "@/components/CharacterSheet/SkillProficiencies/SkillProficiencies";
import HealthAndBattleDashboard from "@/components/CharacterSheet/HealthAndBattle/HealthAndBattleDashboard";
import CharacterInfo from "@/components/CharacterSheet/CharacterInfo/CharacterInfo";
import { calculateModifier } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const CharacterClient = ({ id }: { id: number }) => {
  const {
    data: characterData,
    loading,
    error,
  } = useQuery(getCharacterQuery, {
    variables: { id: id },
  });

  const {
    data: abilitiesData,
    loading: abilitiesLoading,
    error: abilitiesError,
  } = useQuery(getAbilityScores, {
    variables: { id: characterData?.character?.abilityScoresId },
  });

  const router = useRouter()

  if (loading || abilitiesLoading) return;
  if (error || abilitiesError) return;
  if (!characterData || !abilitiesData) return;

  const handleRedirect = (path: string) => {
    router.push(`/characters/${id}/${path}`);
  };

  return (
    <Box
      width="80%"
      height="100vh"
      display="flex"
      justifySelf="center"
      alignItems="center"
      mx="auto"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        spacing={1}
        height="78vh"
        width="100%"
      >
        <Grid item height="100%" xs={4}>
          <Stack direction="column" height="100%" width="100%">
            <CharacterInfo character={characterData.character} />
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
          <HealthAndBattleDashboard
            character={characterData.character}
            initiative={
              calculateModifier(abilitiesData.abilityScores.dexterity).modifier
            }
          />
          <Box
            height="31%"
            border={2}
            borderColor="purple"
            borderRadius={5}
            mt={1}
            bgcolor="#e1e1e1"
            sx={{
              backgroundColor: `rgba(255,255,255,0.4)`,
              backgroundBlendMode: "lighten",
            }}
          >
            <Typography
              fontSize={16}
              fontWeight={700}
              textAlign="center"
              mt={1}
            >
              CONDITIONS
            </Typography>
          </Box>
          <Box width={500} height="20%" mt={1}>
            <Grid container spacing={1}>
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
                  onClick={() => handleRedirect("features")}
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

export default CharacterClient;
