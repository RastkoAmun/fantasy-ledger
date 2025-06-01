"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { calculateModifier } from "@/utils/helpers";
import { AbilityScoresQueryType } from "@/utils/types";

enum SkillCategoriesType {
  STRENGTH = "STRENGTH",
  DEXTERITY = "DEXTERITY",
  INTELLIGENCE = "INTELLIGENCE",
  WISDOM = "WISDOM",
  CHARISMA = "CHARISMA",
}

type Skills = {
  [key in SkillCategoriesType]: string[];
};

const skillProficiencies: Skills = {
  STRENGTH: ["Athletics"],
  DEXTERITY: ["Acrobatics", "Slight of Hand", "Stealth"],
  INTELLIGENCE: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  WISDOM: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  CHARISMA: ["Deception", "Intimidation", "Performance", "Persuasion"],
};

const proficiencyMapping = {
  acrobatics: "dexterity",
  "animal handling": "wisdom",
  arcana: "intelligence",
  athletics: "strength",
  deception: "charisma",
  history: "intelligence",
  insight: "wisdom",
  intimidation: "charisma",
  investigation: "intelligence",
  medicine: "wisdom",
  nature: "intelligence",
  perception: "wisdom",
  performance: "charisma",
  persuasion: "charisma",
  religion: "intelligence",
  "slight of hand": "dexterity",
  stealth: "dexterity",
  survival: "wisdom",
};

type Skill = keyof typeof proficiencyMapping;
type Ability = (typeof proficiencyMapping)[Skill];

const calculateSkillModifier = (
  skill: Skill,
  abilityScores: Record<Ability, number>,
  isProficient: boolean
) => {
  let result = 0;
  const { modifier } = calculateModifier(
    abilityScores[proficiencyMapping[skill]]
  );

  result = result + modifier;
  if (isProficient) result = result + 2;

  if (result >= 0) return "+" + result;
  else return result;
};

const SkillProficiencies = ({
  proficiencies,
  abilityScores,
}: {
  proficiencies: string[];
  abilityScores: AbilityScoresQueryType;
}) => {
  const proficiencySet = new Set(proficiencies);

  return (
    <>
      <Box
        border={2}
        borderColor="purple"
        bgcolor="#e1e1e1"
        borderRadius={4}
        height="100%"
        sx={{
          backgroundColor: `rgba(255,255,255,0.5)`,
          backgroundBlendMode: "lighten",
        }}
      >
        <Stack m={1}>
          <Typography fontWeight={700} textAlign="center" mb={1}>
            SKILLS
          </Typography>
          <Stack>
            {Object.keys(skillProficiencies).map((category) => {
              return (
                <Stack key={category}>
                  <Typography fontSize={14} fontWeight={600}>
                    {category}
                  </Typography>
                  {skillProficiencies[
                    category as keyof typeof SkillCategoriesType
                  ].map((skill) => (
                    <Stack
                      key={skill}
                      direction="row"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction="row"
                        ml={3}
                        display="flex"
                        alignItems="center"
                      >
                        {proficiencySet.has(skill.toLowerCase()) ? (
                          <FiberManualRecordIcon
                            fontSize="small"
                            sx={{
                              fontSize: 16,
                              verticalAlign: "middle",
                              color: "purple",
                            }}
                          />
                        ) : (
                          <FiberManualRecordOutlinedIcon
                            fontSize="small"
                            sx={{
                              fontSize: 16,
                              verticalAlign: "middle",
                            }}
                          />
                        )}
                        {
                          <FiberManualRecordOutlinedIcon
                            fontSize="small"
                            sx={{
                              fontSize: 16,
                              mr: 1,
                              verticalAlign: "middle",
                            }}
                          />
                        }
                        <Typography fontSize={14}>{skill}</Typography>
                      </Stack>
                      <Box
                        width={30}
                        height={20}
                        border={1}
                        bgcolor="white"
                        borderRadius={1}
                      >
                        <Typography
                          fontSize={17}
                          fontFamily="monospace"
                          height="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {calculateSkillModifier(
                            skill.toLowerCase() as Skill,
                            abilityScores,
                            proficiencySet.has(skill.toLowerCase())
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SkillProficiencies;
