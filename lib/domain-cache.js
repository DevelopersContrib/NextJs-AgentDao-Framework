// Comprehensive domain cache system for thousands of domains
const DOMAIN_CACHE_KEY = 'agentdao_domain_cache';
const LOGO_CACHE_KEY = 'agentdao_logo_cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_SIZE = 10000; // Store up to 10,000 domains

// Default theme for fallback
const DEFAULT_THEME = {
  logo: "https://cdn.vnoc.com/images/logo/logo-AgentDao-onblack.svg",
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  background: "https://cdn.vnoc.com/images/agent-bg.png",
  title: "AgentDAO Framework",
  description: "Multi-domain agent platform"
};

// Get cached domain data
export function getCachedDomainData(domain) {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME; // Server-side fallback
  }

  try {
    const cached = localStorage.getItem(`${DOMAIN_CACHE_KEY}_${domain}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading domain cache:', error);
  }

  return null;
}

// Set cached domain data
export function setCachedDomainData(domain, data) {
  if (typeof window === 'undefined') {
    return; // Server-side, no caching
  }

  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`${DOMAIN_CACHE_KEY}_${domain}`, JSON.stringify(cacheData));
    
    // Clean up old cache entries if we exceed max size
    cleanupCache();
  } catch (error) {
    console.error('Error setting domain cache:', error);
  }
}

// Get cached logo URL
export function getCachedLogo(domain) {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME.logo;
  }

  try {
    const cached = localStorage.getItem(`${LOGO_CACHE_KEY}_${domain}`);
    if (cached) {
      const { logo, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        // Return logo only if it's not the default logo
        return logo && logo !== DEFAULT_THEME.logo ? logo : null;
      }
    }
  } catch (error) {
    console.error('Error reading logo cache:', error);
  }

  return null;
}

// Set cached logo URL
export function setCachedLogo(domain, logo) {
  if (typeof window === 'undefined') {
    return;
  }

  // Only cache valid logos (not default or empty)
  if (!logo || logo === DEFAULT_THEME.logo || logo === '') {
    return;
  }

  try {
    const cacheData = {
      logo,
      timestamp: Date.now()
    };
    localStorage.setItem(`${LOGO_CACHE_KEY}_${domain}`, JSON.stringify(cacheData));
    console.log('Cached logo for domain:', domain, ':', logo);
  } catch (error) {
    console.error('Error setting logo cache:', error);
  }
}

// Fetch domain data with aggressive caching
export async function fetchDomainDataWithCache(domain) {
  // Check cache first
  const cached = getCachedDomainData(domain);
  if (cached) {
    return cached;
  }

  try {
    // Fetch from API
    const response = await fetch(`/api/domain-data?domain=${domain}`);
    if (response.ok) {
      const data = await response.json();
      
      // Only cache valid logos (not default)
      const validLogo = data.logo && data.logo !== DEFAULT_THEME.logo ? data.logo : null;
      
      // Update data with valid logo or null
      const processedData = {
        ...data,
        logo: validLogo
      };
      
      // Cache the result
      setCachedDomainData(domain, processedData);
      if (validLogo) {
        setCachedLogo(domain, validLogo);
      }
      
      return processedData;
    }
  } catch (error) {
    console.error('Error fetching domain data:', error);
  }

  // Return default theme on error (with null logo to show text)
  const fallbackTheme = {
    ...DEFAULT_THEME,
    logo: null // No logo, will show capitalized text
  };
  setCachedDomainData(domain, fallbackTheme);
  return fallbackTheme;
}

// Batch fetch multiple domains
export async function fetchBatchDomainData(domains) {
  const results = {};
  const uncachedDomains = [];

  // Check cache for all domains first
  for (const domain of domains) {
    const cached = getCachedDomainData(domain);
    if (cached) {
      results[domain] = cached;
    } else {
      uncachedDomains.push(domain);
    }
  }

  // Fetch uncached domains in batches
  if (uncachedDomains.length > 0) {
    const batchSize = 10; // Process 10 domains at a time
    for (let i = 0; i < uncachedDomains.length; i += batchSize) {
      const batch = uncachedDomains.slice(i, i + batchSize);
      const promises = batch.map(domain => fetchDomainDataWithCache(domain));
      
      try {
        const batchResults = await Promise.all(promises);
        batch.forEach((domain, index) => {
          results[domain] = batchResults[index];
        });
      } catch (error) {
        console.error('Error in batch fetch:', error);
        batch.forEach(domain => {
          results[domain] = {
            ...DEFAULT_THEME,
            logo: null // No logo, will show capitalized text
          };
        });
      }
    }
  }

  return results;
}

// Clean up old cache entries
function cleanupCache() {
  try {
    const keys = Object.keys(localStorage);
    const domainKeys = keys.filter(key => key.startsWith(DOMAIN_CACHE_KEY));
    
    if (domainKeys.length > MAX_CACHE_SIZE) {
      // Sort by timestamp and remove oldest entries
      const entries = domainKeys.map(key => {
        const data = localStorage.getItem(key);
        const { timestamp } = JSON.parse(data);
        return { key, timestamp };
      }).sort((a, b) => a.timestamp - b.timestamp);
      
      // Remove oldest entries
      const toRemove = entries.slice(0, domainKeys.length - MAX_CACHE_SIZE);
      toRemove.forEach(({ key }) => {
        localStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.error('Error cleaning up cache:', error);
  }
}

// Get cache statistics
export function getCacheStats() {
  if (typeof window === 'undefined') {
    return { domainCount: 0, logoCount: 0 };
  }

  try {
    const keys = Object.keys(localStorage);
    const domainCount = keys.filter(key => key.startsWith(DOMAIN_CACHE_KEY)).length;
    const logoCount = keys.filter(key => key.startsWith(LOGO_CACHE_KEY)).length;
    
    return { domainCount, logoCount };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { domainCount: 0, logoCount: 0 };
  }
}

// Clear all cache
export function clearAllCache() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(DOMAIN_CACHE_KEY) || key.startsWith(LOGO_CACHE_KEY)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

