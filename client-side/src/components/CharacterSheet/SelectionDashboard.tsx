import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { getAllCharactersQuery } from "@/state/remote/queries/getAllCharacters";
import AddIcon from "@mui/icons-material/Add";
import { Character } from "@/state/remote/__generated__/types";

const characters = [
  {
    name: "ICARUS",
    level: 3,
    class: "Warlock",
  },
  {
    name: "ICARUS",
    level: 3,
    class: "Warlock",
  },
  {
    name: "ICARUS",
    level: 3,
    class: "Warlock",
  },
];

const CardGrid = () => {
  const { data, loading, error } = useQuery(getAllCharactersQuery);

  console.log(data);

  if (loading || error) return;
  if (!data) return;

  return (
    <Box
      minHeight="80vh"
      width="70%"
      // display="flex"
      // alignItems="center"
      // justifyContent="center"
      mt={10}
      mx="auto"
    >
      <Stack>
        <Typography variant="h2" textAlign="center" mb={3}>
          Choose Your Character
        </Typography>
        <Grid
          container
          // gap={}
          rowGap={8}
          // justifyContent="center"
          // alignItems='center'
          // maxWidth="600px"
          sx={{ mx: "auto" }}
        >
          {data.characters.map((character: Character, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index} justifyItems="center">
              <Card
                elevation={5}
                sx={{
                  width: 300,
                  height: 400,
                  bgcolor: '#cae6ef',
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => alert(`Clicked ${character.name}`)}
              >
                <CardActionArea sx={{ height: "100%" }}>
                  <CardHeader
                    title={character.name}
                    subheader={`Level: ${character.level}`}
                  />
                  {/* <CardMedia
                  component="img"
                  height="150"
                  image={card.image}
                  alt={card.title}
                /> */}
                  <CardContent>
                    <Typography variant="body2">{character.class}</Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">Action</Button>
                  </CardActions> */}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} justifyItems="center">
            <Card
              elevation={5}
              sx={{
                width: 300,
                height: 400,
                bgcolor: '#cae6ef',
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  cursor: "pointer",
                },
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <AddIcon sx={{ fontSize: 200, textAlign: "center", color: '#444444' }} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default CardGrid;
