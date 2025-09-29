// FOMO Utilities for adding real purchases and testing
import { fomoCache } from './fomo-cache';

// Add a real purchase to the FOMO cache
export const addRealPurchase = (amount, timestamp = Date.now()) => {
  fomoCache.addPurchase(amount, timestamp);
  console.log(`FOMO: Real purchase added - ${amount} ADAO tokens`);
};

// Add multiple purchases for testing
export const addTestPurchases = (count = 5) => {
  const amounts = ['100', '500', '1,000', '2,500', '5,000', '10,000', '25,000', '50,000'];
  
  for (let i = 0; i < count; i++) {
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const randomTime = Date.now() - (Math.random() * 24 * 60 * 60 * 1000); // Random time in last 24 hours
    addRealPurchase(randomAmount, randomTime);
  }
  
  console.log(`FOMO: Added ${count} test purchases`);
};

// Trigger a manual FOMO notification for testing
export const triggerTestNotification = () => {
  const notification = {
    id: `test_${Date.now()}`,
    name: fomoCache.getRandomName(),
    amount: fomoCache.getRandomAmount(),
    isFake: true
  };
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('fomo-notification', {
      detail: notification
    }));
  }
  
  console.log('FOMO: Test notification triggered', notification);
};

// Get FOMO stats
export const getFOMOStats = () => {
  return fomoCache.getStats();
};

// Clear all FOMO data
export const clearFOMOData = () => {
  fomoCache.clear();
  console.log('FOMO: All data cleared');
};

// Simulate a purchase from the buy page
export const simulatePurchase = (amount) => {
  addRealPurchase(amount);
  
  // Also trigger immediate notification for the current purchase
  setTimeout(() => {
    triggerTestNotification();
  }, 1000);
};

// Browser console helpers (for testing)
if (typeof window !== 'undefined') {
  window.fomo = {
    addPurchase: addRealPurchase,
    addTestPurchases,
    triggerTest: triggerTestNotification,
    getStats: getFOMOStats,
    clear: clearFOMOData,
    simulatePurchase
  };
  
  console.log('FOMO: Console helpers available at window.fomo');
  console.log('Available commands:');
  console.log('- window.fomo.addPurchase("1,000")');
  console.log('- window.fomo.addTestPurchases(10)');
  console.log('- window.fomo.triggerTest()');
  console.log('- window.fomo.getStats()');
  console.log('- window.fomo.simulatePurchase("5,000")');
}
