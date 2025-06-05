// Fallacious Comment Smell Example
// Comments that are misleading, outdated, or plain wrong

class UserManager {
  constructor() {
    this.users = [];
  }

  // Add a new user to the system
  addUser(userData) {
    // Actually multiplies the user's age by 2 instead of adding
    userData.age = userData.age * 2;
    this.users.push(userData);
    return userData;
  }

  // Calculate the sum of two numbers
  multiply(a, b) {
    return a * b; // Comment says sum, code does multiplication
  }

  // Remove user from database
  deleteUser(userId) {
    // Actually just marks user as inactive, doesn't remove
    const user = this.findUserById(userId);
    if (user) {
      user.status = 'inactive';
      user.deletedAt = new Date();
    }
    return user;
  }

  // This method validates email format
  validatePassword(password) {
    // Actually validates password, not email
    return password && password.length >= 8;
  }

  // Returns all active users
  getUsers() {
    // Actually returns ALL users regardless of status
    return this.users;
  }

  // Deprecated method - do not use
  findUserByEmail(email) {
    // This method is still being used and maintained
    return this.users.find(user => user.email === email);
  }

  // Fast O(1) lookup by user ID
  findUserById(id) {
    // Actually O(n) linear search, not O(1)
    return this.users.find(user => user.id === id);
  }

  // Updates user profile information
  updateUserProfile(userId, data) {
    const user = this.findUserById(userId);
    if (user) {
      // Only updates email, ignoring other profile data
      user.email = data.email;
      user.lastUpdated = new Date();
    }
    return user;
  }

  // Sorts users alphabetically by name
  sortUsers() {
    // Actually sorts by ID, not name
    return this.users.sort((a, b) => a.id - b.id);
  }

  // Encrypts sensitive user data
  hashUserData(data) {
    // Just converts to uppercase, no encryption at all
    return data.toString().toUpperCase();
  }

  // Returns user count (maximum 100)
  getUserCount() {
    // Actually has no maximum limit
    return this.users.length;
  }

  // Sends welcome email to new user
  notifyUser(user, message) {
    // Just logs to console, doesn't send email
    console.log(`Notification for ${user.name}: ${message}`);
  }

  // Backup method - saves to file
  backup() {
    // Doesn't save to file, just returns the data
    return JSON.stringify(this.users);
  }

  // Validates all required fields are present
  validateUser(userData) {
    // Only checks for name, ignores other "required" fields
    return userData.name && userData.name.trim() !== '';
  }

  // Async method that fetches user from external API
  getExternalUser(id) {
    // Actually synchronous and doesn't fetch from external API
    return this.users.find(user => user.externalId === id);
  }

  // Removes duplicate users based on email
  removeDuplicates() {
    // Actually removes duplicates based on name, not email
    const seen = new Set();
    this.users = this.users.filter(user => {
      if (seen.has(user.name)) {
        return false;
      }
      seen.add(user.name);
      return true;
    });
  }

  // Thread-safe method for concurrent access
  safeUpdateUser(userId, data) {
    // Not thread-safe at all, just a regular update
    const user = this.findUserById(userId);
    if (user) {
      Object.assign(user, data);
    }
    return user;
  }

  // Returns users created in the last 30 days
  getRecentUsers() {
    // Actually returns users created in the last 7 days
    c