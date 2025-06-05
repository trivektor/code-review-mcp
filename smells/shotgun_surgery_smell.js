// Shotgun Surgery Smell Example
// Adding a feature requires changes scattered across many unrelated classes

// Adding a new payment method requires changes in ALL these classes

class PaymentProcessor {
  processPayment(payment) {
    if (payment.type === 'credit_card') {
      return this.processCreditCard(payment);
    } else if (payment.type === 'debit_card') {
      return this.processDebitCard(payment);
    } else if (payment.type === 'paypal') {
      return this.processPayPal(payment);
    }
    // Need to add 'crypto' case here for new payment method
    
    throw new Error('Unsupported payment type');
  }

  processCreditCard(payment) {
    return { success: true, type: 'credit_card' };
  }

  processDebitCard(payment) {
    return { success: true, type: 'debit_card' };
  }

  processPayPal(payment) {
    return { success: true, type: 'paypal' };
  }
  
  // Need to add processCrypto method here
}

class PaymentValidator {
  validatePayment(payment) {
    if (payment.type === 'credit_card') {
      return this.validateCreditCard(payment);
    } else if (payment.type === 'debit_card') {
      return this.validateDebitCard(payment);
    } else if (payment.type === 'paypal') {
      return this.validatePayPal(payment);
    }
    // Need to add 'crypto' validation case here
    
    return false;
  }

  validateCreditCard(payment) {
    return payment.cardNumber && payment.expiry && payment.cvv;
  }

  validateDebitCard(payment) {
    return payment.cardNumber && payment.pin;
  }

  validatePayPal(payment) {
    return payment.email && payment.password;
  }
  
  // Need to add validateCrypto method here
}

class PaymentFeeCalculator {
  calculateFee(payment) {
    if (payment.type === 'credit_card') {
      return payment.amount * 0.029; // 2.9%
    } else if (payment.type === 'debit_card') {
      return payment.amount * 0.015; // 1.5%
    } else if (payment.type === 'paypal') {
      return payment.amount * 0.034; // 3.4%
    }
    // Need to add crypto fee calculation here
    
    return 0;
  }
}

class PaymentLogger {
  logPayment(payment, result) {
    const logEntry = {
      timestamp: new Date(),
      type: payment.type,
      amount: payment.amount,
      success: result.success
    };
    
    if (payment.type === 'credit_card') {
      logEntry.cardType = payment.cardType;
      logEntry.lastFour = payment.cardNumber.slice(-4);
    } else if (payment.type === 'debit_card') {
      logEntry.bank = payment.bank;
      logEntry.lastFour = payment.cardNumber.slice(-4);
    } else if (payment.type === 'paypal') {
      logEntry.paypalAccount = payment.email;
    }
    // Need to add crypto-specific logging here
    
    console.log('Payment logged:', logEntry);
  }
}

class PaymentReporter {
  generatePaymentReport(payments) {
    const report = {
      creditCardCount: 0,
      debitCardCount: 0,
      paypalCount: 0,
      creditCardTotal: 0,
      debitCardTotal: 0,
      paypalTotal: 0
    };
    // Need to add crypto count and total fields
    
    for (let payment of payments) {
      if (payment.type === 'credit_card') {
        report.creditCardCount++;
        report.creditCardTotal += payment.amount;
      } else if (payment.type === 'debit_card') {
        report.debitCardCount++;
        report.debitCardTotal += payment.amount;
      } else if (payment.type === 'paypal') {
        report.paypalCount++;
        report.paypalTotal += payment.amount;
      }
      // Need to add crypto case here
    }
    
    return report;
  }
}

class PaymentUIRenderer {
  renderPaymentForm(paymentType) {
    if (paymentType === 'credit_card') {
      return this.renderCreditCardForm();
    } else if (paymentType === 'debit_card') {
      return this.renderDebitCardForm();
    } else if (paymentType === 'paypal') {
      return this.renderPayPalForm();
    }
    // Need to add crypto form rendering here
    
    return '<div>Unsupported payment type</div>';
  }

