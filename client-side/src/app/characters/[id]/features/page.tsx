import Features from '@/components/Features/Features'
import { PageProps } from '@/utils/types';
import React from 'react'

const page = async ({ params }: PageProps) => {
  const id = (await params).id;

  return (
    <Features characterId={id}/>
  )
}

export default page