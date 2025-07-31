"use client";
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  CardMedia,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { getAllCharactersQuery } from "@/state/remote/queries/getAllCharacters";
import AddIcon from "@mui/icons-material/Add";
import { Character } from "@/state/remote/__generated__/types";
import { useRouter } from "next/navigation";

const CardGrid = () => {
  const { data, loading, error } = useQuery(getAllCharactersQuery);

  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/characters/${id}`);
  };

  console.log(data);

  if (loading || error) return;
  if (!data) return;

  return (
    <Box minHeight="80vh" width="70%" mt={10} mx="auto">
      <Stack>
        <Typography variant="h2" textAlign="center" mb={5}>
          Choose Your Character
        </Typography>
        <Grid container rowGap={8} sx={{ mx: "auto" }} justifyContent="center">
          {data.characters.map((character: Character, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index} justifyItems="center">
              <Card
                elevation={5}
                sx={{
                  width: 300,
                  height: 400,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #ede7f6, #d1c4e9)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleRedirect(character.id as number)}
              >
                <CardMedia
                  sx={{
                    height: 160,
                    objectPosition: "top",
                  }}
                  image={`/backgrounds/${(character.class as any).toLowerCase().replace(/ /g, '-')}.png`}
                  title="green iguana"
                  component="img"
                />
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <CardHeader
                    title={character.name}
                    subheader={`Level: ${character.level}`}
                    titleTypographyProps={{ fontSize: 50 }}
                    subheaderTypographyProps={{ fontSize: 24 }}
                  />

                  <CardContent>
                    <Typography variant="body2" fontSize={20}>
                      {character.subrace} {character.race}{" "}
                    </Typography>
                    <Typography variant="body2" fontSize={20} mt={1}>
                      {" "}
                      {character.subclass} {character.class}
                    </Typography>
                  </CardContent>
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
                borderRadius: 3,
                bgcolor: "#cae6ef",
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
                  <AddIcon
                    sx={{
                      fontSize: 200,
                      textAlign: "center",
                      color: "#444444",
                    }}
                  />
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
