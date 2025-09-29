// FOMO Cache System for ADAO Token Purchases
import { CacheManager, CACHE_DURATION } from './cache';

const FOMO_CACHE_KEY = 'adao_purchases_fomo';
const FOMO_DISPLAY_DURATION = 30 * 1000; // 30 seconds
const FOMO_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Random names for FOMO notifications
const RANDOM_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn',
  'Blake', 'Cameron', 'Drew', 'Emery', 'Finley', 'Hayden', 'Jamie', 'Kendall',
  'Logan', 'Parker', 'Reese', 'Sage', 'Skyler', 'Sydney', 'Tatum', 'River',
  'Phoenix', 'Rowan', 'Sage', 'Shiloh', 'Sloane', 'Tatum', 'Vaughn', 'Wren',
  'Zion', 'Ari', 'Kai', 'Nova', 'Orion', 'Luna', 'Atlas', 'Juno', 'Nyx',
  'Cosmo', 'Stella', 'Aurora', 'Celeste', 'Phoenix', 'Vega', 'Sirius', 'Orion'
];

// Random purchase amounts (in ADAO tokens)
const PURCHASE_AMOUNTS = [
  '50', '100', '250', '500', '750', '1,000', '1,500', '2,000', '2,500',
  '3,000', '5,000', '7,500', '10,000', '15,000', '20,000', '25,000',
  '50,000', '75,000', '100,000', '150,000', '200,000', '500,000', '1,000,000'
];

export class FOMOCache {
  constructor() {
    this.purchases = [];
    this.lastDisplayTime = 0;
    this.currentNotification = null;
    this.isDisplaying = false;
    this.intervalId = null;
  }

  // Add a new purchase to the cache
  addPurchase(amount, timestamp = Date.now()) {
    const purchase = {
      id: `purchase_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount,
      timestamp: timestamp,
      name: this.getRandomName(),
      displayed: false
    };

    this.purchases.push(purchase);
    
    // Keep only last 24 hours of purchases
    const oneDayAgo = timestamp - (24 * 60 * 60 * 1000);
    this.purchases = this.purchases.filter(p => p.timestamp > oneDayAgo);
    
    // Save to cache
    this.saveToCache();
    
    console.log('FOMO: New purchase added:', purchase);
  }

  // Get random name
  getRandomName() {
    return RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
  }

  // Get random purchase amount
  getRandomAmount() {
    return PURCHASE_AMOUNTS[Math.floor(Math.random() * PURCHASE_AMOUNTS.length)];
  }

  // Get next notification to display
  getNextNotification() {
    const now = Date.now();
    
    // Check if we should display a notification
    if (now - this.lastDisplayTime < FOMO_INTERVAL) {
      return null;
    }

    // Get undisplayed purchases
    const undisplayedPurchases = this.purchases.filter(p => !p.displayed);
    
    if (undisplayedPurchases.length === 0) {
      // If no real purchases, create a fake one
      const fakeAmount = this.getRandomAmount();
      const fakeName = this.getRandomName();
      return {
        id: `fake_${now}`,
        name: fakeName,
        amount: fakeAmount,
        isFake: true
      };
    }

    // Get random undisplayed purchase
    const randomPurchase = undisplayedPurchases[Math.floor(Math.random() * undisplayedPurchases.length)];
    randomPurchase.displayed = true;
    
    this.lastDisplayTime = now;
    this.saveToCache();
    
    return {
      id: randomPurchase.id,
      name: randomPurchase.name,
      amount: randomPurchase.amount,
      isFake: false
    };
  }

  // Start the FOMO notification system
  start() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.loadFromCache();
    
    this.intervalId = setInterval(() => {
      const notification = this.getNextNotification();
      if (notification) {
        this.showNotification(notification);
      }
    }, FOMO_INTERVAL);

    console.log('FOMO: Notification system started');
  }

  // Stop the FOMO notification system
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('FOMO: Notification system stopped');
  }

  // Show notification (to be implemented by component)
  showNotification(notification) {
    // This will be handled by the FOMO component
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fomo-notification', {
        detail: notification
      }));
    }
  }

  // Save to cache
  saveToCache() {
    const data = {
      purchases: this.purchases,
      lastDisplayTime: this.lastDisplayTime
    };
    CacheManager.set(FOMO_CACHE_KEY, data, CACHE_DURATION.LONG);
  }

  // Load from cache
  loadFromCache() {
    const data = CacheManager.get(FOMO_CACHE_KEY);
    if (data) {
      this.purchases = data.purchases || [];
      this.lastDisplayTime = data.lastDisplayTime || 0;
    }
  }

  // Get stats
  getStats() {
    return {
      totalPurchases: this.purchases.length,
      undisplayedPurchases: this.purchases.filter(p => !p.displayed).length,
      lastDisplayTime: this.lastDisplayTime,
      isRunning: !!this.intervalId
    };
  }

  // Clear all data
  clear() {
    this.purchases = [];
    this.lastDisplayTime = 0;
    this.currentNotification = null;
    this.isDisplaying = false;
    CacheManager.clear();
    console.log('FOMO: All data cleared');
  }
}

// Global instance
export const fomoCache = new FOMOCache();

// Auto-start in browser
if (typeof window !== 'undefined') {
  fomoCache.start();
}
