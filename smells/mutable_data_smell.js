// Mutable Data Smell Example
// Shared mutable state that can be modified unexpectedly

// Shared mutable configuration object
let globalConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  features: {
    notifications: true,
    analytics: true,
    caching: false
  }
};

// Shared mutable user state
let currentUser = {
  id: 1,
  name: 'John Doe',
  permissions: ['read', 'write'],
  preferences: {
    theme: 'dark',
    language: 'en'
  }
};

// Shared mutable application state
let appState = {
  isLoading: false,
  errors: [],
  notifications: [],
  cache: new Map(),
  stats: {
    pageViews: 0,
    userActions: 0
  }
};

class ConfigService {
  // Modifies shared mutable config
  updateApiTimeout(newTimeout) {
    globalConfig.timeout = newTimeout;
    console.log('API timeout updated to:', newTimeout);
  }

  // Returns mutable reference that can be modified elsewhere
  getConfig() {
    return globalConfig; // Dangerous! Returns mutable reference
  }

  // Modifies nested properties
  enableFeature(featureName) {
    globalConfig.features[featureName] = true;
    console.log(`Feature ${featureName} enabled`);
  }

  // Another method that modifies the same config
  resetToDefaults() {
    globalConfig.timeout = 5000;
    globalConfig.retries = 3;
    globalConfig.features.notifications = true;
    globalConfig.features.analytics = true;
    globalConfig.features.caching = false;
  }
}

class UserService {
  // Modifies shared user state
  updateUserPermissions(newPermissions) {
    currentUser.permissions = newPermissions;
    console.log('User permissions updated:', newPermissions);
  }

  // Returns mutable user object
  getCurrentUser() {
    return currentUser; // Dangerous! Can be modified by caller
  }

  // Modifies user preferences
  updateTheme(theme) {
    currentUser.preferences.theme = theme;
    console.log('Theme updated to:', theme);
  }

  // Adds to mutable array
  addPermission(permission) {
    currentUser.permissions.push(permission);
    console.log('Permission added:', permission);
  }

  // Method that depends on mutable state
  hasPermission(permission) {
    return currentUser.permissions.includes(permission);
  }
}

class NotificationService {
  // Modifies shared notifications array
  addNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    appState.notifications.push(notification);
    console.log('Notification added:', message);
  }

  // Modifies shared array by removing items
  clearNotifications() {
    appState.notifications.length = 0; // Mutates the array
    console.log('All notifications cleared');
  }

  // Returns mutable notifications array
  getNotifications() {
    return appState.notifications; // Dangerous! Can be modified
  }

  // Modifies notification in place
  markAsRead(notificationId) {
    const notification = appState.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      notification.readAt = new Date();
    }
  }
}

class CacheService {
  // Modifies shared cache
  set(key, value) {
    appState.cache.set(key, value);
    console.log(`Cache set: ${key}`);
  }

  // Returns mutable cached objects
  get(key) {
    return appState.cache.get(key); // If object, it's mutable!
  }

  // Modifies cache by clearing
  clear() {
    appState.cache.clear();
    console.log('Cache cleared');
  }

  // Returns mutable cache reference
  getAll() {
    return appState.cache; // Dangerous! Direct access to mutable Map
  }
}

class StatsService {
  // Modifies shared stats
  incrementPageViews() {
    appState.stats.pageViews++;
    console.log('Page views:', appState.stats.pageViews);
  }

  // Modifies shared stats
  incrementUserActions() {
    appState.stats.userActions++;
    console.log('User actions:', appState.stats.userActions);
  }

  // Returns mutable stats object
  getStats() {
    return appState.stats; // Dangerous! Can be modified
  }

  // Resets stats by mutation
  resetStats() {
    appState.stats.pageViews = 0;
    appState.stats.userActions = 0;
    console.log('Stats reset');
  }
}

class ErrorHandler {
  // Modifies shared error array
  addError(error) {
    appState.errors.push({
      message: error.message,
      timestamp: new Date(),
      stack: error.stack
    });
    console.log('Error added:', error.message);
  }

  // Modifies shared state
  clearErrors() {
    appState.errors.splice(0); // Mutates the array
    console.log('Errors cleared');
  }

  // Returns mutable errors array
  getErrors() {
    return appState.errors; // Dangerous! Can be modified
  }

  // Removes specific error by mutation
  removeError(index) {
    if (index >= 0 && index < appState.errors.length) {
      appState.errors.splice(index, 1);
    }
  }
}

class LoadingService {
  // Modifies shared loading state
  setLoading(isLoading) {
    appState.isLoading = isLoading;
    console.log('Loading state:', isLoading);
  }

  // Reads mutable state
  isLoading() {
    return appState.isLoading;
  }

  // Complex operation that modifies state multiple times
  performAsyncOperation(operation) {
    this.setLoading(true);
    
    // Simulate async work
    setTimeout(() => {
      try {
        operation();
        this.setLoading(false);
      } catch (error) {
        this.setLoading(false);
        // Another service modifies the same state
        new ErrorHandler().addError(error);
      }
    }, 1000);
  }
}

class DataProcessor {
  // Method that unexpectedly modifies input data
  processUserData(userData) {
    // Mutates the input data!
    userData.processed = true;
    userData.processedAt = new Date();
    
    // Modifies nested objects
    if (userData.preferences) {
      userData.preferences.lastModified = new Date();
    }
    
    return userData;
  }

  // Method that modifies arrays passed to it
  sortUsers(users) {
    // Mutates the original array!
    users.sort((a, b) => a.name.localeCompare(b.name));
    return users;
  }

  // Method that modifies objects in an array
  activateUsers(users) {
    users.forEach(user => {
      user.isActive = true; // Mutates each user object
      user.activatedAt = new Date();
    });
    return users;
  }
}

class ConfigurationManager {
  // Method that returns mutable config sections
  getDatabaseConfig() {
    return globalConfig.database || {}; // Mutable reference
  }

  // Method that modifies config based on environment
  applyEnvironmentConfig(env) {
    if (env === 'production') {
      globalConfig.apiUrl = 'https://prod-api.example.com';
      globalConfig.timeout = 10000;
      globalConfig.features.analytics = true;
    } else if (env === 'development') {
      globalConfig.apiUrl = 'https://dev-api.example.com';
      globalConfig.timeout = 30000;
      globalConfig.features.analytics = false;
    }
    
    console.log('Config applied for environment:', env);
  }
}

// Usage examples showing problems with mutable data
const configService = new ConfigService();
const userService = new UserService();
const notificationService =