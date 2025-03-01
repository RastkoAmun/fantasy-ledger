import { AbilityScores } from "@/utils/helpers";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const MainDashboard = () => {
  return (
    <Box mx={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        spacing={1}
        height="80vh"
      >
        <Grid item height="100%" xs={4}>
          <Stack direction="column" bgcolor="teal" height="100%" width="100%">
            <Box height="20%" bgcolor="red" margin={2}>
              Placeholder
            </Box>
            <AbilityScoresDashboard />
            <Box height="20%" bgcolor="red" margin={2}>
              Placeholder
            </Box>
          </Stack>
        </Grid>
        <Grid item height="100%" xs={3}>
          <Box bgcolor="teal" height="100%" width="100%">
            Placeholder
          </Box>
        </Grid>
        <Grid item height="100%" xs={5}>
          <Box bgcolor="teal" height="100%" width="100%">
            Placeholder
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
  // return <AbilityScoresDashboard />;
};

export default MainDashboard;
