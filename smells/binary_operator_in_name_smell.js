// Binary Operator in Name Smell Example
// Method and variable names that contain binary operators or comparisons

class UserAccountManager {
  constructor() {
    this.users = [];
  }

  // Method names with binary operators - confusing and unclear
  addAndValidateUser(userData) {
    const user = this.createUser(userData);
    this.validateUser(user);
    this.users.push(user);
    return user;
  }

  updateOrCreateUser(userData) {
    const existingUser = this.findUser(userData.id);
    if (existingUser) {
      return this.updateUser(existingUser, userData);
    } else {
      return this.createUser(userData);
    }
  }

  deleteAndArchiveUser(userId) {
    const user = this.findUser(userId);
    if (user) {
      this.archiveUser(user);
      this.removeUser(userId);
    }
  }

  // Method names with comparisons - what do they actually do?
  isActiveAndVerified(user) {
    return user.isActive && user.isVerified;
  }

  isAdminOrModerator(user) {
    return user.role === 'admin' || user.role === 'moderator';
  }

  hasReadOrWritePermission(user) {
    return user.permissions.includes('read') || user.permissions.includes('write');
  }

  // Method names that try to combine multiple operations
  saveAndNotifyUser(user) {
    this.saveUser(user);
    this.sendNotification(user);
  }

  validateAndProcessPayment(paymentData) {
    if (this.validatePayment(paymentData)) {
      return this.processPayment(paymentData);
    }
    throw new Error('Payment validation failed');
  }

  checkAndUpdateUserStatus(userId) {
    const user = this.findUser(userId);
    if (user && user.lastLogin) {
      const daysSinceLogin = (new Date() - user.lastLogin) / (1000 * 60 * 60 * 24);
      if (daysSinceLogin > 30) {
        user.status = 'inactive';
        this.saveUser(user);
      }
    }
  }

  // Helper methods
  createUser(userData) {
    return { id: Date.now(), ...userData, createdAt: new Date() };
  }

  findUser(id) {
    return this.users.find(u => u.id === id);
  }

  updateUser(user, data) {
    Object.assign(user, data);
    return user;
  }

  validateUser(user) {
    return user.email && user.name;
  }

  archiveUser(user) {
    user.archived = true;
  }

  removeUser(id) {
    this.users = this.users.filter(u => u.id !== id);
  }

  saveUser(user) {
    console.log(`Saving user: ${user.id}`);
  }

  sendNotification(user) {
    console.log(`Sending notification to: ${user.email}`);
  }

  validatePayment(paymentData) {
    return paymentData.amount > 0;
  }

  processPayment(paymentData) {
    return { success: true, transactionId: Date.now() };
  }
}

