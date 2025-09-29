import axios from "axios";
import { headers } from "next/headers";
import { CacheManager, CACHE_KEYS, CACHE_DURATION } from "./cache";

import { ApiRoutes } from "./models/routes";
import { getEnvVar, ENV_VAR } from "./getEnvVar";

const apiKey = getEnvVar(ENV_VAR.API_KEY);
const baseURL = getEnvVar(ENV_VAR.API_URL);

export function getDomain() {
  let DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;
  const headersList = headers();
  const referrer = headersList.get("host");
  const domainName = referrer.includes("localhost") ? DOMAIN : referrer;
  return domainName.replace("www.", "");
}

// Optimized getData with caching
export async function getData() {
  const domain = getDomain();
  const cacheKey = CACHE_KEYS.DOMAIN_DATA(domain);
  
  // Check cache first
  const cachedData = CacheManager.get(cacheKey);
  if (cachedData) {
    console.log("Using cached domain data for:", domain);
    return cachedData;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_CONTRIB_API1 environment variable is not set");
      return { data: {} };
    }
    const url = apiUrl + `&domain=${domain}`;
    console.log("Fetching fresh domain data from:", url);

    const res = await fetch(url, { 
      next: { 
        revalidate: CACHE_DURATION.MEDIUM, // 1 hour revalidation
        tags: [`domain-${domain}`] // Tag for cache invalidation
      } 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", res.status, errorText);
      return { data: {} };
    }

    const data = await res.json();
    
    // Cache the result
    CacheManager.set(cacheKey, data, CACHE_DURATION.MEDIUM);
    
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { data: {} };
  }
}

// Optimized getScript with caching
export async function getScript(url) {
  const domain = getDomain();
  const cacheKey = CACHE_KEYS.SCRIPT_DATA(domain);
  
  // Check cache first
  const cachedData = CacheManager.get(cacheKey);
  if (cachedData) {
    console.log("Using cached script data for:", domain);
    return cachedData;
  }

  try {
    const res = await axios.get(url, {
      timeout: 5000, // 5 second timeout
      headers: {
        'Cache-Control': 'max-age=3600', // 1 hour cache
      }
    });
    
    const data = res.data;
    
    // Cache the result
    CacheManager.set(cacheKey, data, CACHE_DURATION.MEDIUM);
    
    return data;
  } catch (e) {
    console.log("error getScript", e);
    return { error: "error getScript" };
  }
}

// Optimized getLayoutMetadata with caching
export const getLayoutMetadata = async () => {
  const host = headers().get("host");
  const domain = host?.replace("www.", "") || "default";
  const cacheKey = CACHE_KEYS.THEME_DATA(domain);
  
  // Check cache first
  const cachedData = CacheManager.get(cacheKey);
  if (cachedData) {
    console.log("Using cached theme data for:", domain);
    return cachedData;
  }

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const originUrl = `${protocol}://${host}`;
  
  try {
    const getDomain = await axios.get(`${originUrl}/api/domain`);
    const { domain: apiDomain } = getDomain.data;
    const url = `${baseURL}${ApiRoutes.v2DomainConfig}?key=${apiKey}&domain=${apiDomain}`;
    const response = await axios.get(url);
    const { data } = response.data;
    
    const result = {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      author: data.domainName,
    };
    
    // Cache the result
    CacheManager.set(cacheKey, result, CACHE_DURATION.LONG);
    
    return result;
  } catch (error) {
    console.error("Error fetching getLayoutMetadata", error);
    throw error;
  }
};

// Batch data fetching for multiple domains
export async function getBatchData(domains) {
  const results = {};
  
  for (const domain of domains) {
    const cacheKey = CACHE_KEYS.DOMAIN_DATA(domain);
    const cachedData = CacheManager.get(cacheKey);
    
    if (cachedData) {
      results[domain] = cachedData;
    } else {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_CONTRIB_API1;
        if (!apiUrl) {
          console.error("NEXT_PUBLIC_CONTRIB_API1 environment variable is not set");
          results[domain] = { data: {} };
          continue;
        }
        const url = apiUrl + `&domain=${domain}`;
        const res = await fetch(url, { 
          next: { 
            revalidate: CACHE_DURATION.MEDIUM,
            tags: [`domain-${domain}`]
          } 
        });
        
        if (res.ok) {
          const data = await res.json();
          results[domain] = data;
          CacheManager.set(cacheKey, data, CACHE_DURATION.MEDIUM);
        } else {
          results[domain] = { data: {} };
        }
      } catch (error) {
        console.error(`Error fetching data for domain ${domain}:`, error);
        results[domain] = { data: {} };
      }
    }
  }
  
  return results;
}
