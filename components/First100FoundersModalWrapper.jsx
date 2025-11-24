'use client';

import { First100FoundersModal } from '@/components/First100FoundersModal';

export default function First100FoundersModalWrapper() {
  // This component will only render on client side due to dynamic import with ssr: false
  // No need for mounted check since it won't render on server at all

  const handleNavigate = (url) => {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };

  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '';
    }
    return '';
  };

  return (
    <First100FoundersModal 
      targetUrl="/first100founders"
      onNavigate={handleNavigate}
      getCurrentPath={getCurrentPath}
      excludedPaths={['/first100founders', '/admin', '/api']}
    />
  );
}