class DataProcessor {
  // More binary operators in method names
  filterAndSortData(data, filterCriteria, sortKey) {
    const filtered = data.filter(item => this.matchesCriteria(item, filterCriteria));
    return filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  mapAndReduceValues(data, mapFunction, reduceFunction) {
    const mapped = data.map(mapFunction);
    return mapped.reduce(reduceFunction);
  }

  validateAndTransformInput(input) {
    if (!this.isValidInput(input)) {
      throw new Error('Invalid input');
    }
    return this.transformInput(input);
  }

  parseAndFormatDate(dateString) {
    const parsed = new Date(dateString);
    return this.formatDate(parsed);
  }

  encryptAndStoreData(data, key) {
    const encrypted = this.encrypt(data, key);
    this.storeData(encrypted);
    return encrypted;
  }

  // Variable names with binary operators
  calculateAndDisplayTotals(items) {
    const sumAndAverage = this.calculateSumAndAverage(items);
    const minAndMax = this.findMinAndMax(items);
    
    return {
      ...sumAndAverage,
      ...minAndMax
    };
  }

  calculateSumAndAverage(items) {
    const sum = items.reduce((total, item) => total + item.value, 0);
    const average = sum / items.length;
    return { sum, average };
  }

  findMinAndMax(items) {
    const values = items.map(item => item.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }

  // Helper methods
  matchesCriteria(item, criteria) {
    return Object.keys(criteria).every(key => item[key] === criteria[key]);
  }

  isValidInput(input) {
    return input && typeof input === 'object';
  }

  transformInput(input) {
    return { ...input, transformed: true };
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  encrypt(data, key) {
    return `encrypted_${JSON.stringify(data)}_${key}`;
  }

  storeData(data) {
    console.log('Storing data:', data);
  }
}

class FileManager {
  // File operations with binary operators in names
  readAndParseFile(filename) {
    const content = this.readFile(filename);
    return this.parseContent(content);
  }

  writeAndBackupFile(filename, data) {
    this.createBackup(filename);
    this.writeFile(filename, data);
  }

  compressAndUploadFile(filename) {
    const compressed = this.compressFile(filename);
    return this.uploadFile(compressed);
  }

  downloadAndExtractFile(url) {
    const file = this.downloadFile(url);
    return this.extractFile(file);
  }

  scanAndCleanFiles(directory) {
    const files = this.scanDirectory(directory);
    return this.cleanFiles(files);
  }

  // Methods that combine validation and action
  checkAndCreateDirectory(path) {
    if (!this.directoryExists(path)) {
      this.createDirectory(path);
    }
  }

  verifyAndDeleteFile(filename) {
    if (this.fileExists(filename) && this.canDelete(filename)) {
      this.deleteFile(filename);
    }
  }

  // Helper methods
  readFile(filename) {
    return `Content of ${filename}`;
  }

  parseContent(content) {
    return { parsed: content };
  }

  createBackup(filename) {
    console.log(`Creating backup of ${filename}`);
  }

  writeFile(filename, data) {
    console.log(`Writing to ${filename}:`, data);
  }

  compressFile(filename) {
    return `${filename}.gz`;
  }

  uploadFile(filename) {
    return { uploaded: true, filename };
  }

  downloadFile(url) {
    return `file_from_${url}`;
  }

  extractFile(file) {
    return { extracted: file };
  }

  scanDirectory(directory) {
    return [`${directory}/file1.txt`, `${directory}/file2.txt`];
  }

  cleanFiles(files) {
    return files.filter(file => !file.includes('temp'));
  }

  directoryExists(path) {
    return Math.random() > 0.5;
  }

  createDirectory(path) {
    console.log(`Creating directory: ${path}`);
  }

  fileExists(filename) {
    return Math.random() > 0.3;
  }

  canDelete(filename) {
    return !filename.includes('system');
  }

  deleteFile(filename) {
    console.log(`Deleting file: ${filename}`);
  }
}

class ApiService {
  // API methods with binary operators
  fetchAndCacheData(endpoint) {
    const data = this.fetchData(endpoint);
    this.cacheData(endpoint, data);
    return data;
  }

  validateAndSendRequest(requestData) {
    if (this.validateRequest(requestData)) {
      return this.sendRequest(requestData);
    }
    throw new Error('Request validation failed');
  }

  retryAndLogRequest(requestData, maxRetries) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const result = this.sendRequest(requestData);
        this.logSuccess(requestData, result);
        return result;
      } catch (error) {
        attempts++;
        this.logError(requestData, error, attempts);
        if (attempts >= maxRetries) {
          throw error;
        }
      }
    }
  }

  authenticateAndAuthorize(user, resource) {
    const authenticated = this.authenticate(user);
    if (authenticated) {
      return this.authorize(user, resource);
    }
    return false;
  }

  // Methods with comparison-like names
  compareAndMergeData(data1, data2) {
    const differences = this.compareData(data1, data2);
    return this.mergeData(data1, data2, differences);
  }

  // Helper methods
  fetchData(endpoint) {
    return { data: `Data from ${endpoint}` };
  }

  cacheData(key, data) {
    console.log(`Caching data for ${key}`);
  }

  validateRequest(requestData) {
    return requestData && requestData.url;
  }

  sendRequest(requestData) {
    if (Math.random() > 0.8) {
      throw new Error('Request failed');
    }
    return { success: true, data: 'response' };
  }

  logSuccess(request, result) {
    console.log('Request succeeded:', request.url);
  }

  logError(request, error, attempt) {
    console.log(`Request failed (attempt ${attempt}):`, error.message);
  }

  authenticate(user) {
    return user && user.credentials;
  }

  authorize(user, resource) {
    return user.permissions.includes(resource);
  }

  compareData(data1, data2) {
    return { differences: [] };
  }

  mergeData(data1, data2, differences) {
    return { ...data1, ...data2 };
  }
}

// Usage examples showing confusing method names
const userManager = new UserAccountManager();
const dataProcessor = new DataProcessor();
const fileManager = new FileManager();
const apiService = new ApiService();

// These method names don't clearly indicate what they do
const user = userManager.addAndValidateUser({ name: 'John', email: 'john@example.com' });
userManager.saveAndNotifyUser(user);
userManager.checkAndUpdateUserStatus(user.id);

const data = [{ value: 10 }, { value: 20 }, { value: 15 }];
const processed = dataProcessor.filterAndSortData(data, {}, 'value');
const totals = dataProcessor.calculateAndDisplayTotals(data);

fileManager.readAndParseFile('data.txt');
fileManager.writeAndBackupFile('output.txt', 'some data');

apiService.fetchAndCacheData('/api/users');
apiService.validateAndSendRequest({ url: '/api/test' });

console.log('Method names with binary operators are confusing!');

// Problems with binary operators in names:
// 1. Methods appear to do multiple things (violates SRP)
// 2. Unclear what the primary purpose is
// 3. Hard to unit test individual parts
// 4. Makes method names unnecessarily long
// 5. Can hide complexity and coupling
// 6. Difficult to reuse parts of the functionality
// 7. Makes code harder to understand and maintain
// 8. Suggests poor separation of concerns
// 9. Can lead to inconsistent behavior
// 10. Makes refactoring more difficult