"use client";
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Rocket, Crown, Zap, ArrowRight, Clock, CheckCircle } from 'lucide-react';

/**
 * First100FoundersModal Component
 * 
 * @param {Object} props
 * @param {string} [props.targetUrl='/first100founders'] - URL path to navigate to when CTA button is clicked
 * @param {number} [props.delay=15000] - Delay in milliseconds before showing the modal (15 seconds)
 * @param {string[]} [props.excludedPaths=['/first100founders', '/admin']] - Array of path prefixes to exclude the modal from showing
 * @param {string} [props.sessionKey='first100founders_modal_shown'] - Custom session storage key for tracking if modal was shown
 * @param {Function} [props.onNavigate] - Custom navigation handler function (for Next.js router.push, etc.). If not provided, will use window.location.href
 * @param {Function} [props.getCurrentPath] - Custom function to get current pathname. If not provided, will use window.location.pathname
 * @param {Object} [props.content] - Custom content overrides
 * @param {string} [props.content.title] - Custom title
 * @param {string} [props.content.subtitle] - Custom subtitle
 * @param {string} [props.content.description] - Custom description
 * @param {string} [props.content.ctaText] - Custom CTA button text
 * @param {string} [props.content.dismissText] - Custom dismiss button text
 * @param {string} [props.content.footerText] - Custom footer text
 * @param {Array} [props.benefits] - Custom benefits list
 * @param {Object} [props.pricing] - Pricing information
 * @param {number} [props.zIndex=9999] - Z-index for the modal
 * @param {boolean} [props.isOpen] - Whether to show the modal (controlled mode). If provided, component becomes controlled
 * @param {Function} [props.onClose] - Callback when modal is closed
 * @param {Function} [props.onCTAClick] - Callback when CTA is clicked
 * @param {boolean} [props.testMode=false] - Test mode - shows immediately and ignores sessionStorage
 */
