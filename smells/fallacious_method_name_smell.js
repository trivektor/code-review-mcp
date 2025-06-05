// Fallacious Method Name Smell Example
// Method names that don't accurately describe what the method does

class UserService {
  constructor() {
    this.users = [];
    this.cache = new Map();
  }

  // Says "get" but actually creates and adds a user
  getUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Says "validate" but actually modifies the user data
  validateUser(user) {
    // Actually transforms and modifies the user object
    user.email = user.email.toLowerCase();
    user.name = user.name.trim();
    user.status = 'validated';
    user.validatedAt = new Date();
    
    return user.email.includes('@') && user.name.length > 0;
  }

  // Says "find" but actually deletes users
  findInactiveUsers() {
    const inactiveUsers = this.users.filter(user => 
      user.lastLogin && 
      (new Date() - user.lastLogin) > 90 * 24 * 60 * 60 * 1000
    );
    
    // Actually removes them from the array
    this.users = this.users.filter(user => !inactiveUsers.includes(user));
    
    return inactiveUsers;
  }

  // Says "update" but actually creates a new user
  updateUserProfile(email, profileData) {
    const existingUser = this.users.find(u => u.email === email);
    
    if (!existingUser) {
      // Creates a new user instead of updating
      const newUser = {
        id: Date.now(),
        email: email,
        ...profileData,
        createdAt: new Date()
      };
      this.users.push(newUser);
      return newUser;
    }
    
    Object.assign(existingUser, profileData);
    return existingUser;
  }

  // Says "check" but actually modifies permissions
  checkUserPermissions(userId, permission) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    
    if (!user.permissions) {
      user.permissions = [];
    }
    
    // Actually adds the permission instead of just checking
    if (!user.permissions.includes(permission)) {
      user.permissions.push(permission);
    }
    
    return true;
  }

  // Says "calculate" but actually sends emails
  calculateUserEngagement(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return 0;
    
    const engagement = user.loginCount || 0;
    
    // Actually sends email notifications
    if (engagement < 5) {
      this.sendEmail(user.email, 'We miss you!', 'Come back and engage with our platform!');
    } else if (engagement > 50) {
      this.sendEmail(user.email, 'You\'re amazing!', 'Thanks for being so active!');
    }
    
    return engagement;
  }

  // Helper method for the misleading calculateUserEngagement
  sendEmail(to, subject, body) {
    console.log(`Sending email to ${to}: ${subject}`);
  }
}

class OrderProcessor {
  constructor() {
    this.orders = [];
    this.inventory = new Map();
  }

  // Says "preview" but actually processes and charges
  previewOrderTotal(orderData) {
    const total = orderData.items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    
    // Actually processes payment instead of just previewing
    const paymentResult = this.processPayment(orderData.paymentMethod, total);
    
    // Actually creates the order
    const order = {
      id: Date.now(),
      ...orderData,
      total: total,
      paymentId: paymentResult.transactionId,
      status: 'completed',
      createdAt: new Date()
    };
    
    this.orders.push(order);
    return total;
  }

  // Says "verify" but actually modifies inventory
  verifyInventory(items) {
    let allAvailable = true;
    
    for (let item of items) {
      const currentStock = this.inventory.get(item.id) || 0