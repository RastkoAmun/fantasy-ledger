// "use client"
import React from "react";
import CharacterClient from "@/app/[character]/CharacterClient";
import { useRouter } from 'next/navigation';

type PageProps = {
  params: {
    character: string; // this matches [character] in your folder
  };
};

const Character = async ({ params }: PageProps) => {
  const id = (await params).character;

  // const router = useRouter();
  // const { id } = router.;

  return (
    <CharacterClient id={Number(id)} />
  );
};

export default Character;