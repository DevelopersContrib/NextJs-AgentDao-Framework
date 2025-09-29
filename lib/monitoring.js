// Monitoring and alerting utilities
class MonitoringService {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
    };
    
    this.alerts = [];
    this.thresholds = {
      maxRequestsPerMinute: 1000,
      maxErrorsPerMinute: 50,
      maxApiCallsPerMinute: 500,
    };
  }

  // Track request metrics
  trackRequest(endpoint, statusCode, responseTime) {
    this.metrics.requests++;
    
    if (statusCode >= 400) {
      this.metrics.errors++;
    }
    
    // Check for anomalies
    this.checkAnomalies();
    
    // Log high response times
    if (responseTime > 5000) { // 5 seconds
      console.warn(`Slow request detected: ${endpoint} took ${responseTime}ms`);
    }
  }

  // Track API calls
  trackApiCall(endpoint, success = true) {
    this.metrics.apiCalls++;
    
    if (!success) {
      this.metrics.errors++;
    }
  }

  // Track cache performance
  trackCacheHit() {
    this.metrics.cacheHits++;
  }

  trackCacheMiss() {
    this.metrics.cacheMisses++;
  }

  // Check for anomalies and trigger alerts
  checkAnomalies() {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Filter recent metrics (in a real implementation, you'd use a time-series database)
    const recentRequests = this.metrics.requests; // Simplified for demo
    
    if (recentRequests > this.thresholds.maxRequestsPerMinute) {
      this.triggerAlert('HIGH_TRAFFIC', {
        message: `High traffic detected: ${recentRequests} requests in the last minute`,
        severity: 'warning',
        timestamp: now,
      });
    }
    
    if (this.metrics.errors > this.thresholds.maxErrorsPerMinute) {
      this.triggerAlert('HIGH_ERROR_RATE', {
        message: `High error rate detected: ${this.metrics.errors} errors in the last minute`,
        severity: 'critical',
        timestamp: now,
      });
    }
    
    if (this.metrics.apiCalls > this.thresholds.maxApiCallsPerMinute) {
      this.triggerAlert('HIGH_API_USAGE', {
        message: `High API usage detected: ${this.metrics.apiCalls} API calls in the last minute`,
        severity: 'warning',
        timestamp: now,
      });
    }
  }

  // Trigger alert
  triggerAlert(type, data) {
    const alert = {
      id: `${type}_${Date.now()}`,
      type,
      ...data,
    };
    
    this.alerts.push(alert);
    
    // In production, send to monitoring service (DataDog, New Relic, etc.)
    console.error(`ALERT: ${alert.message}`);
    
    // Send to external monitoring service
    this.sendToMonitoringService(alert);
  }

  // Send alert to external monitoring service
  async sendToMonitoringService(alert) {
    try {
      // Example: Send to webhook or monitoring service
      if (process.env.MONITORING_WEBHOOK_URL) {
        await fetch(process.env.MONITORING_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alert),
        });
      }
    } catch (error) {
      console.error('Failed to send alert to monitoring service:', error);
    }
  }

  // Get current metrics
  getMetrics() {
    return {
      ...this.metrics,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0,
      errorRate: this.metrics.errors / this.metrics.requests || 0,
    };
  }

  // Get recent alerts
  getAlerts(limit = 10) {
    return this.alerts.slice(-limit);
  }

  // Reset metrics (call periodically)
  resetMetrics() {
    this.metrics = {
      requests: 0,
      errors: 0,
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
    };
  }
}

// Singleton instance
export const monitoring = new MonitoringService();

// Middleware for request tracking
export function trackRequest(req, res, next) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    monitoring.trackRequest(req.path, res.statusCode, responseTime);
  });
  
  if (next) next();
}

// Utility for tracking API calls
export function trackApiCall(endpoint, success = true) {
  monitoring.trackApiCall(endpoint, success);
}

// Utility for tracking cache performance
export function trackCacheHit() {
  monitoring.trackCacheHit();
}

export function trackCacheMiss() {
  monitoring.trackCacheMiss();
}

// Reset metrics every hour
setInterval(() => {
  monitoring.resetMetrics();
}, 3600000);
