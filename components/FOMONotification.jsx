'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fomoCache } from '../lib/fomo-cache';

// Default avatar for FOMO notifications
const defaultAvatar = '/api/placeholder/50/50';

export default function FOMONotification() {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const showNotification = useCallback(() => {
    if (!notification) return;

    setIsVisible(true);
    setIsAnimating(true);

    // Hide after 30 seconds (as requested)
    setTimeout(() => {
      hideNotification();
    }, 30000); // 30 seconds display time
  }, [notification]);

  useEffect(() => {
    // Listen for FOMO notifications
    const handleFOMONotification = (event) => {
      const notificationData = event.detail;
      setNotification(notificationData);
      showNotification();
    };

    // Listen for custom FOMO events
    window.addEventListener('fomo-notification', handleFOMONotification);

    // Start the FOMO system
    fomoCache.start();

    // Cleanup
    return () => {
      window.removeEventListener('fomo-notification', handleFOMONotification);
      fomoCache.stop();
    };
  }, [showNotification]);


  const hideNotification = () => {
    setIsAnimating(false);
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsVisible(false);
      setNotification(null);
    }, 500); // 0.5 second fade out
  };

  const handleClick = () => {
    // Track click for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'fomo_notification_click', {
        event_category: 'engagement',
        event_label: notification?.id || 'unknown'
      });
    }
  };

  if (!isVisible || !notification) {
    return null;
  }

  return (
    <div 
      className={`tw-fixed tw-bottom-20 tw-left-4 tw-bg-black tw-text-white tw-p-4 tw-shadow-lg tw-rounded-lg tw-flex tw-items-center tw-z-50 tw-max-w-sm tw-transition-all tw-duration-500 ${
        isAnimating 
          ? 'tw-opacity-100 tw-transform tw-translate-x-0' 
          : 'tw-opacity-0 tw-transform tw--translate-x-full'
      }`}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        border: '1px solid #333',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Avatar */}
      <div className="tw-mr-3 tw-flex-shrink-0">
        <Image 
          src={defaultAvatar} 
          alt={`${notification.name} avatar`} 
          width={50} 
          height={50} 
          className="tw-rounded-full tw-border-2 tw-border-gray-600" 
        />
      </div>

      {/* Notification Content */}
      <div className="tw-flex-1 tw-min-w-0">
        <p className="tw-text-sm tw-text-white tw-leading-relaxed">
          <span className="tw-font-semibold tw-text-blue-400">{notification.name}</span>
          {' '}just bought{' '}
          <span className="tw-font-bold tw-text-green-400">{notification.amount}</span>
          {' '}ADAO tokens!
        </p>
        
        <Link
          href="/buy"
          onClick={handleClick}
          className="tw-text-blue-500 hover:tw-text-blue-400 tw-underline tw-text-sm tw-mt-1 tw-inline-block tw-transition-colors tw-duration-200"
        >
          Check it out!
        </Link>
      </div>

      {/* Close Button */}
      <button
        onClick={hideNotification}
        className="tw-ml-2 tw-text-gray-400 hover:tw-text-white tw-transition-colors tw-duration-200 tw-flex-shrink-0"
        aria-label="Close notification"
      >
        <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Hook for manually triggering FOMO notifications (useful for testing)
export const useFOMONotification = () => {
  const triggerNotification = (name, amount) => {
    const notification = {
      id: `manual_${Date.now()}`,
      name: name || fomoCache.getRandomName(),
      amount: amount || fomoCache.getRandomAmount(),
      isFake: true
    };
    
    window.dispatchEvent(new CustomEvent('fomo-notification', {
      detail: notification
    }));
  };

  const addPurchase = (amount) => {
    fomoCache.addPurchase(amount);
  };

  const getStats = () => {
    return fomoCache.getStats();
  };

  return {
    triggerNotification,
    addPurchase,
    getStats
  };
};
