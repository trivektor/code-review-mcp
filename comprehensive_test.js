// ===============================================
// COMPREHENSIVE TEST FILE FOR MCP CODE ANALYZER
// Contains various code smells, anti-patterns, and security issues
// ===============================================

// SECURITY ISSUES
// ===============================================

// 1. Hardcoded Secrets and Credentials
const API_KEY = "sk-1234567890abcdefghijk"; // Hardcoded API key
const DATABASE_PASSWORD = "mySecretPassword123!"; // Hardcoded password
const JWT_SECRET = "this-is-my-super-secret-jwt-key"; // Hardcoded JWT secret
const STRIPE_KEY = "pk_test_abcdefghijklmnopqrstuvwxyz"; // Hardcoded payment key

// 2. SQL Injection Vulnerabilities
function getUserData(userId) {
    const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL injection risk
    const dynamicQuery = `SELECT * FROM products WHERE name = '${userInput}'`; // Dynamic SQL
    return database.query(query);
}

// 3. XSS Vulnerabilities
function displayUserContent(userInput) {
    document.innerHTML = userInput; // XSS vulnerability
    element.outerHTML = `<div>${userContent}</div>`; // XSS risk
    document.write("<script>" + userScript + "</script>"); // XSS vulnerability
}

// 4. Dangerous Eval Usage
function executeUserCode(code) {
    eval(code); // Extremely dangerous
    const result = new Function(userInput)(); // Alternative eval
    setTimeout(userProvidedString, 1000); // Implicit eval
}

// 5. Insecure Random Number Generation
function generateToken() {
    return Math.random().toString(36); // Weak random for security
}

// 6. Prototype Pollution
function mergeObjects(target, source) {
    for (let key in source) {
        target[key] = source[key]; // Can pollute Object.prototype
    }
}

// CODE SMELLS & ANTI-PATTERNS
// ===============================================

// 7. God Object Anti-Pattern
class MegaController {
    constructor() {
        this.users = [];
        this.products = [];
        this.orders = [];
        this.inventory = [];
        this.reports = [];
        this.analytics = [];
        this.notifications = [];
        this.payments = [];
        this.shipping = [];
        this.authentication = [];
        this.authorization = [];
        this.logging = [];
        this.monitoring = [];
        this.configuration = [];
        this.emailService = [];
        this.smsService = [];
        this.fileStorage = [];
        this.caching = [];
        this.searchEngine = [];
        this.recommendations = [];
    }

    // 100+ methods would be here in a real god object
    createUser(userData) { /* ... */ }
    updateUser(id, data) { /* ... */ }
    deleteUser(id) { /* ... */ }
    createProduct(productData) { /* ... */ }
    updateInventory(items) { /* ... */ }
    processPayment(paymentData) { /* ... */ }
    sendNotification(message) { /* ... */ }
    generateReport(type) { /* ... */ }
    analyzeUserBehavior(userId) { /* ... */ }
    optimizeRecommendations() { /* ... */ }
    // ... many more methods
}

// 8. Long Parameter Lists
function createUserProfile(
    firstName, lastName, email, phone, address, city, state, zipCode, 
    country, birthDate, gender, occupation, company, salary, interests,
    preferences, notifications, privacy, theme, language, timezone
) {
    // Too many parameters
    return { firstName, lastName, email /* ... */ };
}

// 9. Feature Envy (accessing another object's data excessively)
class OrderProcessor {
    calculateTotal(order) {
        let total = 0;
        total += order.customer.address.city.taxRate * order.amount; // Feature envy
        total += order.customer.membership.discount.percentage; // Feature envy
        total += order.shipping.carrier.rates.express; // Feature envy
        return total;
    }
}

// 10. Data Clumps (same group of data appears together)
function createUser(name, email, phone, address, city, state, zip) { /* ... */ }
function updateUser(id, name, email, phone, address, city, state, zip) { /* ... */ }
function validateUser(name, email, phone, address, city, state, zip) { /* ... */ }

// 11. Large Class with Too Many Responsibilities
class UserManager {
    // User CRUD operations
    createUser(userData) { /* ... */ }
    updateUser(id, data) { /* ... */ }
    deleteUser(id) { /* ... */ }
    
    // Email operations
    sendWelcomeEmail(user) { /* ... */ }
    sendPasswordResetEmail(user) { /* ... */ }
    
    // Payment operations
    processUserPayment(user, amount) { /* ... */ }
    refundUser(user, amount) { /* ... */ }
    
