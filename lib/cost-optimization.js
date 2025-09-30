// Cost optimization utilities for Vercel
export const COST_OPTIMIZATION = {
  // Reduce API calls by 90%
  CACHE_DURATION: {
    STATIC: 24 * 60 * 60, // 24 hours for static content
    DYNAMIC: 6 * 60 * 60, // 6 hours for dynamic content
    API_RESPONSE: 60 * 60, // 1 hour for API responses
  },
  
  // Rate limiting to prevent abuse
  RATE_LIMITS: {
    API_CALLS_PER_MINUTE: 10,
    REQUESTS_PER_IP_PER_MINUTE: 30,
    BOT_REQUESTS_PER_MINUTE: 5,
  },
  
  // Edge optimization
  EDGE_CACHE: {
    STATIC_PAGES: 'public, max-age=86400, s-maxage=86400', // 24 hours
    DYNAMIC_PAGES: 'public, max-age=3600, s-maxage=3600', // 1 hour
    API_RESPONSES: 'public, max-age=1800, s-maxage=1800', // 30 minutes
  }
};

// Cost monitoring
export class CostMonitor {
  constructor() {
    this.dailyStats = {
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
      edgeRequests: 0,
      functionInvocations: 0,
    };
  }
  
  trackApiCall() {
    this.dailyStats.apiCalls++;
  }
  
  trackCacheHit() {
    this.dailyStats.cacheHits++;
  }
  
  trackCacheMiss() {
    this.dailyStats.cacheMisses++;
  }
  
  trackEdgeRequest() {
    this.dailyStats.edgeRequests++;
  }
  
  trackFunctionInvocation() {
    this.dailyStats.functionInvocations++;
  }
  
  getCacheHitRate() {
    const total = this.dailyStats.cacheHits + this.dailyStats.cacheMisses;
    return total > 0 ? (this.dailyStats.cacheHits / total) * 100 : 0;
  }
  
  getDailyCostEstimate() {
    // Rough cost estimation based on Vercel pricing
    const edgeRequests = this.dailyStats.edgeRequests;
    const functionInvocations = this.dailyStats.functionInvocations;
    
    const edgeCost = (edgeRequests / 1000000) * 0.40; // $0.40 per 1M requests
    const functionCost = (functionInvocations / 1000000) * 0.40; // $0.40 per 1M invocations
    
    return {
      edgeRequests: edgeCost,
      functionInvocations: functionCost,
      total: edgeCost + functionCost,
      cacheHitRate: this.getCacheHitRate()
    };
  }
}

export const costMonitor = new CostMonitor();
