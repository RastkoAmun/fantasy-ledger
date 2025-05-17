import React from "react";
import CharacterClient from "@/app/character/[id]/CharacterClient";

type PageProps = {
  params: {
    id: string;
  };
};

const Character = async ({ params }: PageProps) => {
  const id = (await params).id;

  return (
    <CharacterClient id={Number(id)} />
  );
};

export default Character;