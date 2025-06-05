// Dead Code Smell Example
// Code that is never executed or used

class UserManager {
  constructor() {
    this.users = [];
    this.adminUsers = [];
  }

  createUser(userData) {
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(user);
    
    // Dead code - this return is never reached due to early return above
    console.log('User created successfully');
    return user;
    
    // Dead code - everything after return is unreachable
    this.logUserCreation(user);
    this.sendWelcomeEmail(user);
    this.updateUserStats();
  }

  updateUser(userId, updates) {
    const user = this.findUser(userId);
    
    if (!user) {
      return null;
    }
    
    Object.assign(user, updates);
    
    if (updates.email) {
      this.validateEmail(updates.email);
      return user;
      
      // Dead code - unreachable after return
      this.sendEmailChangeNotification(user);
      this.logEmailChange(user, updates.email);
    }
    
    return user;
  }

  deleteUser(userId) {
    const index = this.users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    this.users.splice(index, 1);
    return true;
    
    // Dead code - unreachable after return
    this.logUserDeletion(userId);
    this.cleanupUserData(userId);
    this.updateUserCount();
  }

  // Dead method - never called anywhere
  migrateUserData(fromFormat, toFormat) {
    console.log(`Migrating from ${fromFormat} to ${toFormat}`);
    // This entire method is dead code
    for (let user of this.users) {
      if (fromFormat === 'v1' && toFormat === 'v2') {
        user.version = 2;
        user.migrated = true;
      }
    }
  }

  // Dead method - was used in old version but not anymore
  generateUserReport(format = 'json') {
    const report = {
      totalUsers: this.users.length,
      activeUsers: this.users.filter(u => u.isActive).length,
      generatedAt: new Date()
    };
    
    if (format === 'csv') {
      return this.convertToCSV(report);
    } else if (format === 'xml') {
      return this.convertToXML(report);
    }
    
    return JSON.stringify(report);
  }

  processUserBatch(users) {
    for (let userData of users) {
      const user = this.createUser(userData);
      
      // Dead code - condition never true
      if (userData.type === 'legacy') {
        // This code is never executed because 'legacy' type doesn't exist
        this.migrateLegacyUser(user);
        this.assignLegacyPermissions(user);
        this.notifyLegacyAdmins(user);
      }
      
      // Dead code - unreachable condition  
      if (false) {
        console.log('This will never execute');
        this.handleSpecialCase(user);
      }
    }
  }

  validateUserData(userData) {
    if (!userData) {
      throw new Error('User data is required');
    }
    
    if (!userData.email) {
      throw new Error('Email is required');
      
      // Dead code - unreachable after throw
      console.log('Validating email format');
      this.checkEmailDomain(userData.email);
    }
    
    if (!userData.name) {
      throw new Error('Name is required');
      
      // Dead code - unreachable after throw
      userData.name = userData.name.trim();
      this.validateNameLength(userData.name);
    }
    
    return true;
  }

  // Dead helper methods - never called
  migrateLegacyUser(user) {
    console.log(`Migrating legacy user: ${user.name}`);
  }

  assignLegacyPermissions(user) {
    user.permissions = ['legacy_read', 'legacy_write'];
  }

  notifyLegacyAdmins(user) {
    console.log(`Notifying admins about legacy user: ${user.name}`);
  }

  handleSpecialCase(user) {
    console.log(`Handling special case for: ${user.name}`);
  }

  convertToCSV(data) {
    return 'csv,format,data';
  }

  convertToXML(data) {
    return '<xml>data</xml>';
  }

  checkEmailDomain(email) {
    const domain = email.split('@')[1];
    return domain !== 'blocked.com';
  }

  validateNameLength(name) {
    return name.length >= 2 && name.length <= 50;
  }

  // More dead helper methods
  logUserCreation(user) {
    console.log(`User created: ${user.id}`);
  }

  sendWelcomeEmail(user) {
    console.log(`Welcome email sent to: ${user.email}`);
  }

  updateUserStats() {
    console.log('User statistics updated');
  }

  sendEmailChangeNotification(user) {
    console.log(`Email change notification sent to: ${user.email}`);
  }

  logEmailChange(user, newEmail) {
    console.log(`Email changed for ${user.id}: ${newEmail}`);
  }

  logUserDeletion(userId) {
    console.log(`User deleted: ${userId}`);
  }

  cleanupUserData(userId) {
    console.log(`Cleaning up data for user: ${userId}`);
  }

  updateUserCount() {
    console.log('User count updated');
  }

  findUser(userId) {
    return this.users.find(u => u.id === userId);
  }

