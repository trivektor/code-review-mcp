// Boolean Blindness Smell Example
// Boolean parameters that make method calls ambiguous and hard to understand

class UserService {
  constructor() {
    this.users = [];
  }

  // Boolean blindness - what does true/false mean?
  processUser(user, flag) {
    if (flag) {
      this.activateUser(user);
    } else {
      this.deactivateUser(user);
    }
  }

  // Multiple boolean parameters - very confusing
  createUser(name, email, isActive, isVerified, sendEmail, createProfile) {
    const user = {
      id: Date.now(),
      name,
      email,
      isActive,
      isVerified,
      createdAt: new Date()
    };

    if (sendEmail) {
      this.sendWelcomeEmail(user);
    }

    if (createProfile) {
      this.createUserProfile(user);
    }

    this.users.push(user);
    return user;
  }

  // Boolean parameter makes it unclear what the method does
  updateUserStatus(userId, status) {
    const user = this.findUser(userId);
    if (user) {
      if (status) {
        user.isActive = true;
        user.lastActivated = new Date();
      } else {
        user.isActive = false;
        user.lastDeactivated = new Date();
      }
    }
  }

  // Filter with boolean - unclear what true means
  filterUsers(includeInactive) {
    return this.users.filter(user => {
      if (includeInactive) {
        return true; // All users
      } else {
        return user.isActive; // Only active users
      }
    });
  }

