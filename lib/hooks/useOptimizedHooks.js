import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { ApiRoutes } from "../models/routes";

// Client-side safe environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const adaoApiKey = process.env.NEXT_PUBLIC_API_KEY_ADAO;
const adaoBaseURL = process.env.NEXT_PUBLIC_API_URL_ADAO;

// Client-side cache duration constants
const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 1800, // 30 minutes
  VERY_LONG: 3600 // 1 hour
};

// Client-side cache for hooks
const clientCache = new Map();

// Rate limiting for client-side requests
const requestLimiter = new Map();

const isRateLimited = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!requestLimiter.has(key)) {
    requestLimiter.set(key, []);
  }
  
  const requests = requestLimiter.get(key).filter(time => time > windowStart);
  requestLimiter.set(key, requests);
  
  if (requests.length >= maxRequests) {
    return true;
  }
  
  requests.push(now);
  return false;
};

// Optimized theme fetcher with caching and rate limiting
export const useOptimizedThemeFetcher = (useThemeStore) => {
  const { setTheme, setLoading, setError } = useThemeStore();
  const hasFetched = useRef(false);

  const fetchTheme = useCallback(async () => {
    if (hasFetched.current) return;
    
    const cacheKey = 'theme_data';
    const cachedData = clientCache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION.MEDIUM * 1000) {
      console.log("Using cached theme data");
      setTheme(cachedData.value);
      return;
    }

    if (isRateLimited('theme_fetch')) {
      console.log("Theme fetch rate limited");
      return;
    }

    setLoading(true);
    hasFetched.current = true;

    try {
      const response = await axios.get("/api/domain");
      const { domain } = response.data;
      
      const url = `${baseURL}${ApiRoutes.v2DomainConfig}?key=${apiKey}&domain=${domain}`;
      const themeResponse = await axios.get(url);
      const { data } = themeResponse.data;
      
      setTheme(data);
      
      // Cache the result
      clientCache.set(cacheKey, {
        value: data,
        timestamp: Date.now()
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch theme");
    } finally {
      setLoading(false);
    }
  }, [setTheme, setLoading, setError]);

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);
};

// Optimized agent fetcher with caching and rate limiting
export const useOptimizedAgentFetcher = (useAgentStore) => {
  const { setAgents, setLoading, setError } = useAgentStore();
  const hasFetched = useRef(false);

  const fetchAgents = useCallback(async () => {
    if (hasFetched.current) return;
    
    const cacheKey = 'agent_data';
    const cachedData = clientCache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION.LONG * 1000) {
      console.log("Using cached agent data");
      setAgents(cachedData.value);
      return;
    }

    if (isRateLimited('agent_fetch')) {
      console.log("Agent fetch rate limited");
      return;
    }

    setLoading(true);
    hasFetched.current = true;

    try {
      const url = `${ApiRoutes.agents}?api_key=${adaoApiKey}`;
      const response = await axios.get(`/api/adao-fetcher?url=${encodeURIComponent(url)}`);
      const { data } = response;
      
      setAgents(data);
      
      // Cache the result
      clientCache.set(cacheKey, {
        value: data,
        timestamp: Date.now()
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  }, [setAgents, setLoading, setError]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);
};

// Optimized referral fetcher with caching and rate limiting
export const useOptimizedReferralFetcher = (useReferralStore) => {
  const { setCampaignId, setLoading, setError } = useReferralStore();
  const hasFetched = useRef(false);

  const fetchReferral = useCallback(async () => {
    if (hasFetched.current) return;
    
    try {
      const response = await axios.get("/api/domain");
      const { domain } = response.data;
      
      const cacheKey = `referral_data_${domain}`;
      const cachedData = clientCache.get(cacheKey);
      
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION.LONG * 1000) {
        console.log("Using cached referral data");
        setCampaignId(cachedData.value);
        return;
      }

      if (isRateLimited('referral_fetch')) {
        console.log("Referral fetch rate limited");
        return;
      }

      setLoading(true);
      hasFetched.current = true;

      const url = `${ApiRoutes.Referrals}?api_key=${adaoApiKey}&tld=${domain}`;
      const response2 = await axios.get(`/api/adao-fetcher?url=${encodeURIComponent(url)}`);
      const { data } = response2;
      
      setCampaignId(data.campaign_id);
      
      // Cache the result
      clientCache.set(cacheKey, {
        value: data.campaign_id,
        timestamp: Date.now()
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch referral");
    } finally {
      setLoading(false);
    }
  }, [setCampaignId, setLoading, setError]);

  useEffect(() => {
    fetchReferral();
  }, [fetchReferral]);
};

// Clear client cache periodically (only on client side)
if (typeof window !== 'undefined') {
  // Use setTimeout instead of setInterval to avoid issues
  const clearCache = () => {
    const now = Date.now();
    for (const [key, data] of clientCache.entries()) {
      if (now - data.timestamp > CACHE_DURATION.VERY_LONG * 1000) {
        clientCache.delete(key);
      }
    }
    // Schedule next cleanup
    setTimeout(clearCache, 300000); // 5 minutes
  };
  
  // Start cleanup after initial load
  setTimeout(clearCache, 300000);
}
