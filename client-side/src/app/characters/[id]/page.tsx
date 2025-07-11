import React from "react";
import CharacterClient from "@/app/characters/[id]/CharacterClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Character = async (props: PageProps) => {
  const params = await props.params;
  const id = params.id;

  return (
    <CharacterClient id={Number(id)} />
  );
};

export default Character;