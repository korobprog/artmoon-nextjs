'use client';

import React from 'react';
import Curtains from '@/components/Curtains';

interface CurtainsContentProps {
  children: React.ReactNode;
}

export default function CurtainsContent({ children }: CurtainsContentProps) {
  return <Curtains>{children}</Curtains>;
}
