import React from 'react';
import { Navbar } from './Navbar';
import { Maarquee } from './Marquee';
import { LandingPage } from './Landing';
import { Footer } from './Footer';

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Maarquee />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default HomeLayout;
