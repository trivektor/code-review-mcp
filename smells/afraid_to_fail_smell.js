// Afraid To Fail Smell Example
// Excessive defensive programming that makes code unnecessarily complex

class OverlyDefensiveCalculator {
  // Extremely defensive arithmetic operations
  add(a, b) {
    // Excessive type checking
    if (typeof a !== 'number') {
      throw new TypeError('First parameter must be a number');
    }
    if (typeof b !== 'number') {
      throw new TypeError('Second parameter must be a number');
    }
    if (a === null) {
      throw new Error('First parameter cannot be null');
    }
    if (b === null) {
      throw new Error('Second parameter cannot be null');
    }
    if (a === undefined) {
      throw new Error('First parameter cannot be undefined');
    }
    if (b === undefined) {
      throw new Error('Second parameter cannot be undefined');
    }
    if (!isFinite(a)) {
      throw new Error('First parameter must be finite');
    }
    if (!isFinite(b)) {
      throw new Error('Second parameter must be finite');
    }
    if (Number.isNaN(a)) {
      throw new Error('First parameter cannot be NaN');
    }
    if (Number.isNaN(b)) {
      throw new Error('Second parameter cannot be NaN');
    }
    if (a > Number.MAX_SAFE_INTEGER) {
      throw new Error('First parameter exceeds maximum safe integer');
    }
    if (b > Number.MAX_SAFE_INTEGER) {
      throw new Error('Second parameter exceeds maximum safe integer');
    }
    if (a < Number.MIN_SAFE_INTEGER) {
      throw new Error('First parameter below minimum safe integer');
    }
    if (b < Number.MIN_SAFE_INTEGER) {
      throw new Error('Second parameter below minimum safe integer');
    }
    
    const result = a + b;
    
    // Paranoid result checking
    if (typeof result !== 'number') {
      throw new Error('Result is not a number');
    }
    if (!isFinite(result)) {
      throw new Error('Result is not finite');
    }
    if (Number.isNaN(result)) {
      throw new Error('Result is NaN');
    }
    
    return result;
  }

  divide(a, b) {
    // All the same checks as add, plus more
    if (typeof a !== 'number') {
      throw new TypeError('Dividend must be a number');
    }
    if (typeof b !== 'number') {
      throw new TypeError('Divisor must be a number');
    }
    if (a === null || a === undefined) {
      throw new Error('Dividend cannot be null or undefined');
    }
    if (b === null || b === undefined) {
      throw new Error('Divisor cannot be null or undefined');
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error('Both parameters must be finite');
    }
    if (Number.isNaN(a) || Number.isNaN(b)) {
      throw new Error('Parameters cannot be NaN');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    if (b === -0) {
      throw new Error('Division by negative zero is not allowed');
    }
    if (Math.abs(b) < Number.EPSILON) {
      throw new Error('Divisor too close to zero');
    }
    
    const result = a / b;
    
    if (typeof result !== 'number') {
      throw new Error('Division result is not a number');
    }
    if (!isFinite(result)) {
      throw new Error('Division result is not finite');
    }
    if (Number.isNaN(result)) {
      throw new Error('Division result is NaN');
    }
    if (result === Infinity || result === -Infinity) {
      throw new Error('Division result is infinity');
    }
    
    return result;
  }
}

class OverlyDefensiveUserManager {
  constructor() {
    this.users = [];
  }

