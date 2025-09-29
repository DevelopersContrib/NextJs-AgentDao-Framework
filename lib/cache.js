// Cache management utilities
export const CACHE_DURATION = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
  VERY_LONG: 604800, // 7 days
};

// In-memory cache for server-side data
const serverCache = new Map();

export class CacheManager {
  static set(key, value, ttl = CACHE_DURATION.MEDIUM) {
    const expiresAt = Date.now() + (ttl * 1000);
    serverCache.set(key, { value, expiresAt });
  }

  static get(key) {
    const item = serverCache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      serverCache.delete(key);
      return null;
    }
    
    return item.value;
  }

  static clear() {
    serverCache.clear();
  }

  static clearExpired() {
    const now = Date.now();
    for (const [key, item] of serverCache.entries()) {
      if (now > item.expiresAt) {
        serverCache.delete(key);
      }
    }
  }
}

// Cache keys
export const CACHE_KEYS = {
  DOMAIN_DATA: (domain) => `domain_data_${domain}`,
  THEME_DATA: (domain) => `theme_data_${domain}`,
  AGENT_DATA: 'agent_data',
  REFERRAL_DATA: (domain) => `referral_data_${domain}`,
  SCRIPT_DATA: (domain) => `script_data_${domain}`,
};

// Clean up expired cache entries every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    CacheManager.clearExpired();
  }, 3600000); // 1 hour
}