  // Sort with boolean direction - what does true mean?
  sortUsers(ascending) {
    return this.users.sort((a, b) => {
      if (ascending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  // Notification method with multiple boolean flags
  sendNotification(userId, urgent, email, sms, push) {
    const user = this.findUser(userId);
    if (!user) return;

    const message = urgent ? 'URGENT: ' : '' + 'You have a new notification';

    if (email) {
      this.sendEmail(user.email, message);
    }

    if (sms) {
      this.sendSMS(user.phone, message);
    }

    if (push) {
      this.sendPushNotification(user.id, message);
    }
  }

  // Permission method with boolean that could mean grant or check
  handlePermission(userId, permission, flag) {
    const user = this.findUser(userId);
    if (!user) return false;

    if (flag) {
      // Does flag = true mean grant or check?
      return this.grantPermission(user, permission);
    } else {
      return this.revokePermission(user, permission);
    }
  }

  activateUser(user) {
    user.isActive = true;
  }

  deactivateUser(user) {
    user.isActive = false;
  }

  sendWelcomeEmail(user) {
    console.log(`Sending welcome email to ${user.email}`);
  }

  createUserProfile(user) {
    console.log(`Creating profile for ${user.name}`);
  }

  findUser(userId) {
    return this.users.find(u => u.id === userId);
  }

  sendEmail(email, message) {
    console.log(`Email to ${email}: ${message}`);
  }

  sendSMS(phone, message) {
    console.log(`SMS to ${phone}: ${message}`);
  }

  sendPushNotification(userId, message) {
    console.log(`Push to user ${userId}: ${message}`);
  }

  grantPermission(user, permission) {
    console.log(`Granting ${permission} to ${user.name}`);
    return true;
  }

  revokePermission(user, permission) {
    console.log(`Revoking ${permission} from ${user.name}`);
    return true;
  }
}

class OrderService {
  constructor() {
    this.orders = [];
  }

  // What does the boolean parameter control?
  processOrder(order, expedite) {
    if (expedite) {
      order.priority = 'high';
      order.shippingMethod = 'express';
    } else {
      order.priority = 'normal';
      order.shippingMethod = 'standard';
    }

    this.orders.push(order);
    return order;
  }

  // Multiple boolean flags make this very confusing
  calculateOrderTotal(order, includeTax, includeShipping, applyDiscount, roundUp) {
    let total = order.items.reduce((sum, item) => sum + item.price, 0);

    if (applyDiscount) {
      total *= 0.9; // 10% discount
    }

    if (includeTax) {
      total *= 1.08; // 8% tax
    }

    if (includeShipping) {
      total += 9.99;
    }

    if (roundUp) {
      total = Math.ceil(total);
    }

    return total;
  }

  // Boolean controls format type - unclear
  formatOrderSummary(order, detailed) {
    if (detailed) {
      return `Order #${order.id}: ${order.items.length} items, Total: $${order.total}, Status: ${order.status}, Created: ${order.createdAt}`;
    } else {
      return `Order #${order.id}: $${order.total}`;
    }
  }

  // Boolean for search direction - confusing
  searchOrders(query, reverse) {
    const results = this.orders.filter(order => 
      order.id.toString().includes(query) || 
      order.status.includes(query)
    );

    if (reverse) {
      return results.reverse();
    }

    return results;
  }
}

class EmailService {
  // Boolean parameters make it hard to understand what the method does
  sendEmail(to, subject, body, html, urgent, track, encrypt) {
    const email = {
      to,
      subject,
      body,
      timestamp: new Date()
    };

    if (html) {
      email.contentType = 'text/html';
    } else {
      email.contentType = 'text/plain';
    }

    if (urgent) {
      email.priority = 'high';
      subject = '[URGENT] ' + subject;
    }

    if (track) {
      email.trackingPixel = this.generateTrackingPixel();
    }

    if (encrypt) {
      email.body = this.encryptMessage(body);
    }

    console.log('Sending email:', email);
    return email;
  }

  // Boolean for batch processing - unclear meaning
  sendBulkEmails(emails, parallel) {
    if (parallel) {
      // Process in parallel
      return Promise.all(emails.map(email => this.sendSingleEmail(email)));
    } else {
      // Process sequentially
      const results = [];
      for (let email of emails) {
        results.push(this.sendSingleEmail(email));
      }
      return results;
    }
  }

  generateTrackingPixel() {
    return 'tracking_' + Date.now();
  }

  encryptMessage(message) {
    return 'encrypted_' + message;
  }

  sendSingleEmail(email) {
    return { success: true, messageId: Date.now() };
  }
}

class ReportGenerator {
  // Multiple boolean flags creating confusion
  generateReport(data, includeCharts, includeDetails, compressOutput, emailResult, saveToFile) {
    let report = {
      title: 'Data Report',
      generatedAt: new Date(),
      data: data
    };

    if (includeDetails) {
      report.details = this.generateDetailedAnalysis(data);
    }

    if (includeCharts) {
      report.charts = this.generateCharts(data);
    }

    let output = JSON.stringify(report);

    if (compressOutput) {
      output = this.compressData(output);
    }

    if (saveToFile) {
      this.saveToFile(output);
    }

    if (emailResult) {
      this.emailReport(output);
    }

    return output;
  }

  // Boolean parameter with unclear meaning
  exportData(data, format) {
    if (format) {
      return this.exportAsJSON(data);
    } else {
      return this.exportAsCSV(data);
    }
  }

  generateDetailedAnalysis(data) {
    return { analysis: 'detailed' };
  }

  generateCharts(data) {
    return { charts: 'generated' };
  }

  compressData(data) {
    return 'compressed_' + data;
  }

  saveToFile(data) {
    console.log('Saving to file:', data.substring(0, 50) + '...');
  }

  emailReport(data) {
    console.log('Emailing report:', data.substring(0, 50) + '...');
  }

  exportAsJSON(data) {
    return JSON.stringify(data);
  }

  exportAsCSV(data) {
    return 'csv,data,here';
  }
}

// Usage examples showing how confusing boolean parameters are
const userService = new UserService();
const orderService = new OrderService();
const emailService = new EmailService();
const reportGenerator = new ReportGenerator();

// What does true mean here? Activate? Deactivate?
userService.processUser({ id: 1, name: 'John' }, true);

// What do all these booleans control?
const user = userService.createUser(
  'Jane Doe',
  'jane@example.com', 
  true,  // isActive?
  false, // isVerified?
  true,  // sendEmail?
  false  // createProfile?
);

// What does true mean? Include inactive or exclude?
const filteredUsers = userService.filterUsers(true);

// What direction is true?
const sortedUsers = userService.sortUsers(true);

// Complex boolean combinations are impossible to understand
userService.sendNotification(
  user.id,
  false, // urgent?
  true,  // email?
  false, // sms?
  true   // push?
);

// Order processing with mysterious boolean
const order = { id: 1, items: [{ price: 10 }] };
orderService.processOrder(order, true); // What does true do?

// Too many boolean flags
const total = orderService.calculateOrderTotal(
  order,
  true,  // includeTax?
  false, // includeShipping?
  true,  // applyDiscount?
  false  // roundUp?
);

// Email with boolean flags - very confusing
emailService.sendEmail(
  'user@example.com',
  'Test Subject',
  'Test Body',
  false, // html?
  true,  // urgent?
  false, // track?
  true   // encrypt?
);

// Report generation with multiple unclear booleans
const report = reportGenerator.generateReport(
  { some: 'data' },
  true,  // includeCharts?
  false, // includeDetails?
  true,  // compressOutput?
  false, // emailResult?
  true   // saveToFile?
);

console.log('Boolean blindness makes code very hard to understand!');

// Problems with boolean blindness:
// 1. Method calls are impossible to understand without checking implementation
// 2. Easy to pass wrong boolean values
// 3. Hard to remember parameter order
// 4. Difficult to extend functionality
// 5. Makes code reviews harder
// 6. Increases likelihood of bugs
// 7. Reduces code readability and maintainability