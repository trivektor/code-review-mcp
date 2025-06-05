// Complicated Boolean Expression Smell Example
// Complex boolean logic that is hard to understand and maintain

class UserAccessControl {
  // Extremely complicated boolean expression for access control
  canAccessAdminPanel(user) {
    return (user.role === 'admin' || user.role === 'superuser' || (user.role === 'manager' && user.department === 'IT')) &&
           user.isActive &&
           !user.isLocked &&
           (user.lastLogin && (new Date() - user.lastLogin) < 30 * 24 * 60 * 60 * 1000) &&
           user.permissions &&
           (user.permissions.includes('admin_read') || user.permissions.includes('admin_write') || user.permissions.includes('admin_full')) &&
           (!user.requiresTwoFactor || (user.requiresTwoFactor && user.twoFactorVerified)) &&
           (user.ipWhitelist.length === 0 || user.ipWhitelist.includes(user.currentIP)) &&
           user.accountType !== 'temporary' &&
           (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trial') &&
           (!user.maintenanceMode || (user.maintenanceMode && user.bypassMaintenance));
  }

  // Another complex boolean expression for content permissions
  canEditContent(user, content) {
    return ((user.role === 'editor' || user.role === 'admin' || user.role === 'content_manager') &&
            user.isActive &&
            !user.isLocked &&
            content.status !== 'published') ||
           ((user.role === 'author' || user.role === 'contributor') &&
            user.isActive &&
            !user.isLocked &&
            content.authorId === user.id &&
            (content.status === 'draft' || content.status === 'pending_review') &&
            !content.isLocked &&
            (!content.deadline || content.deadline > new Date())) ||
           (user.role === 'admin' &&
            user.isActive &&
            user.permissions.includes('override_all') &&
            !user.emergencyRestrictions) ||
           (user.role === 'moderator' &&
            user.isActive &&
            content.category === user.assignedCategory &&
            content.status !== 'archived' &&
            user.moderationLevel >= content.requiredModerationLevel);
  }

  // Complex validation logic
  isValidUserRegistration(userData) {
    return userData &&
           userData.email &&
           userData.email.includes('@') &&
           userData.email.includes('.') &&
           userData.email.length > 5 &&
           userData.email.length < 100 &&
           !userData.email.startsWith('.') &&
           !userData.email.endsWith('.') &&
           userData.password &&
           userData.password.length >= 8 &&
           userData.password.length <= 128 &&
           /[A-Z]/.test(userData.password) &&
           /[a-z]/.test(userData.password) &&
           /[0-9]/.test(userData.password) &&
           /[!@#$%^&*]/.test(userData.password) &&
           userData.firstName &&
           userData.firstName.length >= 2 &&
           userData.firstName.length <= 50 &&
           !/\d/.test(userData.firstName) &&
           userData.lastName &&
           userData.lastName.length >= 2 &&
           userData.lastName.length <= 50 &&
           !/\d/.test(userData.lastName) &&
           userData.age &&
           userData.age >= 13 &&
           userData.age <= 120 &&
           userData.termsAccepted === true &&
           userData.privacyAccepted === true &&
           (!userData.marketingEmails || typeof userData.marketingEmails === 'boolean');
  }
}

class OrderProcessor {
  // Complicated shipping eligibility check
  isEligibleForFreeShipping(order) {
    return (order.total >= 50 &&
            order.customer.membershipLevel === 'premium') ||
           (order.total >= 75 &&
            order.customer.membershipLevel === 'standard' &&
            order.customer.ordersThisYear >= 5) ||
           (order.total >= 100 &&
            order.customer.membershipLevel === 'basic' &&
            order.customer.registeredDaysAgo >= 30) ||
           (order.items.some(item => item.category === 'electronics') &&
            order.total >= 200 &&
            order.customer.membershipLevel !== 'basic') ||
           (order.customer.birthday &&
            this.isCustomerBirthdayMonth(order.customer.birthday) &&
            order.total >= 25) ||
           (order.promoCode &&
            (order.promoCode === 'FREESHIP' || order.promoCode === 'FREESHIP2024') &&
            order.total >= 30) ||
           (order.customer.isEmployee &&
            order.customer.employeeDiscount &&
            order.total >= 20);
  }

  // Complex discount calculation logic
  calculateDiscount(order) {
    let discount = 0;
    
    // Extremely complex discount logic
    if ((order.customer.membershipLevel === 'premium' &&
         order.customer.loyaltyPoints >= 1000 &&
         order.total >= 100) ||
        (order.customer.membershipLevel === 'gold' &&
         order.customer.loyaltyPoints >= 500 &&
         order.total >= 75 &&
         order.customer.ordersThisMonth >= 2) ||
        (order.customer.membershipLevel === 'silver' &&
         order.customer.loyaltyPoints >= 250 &&
         order.total >= 50 &&
         order.customer.ordersThisMonth >= 3 &&
         order.customer.averageOrderValue >= 40)) {
      discount += order.total * 0.15; // 15% discount
    }
    
    // More complex conditions
    if (order.items.length >= 5 &&
        order.items.every(item => item.inStock) &&
        order.items.some(item => item.category === 'seasonal') &&
        order.customer.hasReviewed &&
        order.customer.reviewScore >= 4.0 &&
        !order.customer.hasReturnedItem &&
        order.shippingAddress.state === order.customer.homeState) {
      discount += 25; // Fixed $25 discount
    }
    
    return discount;
  }

  // Complex payment validation
  isPaymentValid(payment) {
    return payment &&
           payment.amount &&
           payment.amount > 0 &&
           payment.amount <= 10000 &&
           payment.currency &&
           (payment.currency === 'USD' || payment.currency === 'EUR' || payment.currency === 'GBP') &&
           payment.method &&
           ((payment.method === 'credit_card' &&
             payment.cardNumber &&
             payment.cardNumber.length >= 15 &&
             payment.cardNumber.length <= 16 &&
             /^\d+$/.test(payment.cardNumber) &&
             payment.expiryMonth &&
             payment.expiryMonth >= 1 &&
             payment.expiryMonth <= 12 &&
             payment.expiryYear &&
             payment.expiryYear >= new Date().getFullYear() &&
             payment.expiryYear <= new Date().getFullYear() + 10 &&
             payment.cvv &&
             payment.cvv.length >= 3 &&
             payment.cvv.length <= 4 &&
             /^\d+$/.test(payment.cvv)) ||
            (payment.method === 'paypal' &&
             payment.paypalEmail &&
             payment.paypalEmail.includes('@') &&
             payment.paypalToken &&
             payment.paypalToken.length > 10) ||
            (payment.method === 'bank_transfer' &&
             payment.bankAccount &&
             payment.bankAccount.length >= 8 &&
             payment.bankAccount.length <= 17 &&
             payment.routingNumber &&
             payment.routingNumber.length === 9 &&
             /^\d+$/.test(payment.routingNumber)));
  }

  isCustomerBirthdayMonth(birthday) {
    const birthMonth = new Date(birthday).getMonth();
    const currentMonth = new Date().getMonth();
    return birthMonth === currentMonth;
  }
}

class SecurityValidator {
  // Extremely complex security check
  isSuspiciousActivity(user, action) {
    return (action.type === 'login' &&
            ((user.failedLoginAttempts >= 3 &&
              (new Date() - user.lastFailedLogin) < 15 * 60 * 1000) ||
             (user.loginLocations &&
              user.loginLocations.length > 0 &&
              action.location &&
              !user.loginLocations.includes(action.location) &&
              user.loginLocations.every(loc => this.calculateDistance(loc, action.location) > 1000)) ||
             (action.userAgent &&
              user.knownUserAgents &&
              user.knownUserAgents.length > 0 &&
              !user.knownUserAgents.includes(action.userAgent) &&
              !this.isSimilarUserAgent(action.userAgent, user.knownUserAgents)))) ||
           (action.type === 'money_transfer' &&
            ((action.amount > user.dailyLimit &&
              !user.hasVerifiedIdentity) ||
             (action.amount > user.monthlyLimit * 0.8 &&
              user.accountAge < 30) ||
             (action.recipient &&
              user.transferHistory &&
              !user.transferHistory.some(transfer => transfer.recipient === action.recipient) &&
              action.amount > 1000) ||
             (action.time &&
              (action.time.getHours() < 6 || action.time.getHours() > 22) &&
              action.amount > 500 &&
              !user.nightTimeTransfersEnabled))) ||
           (action.type === 'data_access' &&
            ((action.dataType === 'sensitive' &&
              !user.permissions.includes('sensitive_data_read') &&
              !user.temporaryAccess) ||
             (action.recordCount > 1000 &&
              user.role !== 'admin' &&
              user.role !== 'analyst') ||
             (action.exportFormat &&
              (action.exportFormat === 'csv' || action.exportFormat === 'excel') &&
              user.dataExportCount >= user.monthlyExportLimit)));
  }

  // Complex file upload validation
  isFileUploadAllowed(user, file) {
    return file &&
           file.size > 0 &&
           file.size <= (user.maxFileSize || 10485760) && // 10MB default
           file.name &&
           file.name.length > 0 &&
           file.name.length <= 255 &&
           !file.name.includes('..') &&
           !file.name.includes('/') &&
           !file.name.includes('\\') &&
           file.type &&
           ((user.allowedFileTypes &&
             user.allowedFileTypes.includes(file.type)) ||
            (!user.allowedFileTypes &&
             (file.type.startsWith('image/') ||
              file.type === 'application/pdf' ||
              file.type === 'text/plain' ||
              file.type === 'application/msword' ||
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'))) &&
           (!file.name.match(/\.(exe|bat|cmd|scr|pif|com)$/i)) &&
           ((user.role === 'admin') ||
            (user.role === 'editor' && file.size <= 5242880) || // 5MB for editors
            (user.role === 'user' && file.size <= 2097152 && user.uploadQuotaRemaining > file.size)) && // 2MB for users
           (!user.scanRequired ||
            (user.scanRequired && file.scanned && file.scanResult === 'clean'));
  }

  calculateDistance(location1, location2) {
    // Simplified distance calculation
    return Math.abs(location1.lat - location2.lat) + Math.abs(location1.lng - location2.lng) * 100;
  }

  isSimilarUserAgent(userAgent, knownUserAgents) {
    return knownUserAgents.some(known => 
      userAgent.includes(known.split(' ')[0]) || known.includes(userAgent.split(' ')[0])
    );
  }
}

class ContentFilter {
  // Complex content moderation logic
  shouldModerateContent(content, user) {
    return (content.text &&
            ((content.text.length > 10000 &&
              user.trustLevel < 5) ||
             (this.containsSuspiciousWords(content.text) &&
              user.accountAge < 90) ||
             (this.hasExcessiveCapitalization(content.text) &&
              this.hasExcessivePunctuation(content.text) &&
              user.warningCount > 0) ||
             (content.links &&
              content.links.length > 5 &&
              user.trustLevel < 3) ||
             (content.mentions &&
              content.mentions.length > 10 &&
              user.followerCount < 100))) ||
           (content.images &&
            content.images.length > 0 &&
            ((content.images.length > 10 &&
              user.trustLevel < 4) ||
             (content.images.some(img => !img.alt || img.alt.length === 0) &&
              user.accessibilityWarnings >= 2) ||
             (content.images.some(img => img.size > 5242880) &&
              user.role !== 'premium'))) ||
           (user.recentViolations > 0 &&
            user.recentViolations <= 3 &&
            (new Date() - user.lastViolation) < 7 * 24 * 60 * 60 * 1000) ||
           (user.reportCount >= 5 &&
            user.trustLevel < 7 &&
            (new Date() - user.lastReport) < 30 * 24 * 60 * 60 * 1000);
  }

  containsSuspiciousWords(text) {
    const suspiciousWords = ['spam', 'scam', 'free money', 'click here', 'urgent'];
    return suspiciousWords.some(word => text.toLowerCase().includes(word));
  }

  hasExcessiveCapitalization(text) {
    const uppercaseCount = (text.match(/[A-Z]/g) || []).length;
    return uppercaseCount / text.length > 0.3;
  }

  hasExcessivePunctuation(text) {
    const punctuationCount = (text.match(/[!?]{2,}/g) || []).length;
    return punctuationCount > 3;
  }
}

// Usage examples showing how hard these expressions are to understand
const accessControl = new UserAccessControl();
const orderProcessor = new OrderProcessor();
const securityValidator = new SecurityValidator();
const contentFilter = new ContentFilter();

const user = {
  role: 'admin',
  isActive: true,
  isLocked: false,
  lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  permissions: ['admin_read'],
  requiresTwoFactor: true,
  twoFactorVerified: true,
  ipWhitelist: ['192.168.1.1'],
  currentIP: '192.168.1.1',
  accountType: 'permanent',
  subscriptionStatus: 'active',
  maintenanceMode: false
};

// These boolean expressions are very hard to understand and debug
const canAccess = accessControl.canAccessAdminPanel(user);
console.log('Can access admin panel:', canAccess);

const order = {
  total: 100,
  customer: { membershipLevel: 'premium', ordersThisYear: 3 },
  items: [{ category: 'electronics' }]
};

const freeShipping = orderProcessor.isEligibleForFreeShipping(order);
console.log('Eligible for free shipping:', freeShipping);

console.log('Complex boolean expressions are hard to understand and maintain!');

// Problems with complicated boolean expressions:
// 1. Very difficult to read and understand
// 2. Hard to debug when logic is wrong
// 3. Difficult to test all possible combinations
// 4. Error-prone when making changes
// 5. Makes code reviews challenging
// 6. Reduces maintainability
// 7. Hard to extract and reuse logic
// 8. Can hide business logic
// 9. Makes refactoring risky
// 10. Increases cognitive load for developers