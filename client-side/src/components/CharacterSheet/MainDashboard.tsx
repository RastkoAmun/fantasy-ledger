import { AbilityScores } from "@/utils/helpers";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Grid, Stack } from "@mui/material";

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
            <AbilityScoresDashboard />
          </Stack>
        </Grid>
        <Grid item height="100%" xs={4}>
          <Box bgcolor="teal" height="100%" width="100%">
            d
          </Box>
        </Grid>
        <Grid item height="100%" xs={4}>
          <Box bgcolor="teal" height="100%" width="100%">
            d
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
  // return <AbilityScoresDashboard />;
};

export default MainDashboard;
