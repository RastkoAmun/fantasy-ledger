const abilityScores = {
  strength: 8,
  dexterity: 18,
  constitution: 12,
  intelligence: 12,
  wisdom: 16,
  charisma: 14,
};

export const resolvers = {
  Query: {
    abilityScores: () => abilityScores,
  },
};
