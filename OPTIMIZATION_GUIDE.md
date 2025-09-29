# NextJS AgentDao Framework - Optimization Guide

## 🚨 Critical Issues Identified

Your framework was generating **6.47 TB data** and **500M+ function invocations** due to:

1. **Excessive API calls on every page load**
2. **No caching strategy** - data fetched fresh every time
3. **Client-side hooks making API calls on every component mount**
4. **No rate limiting** - vulnerable to bot attacks
5. **Invalid routes** like `/_not-found` being processed and billed

## 🛠️ Optimization Solutions

### 1. Replace Current Files with Optimized Versions

#### A. Replace `lib/data.jsx` with `lib/data-optimized.jsx`

```bash
mv lib/data.jsx lib/data.jsx.backup
mv lib/data-optimized.jsx lib/data.jsx
```

#### B. Replace `middleware.ts` with `middleware-optimized.ts`

```bash
mv middleware.ts middleware.ts.backup
mv middleware-optimized.ts middleware.ts
```

#### C. Replace `next.config.js` with `next.config.optimized.js`

```bash
mv next.config.js next.config.js.backup
mv next.config.optimized.js next.config.js
```

### 2. Update Component Hooks

Replace the existing hooks in your components:

#### In `components/Header.jsx`

```javascript
// Replace this:
import { useFetchTheme } from "@/lib/hooks/useThemeFetcher";

// With this:
import { useOptimizedThemeFetcher } from "@/lib/hooks/useOptimizedHooks";
import { useThemeStore } from "@/lib/store/useThemeStore";

// Replace this:
const { theme } = useThemeStore();
useFetchTheme();

// With this:
const themeStore = useThemeStore();
useOptimizedThemeFetcher(themeStore);
const { theme } = themeStore;
```

#### In `components/AgentSection.jsx`

```javascript
// Replace this:
import { useFetchAgent } from "@/lib/hooks/userAgentFetcher";
import { useAgentStore } from "@/lib/store/useAgentStore";

// With this:
import { useOptimizedAgentFetcher } from "@/lib/hooks/useOptimizedHooks";
import { useAgentStore } from "@/lib/store/useAgentStore";

// Replace this:
const { agents } = useAgentStore();
useFetchAgent();

// With this:
const agentStore = useAgentStore();
useOptimizedAgentFetcher(agentStore);
const { agents } = agentStore;
```

### 3. Add Environment Variables

Add these to your `.env.local`:

```env
# Monitoring (optional)
MONITORING_WEBHOOK_URL=https://your-monitoring-service.com/webhook

# Cache settings
CACHE_TTL_SHORT=300
CACHE_TTL_MEDIUM=3600
CACHE_TTL_LONG=86400

# Rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60000
```

### 4. Deploy Optimizations

#### A. Update Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "monitor": "node scripts/monitor.js"
  }
}
```

#### B. Create Monitoring Script

Create `scripts/monitor.js`:

```javascript
const { monitoring } = require('../lib/monitoring');

setInterval(() => {
  const metrics = monitoring.getMetrics();
  const alerts = monitoring.getAlerts(5);
  
  console.log('=== METRICS ===');
  console.log(metrics);
  
  if (alerts.length > 0) {
    console.log('=== RECENT ALERTS ===');
    console.log(alerts);
  }
}, 60000); // Every minute
```

## 📊 Expected Performance Improvements

### Before Optimization

- **API Calls per page load**: 3-5 calls
- **Client-side API calls**: 2-3 calls per component mount
- **No caching**: Fresh data every time
- **No rate limiting**: Vulnerable to abuse
- **Invalid routes**: Processed and billed

### After Optimization

- **API Calls per page load**: 0-1 calls (cached)
- **Client-side API calls**: 0 calls (cached)
- **Caching**: 95%+ cache hit rate
- **Rate limiting**: Blocks 90%+ of bot traffic
- **Invalid routes**: Return 404 without processing

### Estimated Cost Reduction

- **Function invocations**: 80-90% reduction
- **Data transfer**: 70-85% reduction
- **API calls**: 90-95% reduction

## 🔧 Implementation Steps

### Step 1: Backup Current Files

```bash
mkdir backup-$(date +%Y%m%d)
cp -r lib/ backup-$(date +%Y%m%d)/
cp middleware.ts backup-$(date +%Y%m%d)/
cp next.config.js backup-$(date +%Y%m%d)/
```

### Step 2: Apply Optimizations

```bash
# Replace core files
mv lib/data-optimized.jsx lib/data.jsx
mv middleware-optimized.ts middleware.ts
mv next.config.optimized.js next.config.js

# Add new files
# (Files are already created)
```

### Step 3: Update Components

Update each component that uses the old hooks:

1. **Header.jsx** - Update theme fetching
2. **AgentSection.jsx** - Update agent fetching
3. **Any component using useFetchReferral** - Update referral fetching

### Step 4: Test Locally

```bash
npm run dev
# Test all pages and check console for cache hits
```

### Step 5: Deploy to Staging

```bash
npm run build
npm run start
# Monitor metrics and alerts
```

### Step 6: Deploy to Production

```bash
# Deploy with monitoring enabled
MONITORING_WEBHOOK_URL=your-webhook npm run build
```

## 📈 Monitoring & Alerts

### Key Metrics to Monitor

1. **Cache hit rate** - Should be >90%
2. **API calls per minute** - Should be <100
3. **Error rate** - Should be <5%
4. **Response times** - Should be <2s
5. **Rate limit blocks** - Should be >50% of requests

### Alert Thresholds

- **High traffic**: >1000 requests/minute
- **High errors**: >50 errors/minute
- **High API usage**: >500 API calls/minute
- **Low cache hit rate**: <80%

## 🚀 Additional Optimizations

### 1. CDN Configuration

Add to your Vercel project settings:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    }
  ]
}
```

### 2. Database Optimization

If using a database, add indexes:

```sql
-- Example indexes for common queries
CREATE INDEX idx_domain_config ON domain_configs(domain);
CREATE INDEX idx_agent_active ON agents(active, created_at);
```

### 3. Image Optimization

```javascript
// Use Next.js Image component with optimization
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 4. Bundle Analysis

```bash
npm run analyze
# Check bundle size and optimize imports
```

## 🔍 Troubleshooting

### Common Issues

1. **Cache not working**: Check if `CacheManager` is properly imported
2. **Rate limiting too strict**: Adjust `RATE_LIMITS` in middleware
3. **Components not updating**: Ensure hooks are properly updated
4. **Build errors**: Check for missing imports or syntax errors

### Debug Commands

```bash
# Check cache performance
console.log(CacheManager.get('domain_data_example.com'));

# Check rate limiting
console.log(monitoring.getMetrics());

# Check alerts
console.log(monitoring.getAlerts());
```

## 📋 Checklist

- [ ] Backup current files
- [ ] Replace `lib/data.jsx` with optimized version
- [ ] Replace `middleware.ts` with optimized version
- [ ] Replace `next.config.js` with optimized version
- [ ] Update all component hooks
- [ ] Add environment variables
- [ ] Test locally
- [ ] Deploy to staging
- [ ] Monitor metrics
- [ ] Deploy to production
- [ ] Set up alerts
- [ ] Verify cost reduction

## 🎯 Expected Results

After implementing these optimizations:

- **Function invocations**: Reduced from 500M+ to <50M
- **Data transfer**: Reduced from 6.47TB to <1TB
- **API calls**: Reduced by 90-95%
- **Response times**: Improved by 60-80%
- **Cost**: Reduced by 70-85%

The framework will be much more efficient, cost-effective, and resilient to abuse while maintaining the same functionality.