    // Analytics operations
    trackUserBehavior(user, action) { /* ... */ }
    generateUserReport(user) { /* ... */ }
    
    // File operations
    uploadUserAvatar(user, file) { /* ... */ }
    deleteUserFiles(user) { /* ... */ }
}

// 12. Deep Nesting (Arrow Anti-Pattern)
function processOrder(order) {
    if (order) {
        if (order.items) {
            if (order.items.length > 0) {
                if (order.customer) {
                    if (order.customer.address) {
                        if (order.customer.address.country === 'US') {
                            if (order.amount > 100) {
                                if (order.customer.membership) {
                                    if (order.customer.membership.level === 'premium') {
                                        // Finally do something 8 levels deep!
                                        return applyPremiumDiscount(order);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return order;
}

// 13. Magic Numbers and Strings
function calculateDiscount(amount, customerType) {
    if (customerType === "premium") { // Magic string
        return amount * 0.15; // Magic number
    } else if (customerType === "gold") { // Magic string
        return amount * 0.10; // Magic number
    } else if (amount > 1000) { // Magic number
        return amount * 0.05; // Magic number
    }
    return 0;
}

// 14. Duplicate Code
function calculateTotalForRegularCustomer(items) {
    let total = 0;
    for (let item of items) {
        total += item.price * item.quantity;
    }
    total = total * 1.08; // Tax
    total = total * 0.95; // Regular discount
    return total;
}

function calculateTotalForPremiumCustomer(items) {
    let total = 0;
    for (let item of items) {
        total += item.price * item.quantity;
    }
    total = total * 1.08; // Tax
    total = total * 0.85; // Premium discount
    return total;
}

// 15. Shotgun Surgery (one change requires many small changes in many classes)
// These functions all need to change when tax rate changes
function calculateOrderTotal(amount) { return amount * 1.08; }
function calculateCartTotal(items) { return items.reduce((sum, item) => sum + item.price, 0) * 1.08; }
function calculateInvoiceTotal(invoice) { return invoice.subtotal * 1.08; }

// 16. Inappropriate Intimacy (classes too closely coupled)
class User {
    constructor() {
        this.profile = new UserProfile(this); // Tight coupling
    }
    
    updateEmail(email) {
        this.email = email;
        this.profile.updateEmailInProfile(email); // Knows too much about profile
        this.profile.notificationSettings.emailUpdated = true; // Accessing internal state
    }
}

// 17. Refused Bequest (subclass doesn't use parent's methods)
class Vehicle {
    startEngine() { /* ... */ }
    stopEngine() { /* ... */ }
    refuel() { /* ... */ }
}

class Bicycle extends Vehicle {
    // Doesn't need engine methods but inherits them
    pedal() { /* ... */ }
    // startEngine() makes no sense for a bicycle
}

// BAD PRACTICES & CODE QUALITY ISSUES
// ===============================================

// 18. Using var instead of const/let
var globalVariable = "should be const"; // Bad practice
var counter = 0; // Should be let
var config = { api: "url" }; // Should be const

// 19. Unused Variables and Functions
const unusedConstant = "I'm never used";
let unusedVariable = 42;
function unusedFunction() {
    return "I'm never called";
}

// 20. Console.log statements (should be removed in production)
function processData(data) {
    console.log("Processing data:", data); // Debug code left in
    console.log("Data length:", data.length);
    const result = transform(data);
    console.log("Result:", result); // More debug code
    return result;
}

// 21. Empty Catch Blocks (Swallowing Exceptions)
function dangerousOperation() {
    try {
        riskyFunction();
    } catch (error) {
        // Silently ignoring errors - very bad!
    }
}

// 22. Pyramids of Doom (Callback Hell)
function getData(callback) {
    fetchUser(userId, (user) => {
        fetchUserPosts(user.id, (posts) => {
            fetchPostComments(posts[0].id, (comments) => {
                fetchCommentReplies(comments[0].id, (replies) => {
                    fetchUserProfiles(replies.map(r => r.userId), (profiles) => {
                        callback(profiles);
                    });
                });
            });
        });
    });
}

// 23. Functions That Do Too Much
function processUserRegistration(userData) {
    // Validation
    if (!userData.email || !userData.password) {
        throw new Error("Missing required fields");
    }
    
    // Password hashing
    const hashedPassword = bcrypt.hash(userData.password, 10);
    
    // Database insertion
    const user = database.insert('users', { ...userData, password: hashedPassword });
    
    // Send welcome email
    emailService.send(userData.email, 'welcome', { name: userData.name });
    
    // Log user creation
    logger.info(`User created: ${user.id}`);
    
    // Update analytics
    analytics.track('user_registered', { userId: user.id });
    
    // Create user directory
    fileSystem.createDirectory(`/users/${user.id}`);
    
    // Initialize user preferences
    preferences.create(user.id, defaultPreferences);
    
    // Send notification to admin
    notificationService.notifyAdmin('new_user', user);
    
    return user;
}

// 24. Boolean Trap (unclear boolean parameters)
function createUser(name, email, isActive, isVerified, isPremium, isBlocked) {
    // Hard to understand what these booleans mean when calling the function
    return { name, email, isActive, isVerified, isPremium, isBlocked };
}

// Usage: createUser("John", "john@example.com", true, false, true, false) // Confusing!

// 25. Primitive Obsession (using primitives instead of objects)
function calculateDistance(x1, y1, x2, y2) { // Should use Point objects
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function formatAddress(street, city, state, zip, country) { // Should use Address object
    return `${street}, ${city}, ${state} ${zip}, ${country}`;
}

// 26. Comments That Lie or Are Obvious
function add(a, b) {
    // This function multiplies two numbers
    return a + b; // Actually adds them
}

// Increment i by 1
i++; // Obvious comment

// 27. Inconsistent Naming
function getUserData() { /* ... */ }
function get_user_posts() { /* ... */ } // snake_case mixed with camelCase
function GetUserComments() { /* ... */ } // PascalCase for function

// 28. Functions with No Return Value Checks
function parseJSON(jsonString) {
    return JSON.parse(jsonString); // Could throw, but not handled
}

const data = parseJSON(userInput); // Assuming it always works
console.log(data.name); // Could crash if parsing failed

// 29. Global State Mutations
let globalCounter = 0;
let globalConfig = {};

function incrementCounter() {
    globalCounter++; // Modifying global state
}

function updateConfig(key, value) {
    globalConfig[key] = value; // Modifying global state
}

// 30. Memory Leaks (Event Listeners Not Removed)
function setupEventListeners() {
    const button = document.getElementById('myButton');
    const handler = () => console.log('clicked');
    
    button.addEventListener('click', handler);
    // Never removes the event listener - potential memory leak
}

// 31. Circular Dependencies (conceptual example)
// File: user.js
class User {
    constructor() {
        this.orders = new OrderManager(this); // Depends on OrderManager
    }
}

// File: order.js  
class OrderManager {
    constructor(user) {
        this.user = user; // Depends on User
        this.validator = new UserValidator(user); // More coupling
    }
}

// 32. Switch Statement That Should Be Polymorphism
function calculateArea(shape) {
    switch (shape.type) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        case 'triangle':
            return 0.5 * shape.base * shape.height;
        case 'square':
            return shape.side ** 2;
        // Every new shape requires modifying this function
        default:
            throw new Error('Unknown shape');
    }
}

// 33. Code That Violates DRY (Don't Repeat Yourself)
function validateUserEmail(email) {
    if (!email) return false;
    if (typeof email !== 'string') return false;
    if (!email.includes('@')) return false;
    if (email.length < 5) return false;
    return true;
}

function validateAdminEmail(email) {
    if (!email) return false;
    if (typeof email !== 'string') return false;
    if (!email.includes('@')) return false;
    if (email.length < 5) return false;
    if (!email.endsWith('@company.com')) return false; // Only difference
    return true;
}

// 34. Performance Anti-Patterns
function findUserInArray(users, targetId) {
    // O(n) lookup that could be O(1) with a Map
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === targetId) {
            return users[i];
        }
    }
    return null;
}

// Repeated expensive operations
function processUsers(users) {
    for (let user of users) {
        const expensiveCalculation = heavyComputation(user); // Should be memoized
        updateUser(user.id, expensiveCalculation);
    }
}

// 35. Error Handling Anti-Patterns
function riskyOperation() {
    throw new Error("Something went wrong"); // Generic error message
}

function anotherRiskyOperation() {
    throw "String error"; // Throwing strings instead of Error objects
}

function poorErrorHandling() {
    try {
        riskyOperation();
    } catch (e) {
        console.log("Oops!"); // Hiding the actual error
    }
}

// ===============================================
// END OF TEST FILE
// This file should trigger many warnings and errors
// when analyzed by your MCP code review server!
// ===============================================