  createUser(userData) {
    // Excessive validation that goes beyond reasonable
    if (!userData) {
      throw new Error('User data is required');
    }
    if (typeof userData !== 'object') {
      throw new Error('User data must be an object');
    }
    if (Array.isArray(userData)) {
      throw new Error('User data cannot be an array');
    }
    if (userData === null) {
      throw new Error('User data cannot be null');
    }
    if (Object.keys(userData).length === 0) {
      throw new Error('User data cannot be empty');
    }
    
    // Name validation - overly paranoid
    if (!userData.name) {
      throw new Error('Name is required');
    }
    if (typeof userData.name !== 'string') {
      throw new Error('Name must be a string');
    }
    if (userData.name.length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (userData.name.length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }
    if (userData.name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    if (userData.name.trim() !== userData.name) {
      throw new Error('Name cannot have leading or trailing spaces');
    }
    if (userData.name.includes('  ')) {
      throw new Error('Name cannot have consecutive spaces');
    }
    if (!/^[a-zA-Z\s]+$/.test(userData.name)) {
      throw new Error('Name can only contain letters and spaces');
    }
    if (userData.name.split(' ').length > 5) {
      throw new Error('Name cannot have more than 5 words');
    }
    
    // Email validation - extremely defensive
    if (!userData.email) {
      throw new Error('Email is required');
    }
    if (typeof userData.email !== 'string') {
      throw new Error('Email must be a string');
    }
    if (userData.email.length === 0) {
      throw new Error('Email cannot be empty');
    }
    if (userData.email.length > 254) {
      throw new Error('Email cannot exceed 254 characters (RFC 5321)');
    }
    if (!userData.email.includes('@')) {
      throw new Error('Email must contain @ symbol');
    }
    if (userData.email.indexOf('@') !== userData.email.lastIndexOf('@')) {
      throw new Error('Email cannot contain multiple @ symbols');
    }
    if (userData.email.startsWith('@')) {
      throw new Error('Email cannot start with @');
    }
    if (userData.email.endsWith('@')) {
      throw new Error('Email cannot end with @');
    }
    if (userData.email.includes('..')) {
      throw new Error('Email cannot contain consecutive dots');
    }
    if (userData.email.startsWith('.')) {
      throw new Error('Email cannot start with dot');
    }
    if (userData.email.endsWith('.')) {
      throw new Error('Email cannot end with dot');
    }
    
    const emailParts = userData.email.split('@');
    if (emailParts[0].length === 0) {
      throw new Error('Email local part cannot be empty');
    }
    if (emailParts[1].length === 0) {
      throw new Error('Email domain cannot be empty');
    }
    if (emailParts[0].length > 64) {
      throw new Error('Email local part cannot exceed 64 characters');
    }
    if (emailParts[1].length > 253) {
      throw new Error('Email domain cannot exceed 253 characters');
    }
    if (!emailParts[1].includes('.')) {
      throw new Error('Email domain must contain at least one dot');
    }
    
    // Check if email already exists - with excessive error handling
    try {
      const existingUser = this.users.find(u => {
        if (!u) {
          throw new Error('Found null user in users array');
        }
        if (!u.email) {
          throw new Error('Found user without email');
        }
        return u.email.toLowerCase() === userData.email.toLowerCase();
      });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw error;
      }
      throw new Error(`Error checking existing emails: ${error.message}`);
    }
    
    // Age validation - overly defensive
    if (userData.age !== undefined) {
      if (typeof userData.age !== 'number') {
        throw new Error('Age must be a number');
      }
      if (!Number.isInteger(userData.age)) {
        throw new Error('Age must be an integer');
      }
      if (userData.age < 0) {
        throw new Error('Age cannot be negative');
      }
      if (userData.age > 150) {
        throw new Error('Age cannot exceed 150 years');
      }
      if (userData.age < 13) {
        throw new Error('User must be at least 13 years old');
      }
    }
    
    // Create user with excessive safety checks
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      age: userData.age,
      createdAt: new Date()
    };
    
    // Verify the created user object
    if (!newUser.id) {
      throw new Error('Failed to generate user ID');
    }
    if (typeof newUser.id !== 'number') {
      throw new Error('User ID is not a number');
    }
    if (!newUser.createdAt) {
      throw new Error('Failed to set creation date');
    }
    if (!(newUser.createdAt instanceof Date)) {
      throw new Error('Creation date is not a Date object');
    }
    
    // Safely add to users array
    try {
      if (!Array.isArray(this.users)) {
        throw new Error('Users collection is not an array');
      }
      
      const originalLength = this.users.length;
      this.users.push(newUser);
      
      if (this.users.length !== originalLength + 1) {
        throw new Error('Failed to add user to collection');
      }
      
      const addedUser = this.users[this.users.length - 1];
      if (addedUser !== newUser) {
        throw new Error('Added user does not match created user');
      }
      
    } catch (error) {
      throw new Error(`Failed to save user: ${error.message}`);
    }
    
    return newUser;
  }

