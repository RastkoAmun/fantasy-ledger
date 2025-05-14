import { AbilityScores } from "@/utils/helpers";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SkillProficiencies from "./SkillProficiencies/SkillProficiencies";
import { useQuery } from "@apollo/client";
import { getCharacterQuery } from "@/state/remote/queries/getCharacter";

const MainDashboard = () => {
  const { data, loading, error } = useQuery(getCharacterQuery, {
    variables: { id: 19 },
  });

  if (loading || error) return;
  if (!data) return;

  return (
    <Box mx={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        spacing={1}
        height="85vh"
      >
        <Grid item height="100%" xs={4}>
          <Stack direction="column" height="100%" width="100%">
            <Box
              height="20%"
              border={1}
              borderColor="purple"
              borderRadius={4}
              bgcolor="#dcd4d4"
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
              abilityScoresId={data.character.abilityScoresId as number}
            />
          </Stack>
        </Grid>
        <Grid item height="100%" xs={2.5}>
          <SkillProficiencies
            proficiencies={data.character.proficiencies}
            abilityScoresId={data.character.abilityScoresId}
          />
        </Grid>
        <Grid item height="100%" xs={5.5}>
          <Box height="100%" width="100%"></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
