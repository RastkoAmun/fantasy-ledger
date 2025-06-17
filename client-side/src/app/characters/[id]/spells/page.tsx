import Features from '@/components/Features/Features'
import Spells from '@/components/Spells/Spells';
import { PageProps } from '@/utils/types';
import React from 'react'

const page = async ({ params }: PageProps) => {
  const id = (await params).id;

  return (
    <Spells characterId={id}/>
  )
}

export default page