import React from 'react';
import ExhibitionsGallery from '@/components/ExhibitionsGallery';
import Curtains from '@/components/Curtains';

export default function ExhibitionsPage() {
  return (
    <div className="min-h-screen relative">
      <Curtains>
        <div className="container mx-auto px-4 py-8">
          <ExhibitionsGallery />
        </div>
      </Curtains>
    </div>
  );
}
