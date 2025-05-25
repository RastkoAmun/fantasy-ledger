
import Navbar from '@/components/NavBar/Navbar';
import React from 'react';

export default function CharacterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
