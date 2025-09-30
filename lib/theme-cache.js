// Theme caching utility to reduce API calls
const THEME_CACHE_KEY = 'agentdao_theme_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Default theme fallback
const DEFAULT_THEME = {
  logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  background: "https://cdn.vnoc.com/images/agent-bg.png"
};

// Get cached theme data
export function getCachedTheme(domain) {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME; // Server-side fallback
  }

  try {
    const cached = localStorage.getItem(`${THEME_CACHE_KEY}_${domain}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading theme cache:', error);
  }

  return DEFAULT_THEME;
}

// Set cached theme data
export function setCachedTheme(domain, themeData) {
  if (typeof window === 'undefined') {
    return; // Server-side, no caching
  }

  try {
    const cacheData = {
      data: themeData,
      timestamp: Date.now()
    };
    localStorage.setItem(`${THEME_CACHE_KEY}_${domain}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error setting theme cache:', error);
  }
}

// Fetch theme with caching
export async function fetchThemeWithCache(domain) {
  // Check cache first
  const cached = getCachedTheme(domain);
  if (cached !== DEFAULT_THEME) {
    return cached;
  }

  try {
    // Fetch from API
    const response = await fetch(`/api/theme?domain=${domain}`);
    if (response.ok) {
      const themeData = await response.json();
      setCachedTheme(domain, themeData);
      return themeData;
    }
  } catch (error) {
    console.error('Error fetching theme:', error);
  }

  return DEFAULT_THEME;
}

// Clear theme cache
export function clearThemeCache(domain) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(`${THEME_CACHE_KEY}_${domain}`);
  } catch (error) {
    console.error('Error clearing theme cache:', error);
  }
}
