import React from 'react';
import { Hero } from '../components/Hero';
import { ValueProp } from '../components/ValueProp';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ValueProp />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
};

