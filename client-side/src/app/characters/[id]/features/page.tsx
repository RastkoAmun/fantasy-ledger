import Features from '@/components/Features/Features'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <Features characterId={id}/>
  )
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return [{ id: '1' }, { id: '2' }]; // test data
}

export default page