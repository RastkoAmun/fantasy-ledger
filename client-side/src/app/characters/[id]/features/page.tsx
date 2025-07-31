import Features from '@/components/Features/Features'
import React from 'react'

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const id = (await params).id;

  return (
    <Features characterId={id}/>
  )
}

export default page