  renderCreditCardForm() {
    return '<form>Credit Card Form</form>';
  }

  renderDebitCardForm() {
    return '<form>Debit Card Form</form>';
  }

  renderPayPalForm() {
    return '<form>PayPal Form</form>';
  }
  
  // Need to add renderCryptoForm method here
}

class PaymentEmailService {
  sendPaymentConfirmation(payment, customer) {
    let subject = '';
    let body = '';
    
    if (payment.type === 'credit_card') {
      subject = 'Credit Card Payment Confirmation';
      body = `Your credit card payment of $${payment.amount} has been processed.`;
    } else if (payment.type === 'debit_card') {
      subject = 'Debit Card Payment Confirmation';
      body = `Your debit card payment of $${payment.amount} has been processed.`;
    } else if (payment.type === 'paypal') {
      subject = 'PayPal Payment Confirmation';
      body = `Your PayPal payment of $${payment.amount} has been processed.`;
    }
    // Need to add crypto email template here
    
    this.sendEmail(customer.email, subject, body);
  }

  sendEmail(to, subject, body) {
    console.log(`Sending email to ${to}: ${subject}`);
  }
}

class PaymentAuditService {
  auditPayment(payment) {
    const auditRecord = {
      paymentId: payment.id,
      type: payment.type,
      amount: payment.amount,
      timestamp: new Date(),
      complianceChecks: {}
    };
    
    if (payment.type === 'credit_card') {
      auditRecord.complianceChecks.pciCompliant = true;
      auditRecord.complianceChecks.cvvChecked = !!payment.cvv;
    } else if (payment.type === 'debit_card') {
      auditRecord.complianceChecks.pinVerified = !!payment.pin;
      auditRecord.complianceChecks.bankVerified = !!payment.bank;
    } else if (payment.type === 'paypal') {
      auditRecord.complianceChecks.paypalVerified = true;
    }
    // Need to add crypto compliance checks here
    
    this.saveAuditRecord(auditRecord);
  }

  saveAuditRecord(record) {
    console.log('Audit record saved:', record.paymentId);
  }
}

class PaymentSecurityService {
  checkSecurity(payment) {
    const securityChecks = {
      fraudCheck: false,
      velocityCheck: false,
      amountCheck: false
    };
    
    if (payment.type === 'credit_card') {
      securityChecks.fraudCheck = this.checkCreditCardFraud(payment);
      securityChecks.velocityCheck = this.checkCreditCardVelocity(payment);
    } else if (payment.type === 'debit_card') {
      securityChecks.fraudCheck = this.checkDebitCardFraud(payment);
      securityChecks.velocityCheck = this.checkDebitCardVelocity(payment);
    } else if (payment.type === 'paypal') {
      securityChecks.fraudCheck = this.checkPayPalFraud(payment);
      securityChecks.velocityCheck = this.checkPayPalVelocity(payment);
    }
    // Need to add crypto security checks here
    
    securityChecks.amountCheck = payment.amount < 10000;
    
    return securityChecks;
  }

  checkCreditCardFraud(payment) {
    return Math.random() > 0.1; // 90% pass rate
  }

  checkDebitCardFraud(payment) {
    return Math.random() > 0.05; // 95% pass rate
  }

  checkPayPalFraud(payment) {
    return Math.random() > 0.02; // 98% pass rate
  }

  checkCreditCardVelocity(payment) {
    return true; // Simplified
  }

  checkDebitCardVelocity(payment) {
    return true; // Simplified
  }

  checkPayPalVelocity(payment) {
    return true; // Simplified
  }
  
  // Need to add crypto security methods here
}