export const First100FoundersModal = ({
  targetUrl = '/first100founders',
  delay = 15000,
  excludedPaths = ['/first100founders', '/admin'],
  sessionKey = 'first100founders_modal_shown',
  onNavigate,
  getCurrentPath,
  content,
  benefits,
  pricing,
  zIndex = 9999,
  isOpen: controlledIsOpen,
  onClose,
  onCTAClick,
  testMode = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const isControlled = controlledIsOpen !== undefined;

  // Get current pathname
  const getPathname = () => {
    if (getCurrentPath) {
      return getCurrentPath();
    }
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '';
  };

  useEffect(() => {
    // If controlled, use controlled state
    if (isControlled) {
      setIsVisible(controlledIsOpen || false);
      return;
    }

    // Check if current date is after December 31, 2025
    const expiryDate = new Date('2025-12-31T23:59:59');
    const currentDate = new Date();
    if (currentDate > expiryDate) {
      console.log('[First100FoundersModal] Offer expired - current date is after December 31, 2025');
      return;
    }

    // Check if path is excluded FIRST (before test mode or anything else)
    const currentPath = getPathname();
    console.log('[First100FoundersModal] Current path:', currentPath, 'Excluded paths:', excludedPaths);
    const isExcluded = excludedPaths.some(path => currentPath.startsWith(path));
    
    if (isExcluded) {
      console.log('[First100FoundersModal] Path excluded:', currentPath);
      return;
    }
    
    console.log('[First100FoundersModal] Path NOT excluded, continuing...');

    // Test mode - show immediately (only if not excluded and not expired)
    if (testMode) {
      const currentDate = new Date();
      const expiryDate = new Date('2025-12-31T23:59:59');
      if (currentDate > expiryDate) {
        console.log('[First100FoundersModal] Test mode - but offer expired, not showing');
        return;
      }
      console.log('[First100FoundersModal] Test mode - showing immediately');
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Check if user has already dismissed this modal in this session
    if (typeof window !== 'undefined') {
      // Allow clearing via URL parameter for testing: ?clearModal=true
      const urlParams = new URLSearchParams(window.location.search);
      const clearModal = urlParams.get('clearModal') === 'true';
      
      if (clearModal) {
        console.log('[First100FoundersModal] Clearing sessionStorage due to ?clearModal=true parameter');
        sessionStorage.removeItem(sessionKey);
      }
      
      const wasShown = sessionStorage.getItem(sessionKey);
      
      if (wasShown && !testMode && !clearModal) {
        console.log('[First100FoundersModal] Already shown in this session.');
        console.log('[First100FoundersModal] To test again, add ?clearModal=true to URL or run: sessionStorage.removeItem("' + sessionKey + '")');
        setHasShown(true);
        return;
      }

      console.log('[First100FoundersModal] Will show after', delay, 'ms on path:', currentPath);
      
      // Show modal after delay
      const timer = setTimeout(() => {
        // Check if offer has expired
        const currentDate = new Date();
        const expiryDate = new Date('2025-12-31T23:59:59');
        if (currentDate > expiryDate) {
          console.log('[First100FoundersModal] Offer expired - not showing modal');
          return;
        }
        
        // Double-check path hasn't changed
        const finalPath = getPathname();
        const stillExcluded = excludedPaths.some(path => finalPath.startsWith(path));
        
        if (stillExcluded) {
          console.log('[First100FoundersModal] Path became excluded, not showing:', finalPath);
          return;
        }
        
        console.log('[First100FoundersModal] Showing modal now on path:', finalPath);
        setIsVisible(true);
        if (!testMode) {
          sessionStorage.setItem(sessionKey, 'true');
        }
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay, excludedPaths, sessionKey, isControlled, controlledIsOpen, testMode]);

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
    if (onClose) {
      onClose();
    }
  };

  // No longer needed since we use <a> for external link

  // Default benefits
  const defaultBenefits = benefits || [
    { 
      icon: <Rocket className="w-8 h-8" />, 
      text: 'Full platform access on January 15, 2026', 
      color: 'text-blue-300', 
      bg: 'from-blue-500/20 to-cyan-500/20' 
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      text: 'Auto-built contractor website with ALL AI agents', 
      color: 'text-purple-300', 
      bg: 'from-purple-500/20 to-pink-500/20' 
    },
    { 
      icon: <Crown className="w-8 h-8" />, 
      text: 'Early access to DomainFund Secret Auction', 
      color: 'text-yellow-300', 
      bg: 'from-yellow-500/20 to-orange-500/20' 
    },
    { 
      icon: <Sparkles className="w-8 h-8" />, 
      text: 'Founders Badge & exclusive community access', 
      color: 'text-pink-300', 
      bg: 'from-pink-500/20 to-red-500/20' 
    }
  ];

  // Default pricing
  const defaultPricing = pricing || {
    startingPrice: '$99',
    freePlanText: '1-month free Starter Plan included',
    plans: [
      { name: 'Professional Plan', price: '$299/month' },
      { name: 'Enterprise Plan', price: '$999/month' }
    ],
    limitedSlots: 'Only 100 available',
    expiryDate: 'December 31, 2025'
  };

  // Prevent body scroll when modal is visible
  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll on cleanup
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isVisible]);

  // Debug logging
  useEffect(() => {
    const currentPath = getPathname();
    const isExcluded = excludedPaths.some(path => currentPath.startsWith(path));
    
    console.log('[First100FoundersModal] Component mounted', {
      isVisible,
      hasShown,
      isControlled,
      testMode,
      currentPath,
      isExcluded,
      delay,
      excludedPaths
    });
    
    if (isVisible) {
      console.log('[First100FoundersModal] Modal is visible - should render now');
    }
  }, [isVisible, hasShown, isControlled, testMode, excludedPaths, delay]);

  // Early return if path is excluded (even before checking visibility)
  const currentPath = getPathname();
  const isExcluded = excludedPaths.some(path => currentPath.startsWith(path));
  if (isExcluded) {
    return null;
  }

  if (!isVisible || hasShown) {
    console.log('[First100FoundersModal] Not rendering:', { isVisible, hasShown });
    return null;
  }

  console.log('[First100FoundersModal] RENDERING MODAL NOW');

  return (
    <div
      className="tw-fixed tw-inset-0 tw-w-full tw-h-full"
      style={{
        zIndex: zIndex || 99999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #581c87, #1e3a8a, #312e81)', // fully opaque
        overflow: 'hidden',
      }}
      data-testid="first100founders-modal"
    >
      {/* Decorative overlays and blobs - moved here to always cover the full modal */}
      <div
        className="tw-absolute tw-inset-0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(234, 179, 8, 0.2), rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          className="tw-absolute tw-top-0 tw-right-0 tw-w-96 tw-h-96 tw-rounded-full tw-blur-3xl"
          style={{
            background: 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.3), rgba(249, 115, 22, 0.3))',
          }}
        ></div>
        <div
          className="tw-absolute tw-bottom-0 tw-left-0 tw-w-96 tw-h-96 tw-rounded-full tw-blur-3xl"
          style={{
            background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))',
          }}
        ></div>
        <div
          className="tw-absolute tw-top-1/2 tw-left-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-w-96 tw-h-96 tw-rounded-full tw-blur-3xl"
          style={{
            background: 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(239, 68, 68, 0.2))',
          }}
        ></div>
      </div>
      {/* Content Container - scrollable only if content overflows */}
      <div
        className="tw-flex tw-flex-col tw-items-center tw-p-4 md:tw-p-8 lg:tw-p-12 tw-pt-24 tw-overflow-y-auto"
        style={{
          position: 'relative',
          minHeight: '100%',
          width: '100%',
          zIndex: 10,
          pointerEvents: 'auto',
          maxHeight: '100%',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="tw-absolute tw-top-4 tw-right-4 tw-z-30 tw-p-2"
          aria-label="Close"
          style={{ zIndex: 30, background: 'none', border: 'none' }}
        >
          <X className="tw-w-6 tw-h-6 tw-text-white" />
        </button>

        {/* Main Content */}
        <div className="tw-max-w-6xl tw-w-full tw-space-y-8 md:tw-space-y-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {/* Header Section */}
          <div className="tw-text-center tw-space-y-6">
            <div className="tw-inline-flex tw-items-center tw-space-x-2 tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500 tw-rounded-full tw-px-6 tw-py-2 tw-shadow-xl tw-mb-4 tw-border tw-border-yellow-300 tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider">
              <Sparkles className="tw-w-5 tw-h-5 tw-text-white tw-animate-pulse" />
              <span className="tw-text-white tw-font-bold tw-text-xs tw-uppercase tw-tracking-wider">
                {content?.title || 'Limited Time Offer'}
              </span>
            </div>
            
            <h1 className="tw-text-5xl md:tw-text-6xl lg:tw-text-7xl tw-font-extrabold tw-mb-6 tw-leading-tight">
              <span
                style={{
                  background: 'linear-gradient(to right, rgb(253, 224, 71), rgb(255, 255, 255), rgb(147, 197, 253))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline',
                }}
              >
                🎉 Be One of the {content?.subtitle || 'First 100 Founders!'}
              </span>
            </h1>
            
            <p className="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-white/90 tw-font-semibold tw-mb-4">
              {content?.description || "Don't wait for the public launch!"}
            </p>
            <p className="tw-text-xl md:tw-text-2xl tw-text-white/70 tw-max-w-3xl tw-mx-auto">
              Secure your spot now and get exclusive access to VentureOS platform with incredible benefits.
            </p>
          </div>

          {/* Benefits Grid - Larger for full screen */}
          <div className="tw-max-w-5xl tw-mx-auto">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 md:tw-gap-8">
              {defaultBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-shadow-lg tw-border tw-border-white/20 tw-px-6 tw-py-8 tw-flex tw-items-center tw-space-x-4 tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl"
                >
                  <div className="tw-flex-shrink-0 tw-p-3 tw-bg-white/10 tw-rounded-xl tw-shadow-md"> 
                    {React.cloneElement(benefit.icon, {
                      className: `${benefit.icon.props.className || ''} tw-w-8 tw-h-8 tw-text-white`,
                      color: '#fff',
                      style: { color: '#fff' }
                    })}
                  </div>
                  <div>
                    <span className="tw-text-white tw-text-lg md:tw-text-xl tw-font-semibold tw-leading-relaxed">{benefit.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Larger and more prominent */}
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-center tw-gap-6 tw-mt-8">
            <a
              href="https://www.ventureos.com/first100founders"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-group tw-px-12 tw-py-6 tw-text-white tw-font-bold tw-text-xl md:tw-text-2xl tw-rounded-2xl tw-transition-all tw-duration-300 tw-shadow-2xl tw-transform hover:tw-scale-110 tw-flex tw-items-center tw-space-x-3 tw-w-full sm:tw-w-auto tw-justify-center"
              style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(37, 99, 235), rgb(79, 70, 229))',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              <span>{content?.ctaText || 'Reserve My Founder Spot'}</span>
              <ArrowRight className="tw-w-6 tw-h-6 group-hover:tw-translate-x-2 tw-transition-transform" />
            </a>
            <button
              onClick={handleClose}
              className="tw-px-10 tw-py-6 tw-bg-white/10 tw-backdrop-blur-md tw-text-white tw-font-semibold tw-text-lg tw-rounded-2xl hover:tw-bg-white/20 tw-border tw-border-white/30 tw-transition-all tw-w-full sm:tw-w-auto"
            >
              {content?.dismissText || 'Maybe Later'}
            </button>
          </div>

          {/* Footer Note */}
          <p className="tw-text-center tw-text-white/60 tw-text-lg md:tw-text-xl tw-mt-8">
            {content?.footerText || '🔥 Only 100 slots available • Act fast before they\'re gone!'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Export default for easier imports
export default First100FoundersModal;