  validateEmail(email) {
    return email.includes('@');
  }
}

class OrderProcessor {
  constructor() {
    this.orders = [];
    this.DEBUG_MODE = false; // Dead variable - never set to true
  }

  processOrder(orderData) {
    // Dead code - condition never true
    if (this.DEBUG_MODE) {
      console.log('Debug: Processing order', orderData);
      this.logOrderDetails(orderData);
      this.validateOrderStructure(orderData);
    }
    
    const order = {
      id: Date.now(),
      ...orderData,
      status: 'processing',
      createdAt: new Date()
    };
    
    this.orders.push(order);
    
    // Dead code - old payment processing method
    if (orderData.paymentMethod === 'legacy_credit') {
      // This payment method is no longer supported
      return this.processLegacyPayment(order);
    }
    
    return this.processModernPayment(order);
  }

  calculateShipping(order) {
    let shippingCost = 0;
    
    if (order.items.length > 0) {
      shippingCost = 9.99;
    }
    
    // Dead code - old shipping calculation
    if (order.shippingMethod === 'owl_post') {
      // This shipping method was removed years ago
      shippingCost = this.calculateOwlPostShipping(order);
      this.scheduleOwlDelivery(order);
    }
    
    // Dead code - unreachable condition
    if (order.items.length < 0) {
      // Items length can never be negative
      throw new Error('Invalid item count');
    }
    
    return shippingCost;
  }

  // Dead methods - old functionality no longer used
  processLegacyPayment(order) {
    console.log('Processing legacy payment');
    return { success: false, reason: 'Legacy payment not supported' };
  }

  calculateOwlPostShipping(order) {
    return order.weight * 2.5 + 15; // Cost per gram + owl care fee
  }

  scheduleOwlDelivery(order) {
    console.log('Scheduling owl delivery for order:', order.id);
  }

  logOrderDetails(orderData) {
    console.log('Order details:', JSON.stringify(orderData, null, 2));
  }

  validateOrderStructure(orderData) {
    console.log('Validating order structure');
  }

  processModernPayment(order) {
    return { success: true, transactionId: 'txn_' + Date.now() };
  }
}

class DataAnalyzer {
  constructor() {
    this.data = [];
  }

  analyzeData(dataset) {
    if (!dataset || dataset.length === 0) {
      return null;
    }
    
    const analysis = {
      count: dataset.length,
      average: this.calculateAverage(dataset)
    };
    
    // Dead code - feature flag that's always false
    const ENABLE_ADVANCED_ANALYSIS = false;
    if (ENABLE_ADVANCED_ANALYSIS) {
      analysis.median = this.calculateMedian(dataset);
      analysis.standardDeviation = this.calculateStandardDeviation(dataset);
      analysis.correlations = this.findCorrelations(dataset);
    }
    
    return analysis;
  }

  preprocessData(rawData) {
    const cleanData = rawData.filter(item => item !== null);
    
    // Dead code - commented out but left in
    // const normalizedData = cleanData.map(item => this.normalize(item));
    // const scaledData = normalizedData.map(item => this.scale(item));
    // return scaledData;
    
    return cleanData;
    
    // Dead code - unreachable after return
    console.log('Data preprocessing completed');
    this.logDataStats(cleanData);
  }

  // Dead methods - advanced analysis features never used
  calculateMedian(dataset) {
    const sorted = dataset.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }

  calculateStandardDeviation(dataset) {
    const avg = this.calculateAverage(dataset);
    const squareDiffs = dataset.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = this.calculateAverage(squareDiffs);
    return Math.sqrt(avgSquareDiff);
  }

  findCorrelations(dataset) {
    // Complex correlation analysis that's never used
    return [];
  }

  normalize(value) {
    return (value - this.min) / (this.max - this.min);
  }

  scale(value) {
    return value * this.scaleFactor;
  }

  logDataStats(data) {
    console.log(`Data contains ${data.length} items`);
  }

  calculateAverage(dataset) {
    return dataset.reduce((sum, val) => sum + val, 0) / dataset.length;
  }
}

class ConfigManager {
  constructor() {
    this.config = {};
    this.LEGACY_MODE = false; // Dead flag - never used
  }

  loadConfig(configFile) {
    try {
      this.config = this.parseConfigFile(configFile);
    } catch (error) {
      console.error('Config loading failed:', error.message);
      return false;
      
      // Dead code - unreachable after return
      this.loadDefaultConfig();
      this.notifyConfigError(error);
    }
    
    // Dead code - legacy mode never activated
    if (this.LEGACY_MODE) {
      this.applyLegacyTransforms();
      this.validateLegacyConfig();
    }
    