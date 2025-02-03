// components/FomoPopup.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const notificationStyle = {
  width: '300px',
  height: '100px',
  backgroundColor: 'black',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const FomoPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [buyer, setBuyer] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const agents = ['Agent Smith', 'Agent Johnson', 'Agent Brown', 'Agent Thompson','Agent D.sk','Agent gogogoo'];
    const avatars = agents.map(agent => `https://api.dicebear.com/9.x/pixel-art/svg?seed=${agent}.svg`);

    const simulateEvent = () => {
      const randomIndex = Math.floor(Math.random() * agents.length);
      const randomTokens = Math.floor(Math.random() * 10230) + 1; // Random tokens between 1 and 100
      setBuyer(agents[randomIndex]);
      setAvatar(avatars[randomIndex]);
      setTokens(randomTokens);
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
    };

    const interval = setInterval(simulateEvent, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    showPopup && (
      <div className="tw-fixed tw-bottom-20 tw-left-4 tw-bg-black tw-text-white tw-p-4 tw-shadow-lg tw-rounded tw-flex tw-items-center">
        <Image src={avatar} alt="Avatar" width={50} height={50} className="tw-mr-2 tw-rounded-full" />
        <span>{buyer} just bought {tokens} ADAO tokens!</span>
        <Link
          href="https://adao.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="tw-ml-2 tw-text-blue-500 tw-underline"
        >
          Check it out!
        </Link>
      </div>
    )
  );
};

export default FomoPopup;