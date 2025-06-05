// Global Data Smell Example
// Global variables that create hidden dependencies and make testing difficult

// Global configuration - accessible from anywhere
let appConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retryCount: 3,
  debug: true
};

// Global user state - modified by many functions
let currentUser = null;
let userPermissions = [];
let userPreferences = {};

// Global application state
let isLoading = false;
let errorMessages = [];
let notifications = [];

// Global cache - shared across all modules
let dataCache = new Map();
let cacheExpiration = new Map();

// Global counters and flags
let requestCount = 0;
let lastRequestTime = 0;
let isOnline = true;
let maintenanceMode = false;

// Database connection - global singleton
let dbConnection = null;

class UserService {
  login(username, password) {
    // Modifies global state without making it obvious
    isLoading = true;
    
    try {
      // Uses global config
      const response = this.makeRequest(`${appConfig.apiUrl}/auth/login`, {
        username,
        password,
        timeout: appConfig.timeout
      });
      
      if (response.success) {
        // Modifies multiple global variables
        currentUser = response.user;
        userPermissions = response.permissions;
        userPreferences = response.preferences;
        
        // Update global cache
        dataCache.set('current_user', currentUser);
        cacheExpiration.set('current_user', Date.now() + 3600000);
        
        this.logActivity('login_success');
        return true;
      }
    } catch (error) {
      // Modifies global error state
      errorMessages.push(error.message);
      this.logActivity('login_failed');
      return false;
    } finally {
      isLoading = false;
    }
  }

  logout() {
    // Clears global state
    currentUser = null;
    userPermissions = [];
    userPreferences = {};
    
    // Clear related cache entries
    dataCache.delete('current_user');
    dataCache.delete('user_data');
    cacheExpiration.delete('current_user');
    
    this.logActivity('logout');
  }

  hasPermission(permission) {
    // Depends on global user permissions
    return userPermissions.includes(permission);
  }

  updatePreference(key, value) {
    // Modifies global preferences
    userPreferences[key] = value;
    
    // Also updates cache
    dataCache.set('user_preferences', userPreferences);
  }

  makeRequest(url, options = {}) {
    // Uses and modifies global request tracking
    requestCount++;
    lastRequestTime = Date.now();
    
    // Uses global config
    const timeout = options.timeout || appConfig.timeout;
    const r