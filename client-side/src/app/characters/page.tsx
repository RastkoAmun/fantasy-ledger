import React from 'react'
import SelectionDashboard from "@/components/CharacterSheet/SelectionDashboard";
import { AuthGuard } from '@/state/authWrapper';

// const page = () => {
//   return (
//     <div>
//       <SelectionDashboard />
//     </div>
//   )
// }

const page = () => {
  return (
    <AuthGuard>
      <SelectionDashboard />
    </AuthGuard>
  )
}

export default page