  // Overly defensive array access
  getUser(index) {
    if (typeof index !== 'number') {
      throw new TypeError('Index must be a number');
    }
    if (!Number.isInteger(index)) {
      throw new Error('Index must be an integer');
    }
    if (index < 0) {
      throw new Error('Index cannot be negative');
    }
    if (!Array.isArray(this.users)) {
      throw new Error('Users collection is corrupted');
    }
    if (index >= this.users.length) {
      throw new Error('Index exceeds array bounds');
    }
    if (this.users.length === 0) {
      throw new Error('No users available');
    }
    
    const user = this.users[index];
    
    if (!user) {
      throw new Error('User at index is null or undefined');
    }
    if (typeof user !== 'object') {
      throw new Error('User at index is not an object');
    }
    if (!user.id) {
      throw new Error('User at index has no ID');
    }
    
    return user;
  }
}

class OverlyDefensiveFileProcessor {
  processFile(filePath) {
    // Excessive file path validation
    if (!filePath) {
      throw new Error('File path is required');
    }
    if (typeof filePath !== 'string') {
      throw new Error('File path must be a string');
    }
    if (filePath.length === 0) {
      throw new Error('File path cannot be empty');
    }
    if (filePath.length > 260) {
      throw new Error('File path too long (Windows limit)');
    }
    if (filePath.includes('\\')) {
      throw new Error('Use forward slashes in file paths');
    }
    if (filePath.includes('//')) {
      throw new Error('File path cannot contain double slashes');
    }
    if (filePath.startsWith('/')) {
      throw new Error('File path cannot be absolute');
    }
    if (filePath.includes('..')) {
      throw new Error('File path cannot contain parent directory references');
    }
    if (filePath.includes(' ')) {
      throw new Error('File path cannot contain spaces');
    }
    if (!/^[a-zA-Z0-9._/-]+$/.test(filePath)) {
      throw new Error('File path contains invalid characters');
    }
    
    const allowedExtensions = ['.txt', '.json', '.csv', '.xml'];
    const extension = filePath.substring(filePath.lastIndexOf('.'));
    if (!allowedExtensions.includes(extension)) {
      throw new Error(`File extension ${extension} not allowed`);
    }
    
    // Simulate file processing with more paranoid checks
    try {
      const fileContent = this.readFile(filePath);
      
      if (fileContent === null) {
        throw new Error('File content is null');
      }
      if (fileContent === undefined) {
        throw new Error('File content is undefined');
      }
      if (typeof fileContent !== 'string') {
        throw new Error('File content is not a string');
      }
      if (fileContent.length === 0) {
        throw new Error('File is empty');
      }
      if (fileContent.length > 1000000) {
        throw new Error('File too large (> 1MB)');
      }
      
      return fileContent;
      
    } catch (error) {
      throw new Error(`File processing failed: ${error.message}`);
    }
  }

  readFile(path) {
    // Simulate file reading
    return `Content of ${path}`;
  }
}

// Usage examples showing how excessive defensive programming makes code hard to use
const calculator = new OverlyDefensiveCalculator();
const userManager = new OverlyDefensiveUserManager();
const fileProcessor = new OverlyDefensiveFileProcessor();

try {
  // Simple addition becomes a minefield
  const result = calculator.add(5, 3);
  console.log('Addition result:', result);
  
  // Creating a user requires extensive validation
  const user = userManager.createUser({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });
  console.log('User created:', user);
  
  // File processing has excessive checks
  const content = fileProcessor.processFile('data.txt');
  console.log('File content:', content);
  
} catch (error) {
  console.error('Error:', error.message);
}

// Problems with this approach:
// 1. Code becomes bloated and hard to read
// 2. Performance impact from excessive validation
// 3. Makes simple operations complex
// 4. Often checks for impossible conditions
// 5. Creates maintenance burden
// 6. Can mask real issues with noise
// 7. Makes code harder to test
// 8. Reduces code usability