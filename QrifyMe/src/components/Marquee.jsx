import React from 'react';
import Marquee from 'react-fast-marquee';

export const Maarquee = () => {
  return (
    <Marquee
      fade={true}
      direction="left"
      reverse={false}
      pauseOnHover={false}
      className="bg-gray-200 p-1"
      innerClassName="flex space-x-4 items-center" 
      // Tighter spacing between items
    >
      <div className="text-sm font-bold text-black-300">
        Simplify Your Menu, Amplify Your Business 🚀
      </div>
      <div className="text-sm font-bold text-black-300">
        Go Digital with Qrify Me 📱
      </div>
      <div className="text-sm font-bold text-black-500">
        Instant Updates & Real-Time Engagement ⏱️
      </div>
      <div className="text-sm  font-bold text-black-500">
        Digital Menus for Every Vendor 🍽️
      </div>
      <div className="text-sm font-bold text-black-500">
        Your QR Code, Your Future 🔥
      </div>
    </Marquee>
  );
};