class PaymentRefundService {
  processRefund(originalPayment, refundAmount) {
    if (originalPayment.type === 'credit_card') {
      return this.refundCreditCard(originalPayment, refundAmount);
    } else if (originalPayment.type === 'debit_card') {
      return this.refundDebitCard(originalPayment, refundAmount);
    } else if (originalPayment.type === 'paypal') {
      return this.refundPayPal(originalPayment, refundAmount);
    }
    // Need to add crypto refund case here
    
    throw new Error('Refund not supported for this payment type');
  }

  refundCreditCard(payment, amount) {
    return { success: true, refundId: 'cc_refund_' + Date.now() };
  }

  refundDebitCard(payment, amount) {
    return { success: true, refundId: 'db_refund_' + Date.now() };
  }

  refundPayPal(payment, amount) {
    return { success: true, refundId: 'pp_refund_' + Date.now() };
  }
  
  // Need to add refundCrypto method here
}

class PaymentConfigurationService {
  getPaymentConfig(paymentType) {
    const configs = {
      credit_card: {
        enabled: true,
        minAmount: 1.00,
        maxAmount: 10000.00,
        currencies: ['USD', 'EUR', 'GBP']
      },
      debit_card: {
        enabled: true,
        minAmount: 1.00,
        maxAmount: 5000.00,
        currencies: ['USD', 'EUR']
      },
      paypal: {
        enabled: true,
        minAmount: 5.00,
        maxAmount: 25000.00,
        currencies: ['USD', 'EUR', 'GBP', 'CAD']
      }
      // Need to add crypto configuration here
    };
    
    return configs[paymentType] || { enabled: false };
  }
}

// Usage demonstrating the shotgun surgery problem
const paymentProcessor = new PaymentProcessor();
const paymentValidator = new PaymentValidator();
const feeCalculator = new PaymentFeeCalculator();
const paymentLogger = new PaymentLogger();
const paymentReporter = new PaymentReporter();
const uiRenderer = new PaymentUIRenderer();
const emailService = new PaymentEmailService();
const auditService = new PaymentAuditService();
const securityService = new PaymentSecurityService();
const refundService = new PaymentRefundService();
const configService = new PaymentConfigurationService();

const creditCardPayment = {
  id: 'pay_123',
  type: 'credit_card',
  amount: 100.00,
  cardNumber: '1234567812345678',
  expiry: '12/25',
  cvv: '123'
};

// All these services work with the existing payment types
const isValid = paymentValidator.validatePayment(creditCardPayment);
const fee = feeCalculator.calculateFee(creditCardPayment);
const result = paymentProcessor.processPayment(creditCardPayment);
const form = uiRenderer.renderPaymentForm('credit_card');

console.log('Payment processed with existing types');

// To add a new payment method like 'crypto', we would need to:
// 1. Add crypto case to PaymentProcessor.processPayment()
// 2. Add crypto case to PaymentValidator.validatePayment()
// 3. Add crypto case to PaymentFeeCalculator.calculateFee()
// 4. Add crypto case to PaymentLogger.logPayment()
// 5. Add crypto fields to PaymentReporter.generatePaymentReport()
// 6. Add crypto case to PaymentUIRenderer.renderPaymentForm()
// 7. Add crypto case to PaymentEmailService.sendPaymentConfirmation()
// 8. Add crypto case to PaymentAuditService.auditPayment()
// 9. Add crypto case to PaymentSecurityService.checkSecurity()
// 10. Add crypto case to PaymentRefundService.processRefund()
// 11. Add crypto config to PaymentConfigurationService.getPaymentConfig()

// This requires changing 11 different classes for one new feature!

console.log('Adding crypto payments would require changes in 11+ classes!');

// Problems with shotgun surgery:
// 1. Single feature change requires modifying many classes
// 2. Easy to miss updating one of the classes
// 3. High risk of introducing bugs
// 4. Makes testing more complex
// 5. Increases development time
// 6. Makes code reviews more difficult
// 7. Violates Open/Closed Principle
// 8. Creates tight coupling between unrelated classes
// 9. Makes the system fragile and hard to maintain
// 10. Requires extensive regression testing