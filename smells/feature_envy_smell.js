// Feature Envy Smell Example
// Methods that are more interested in other classes than their own

class Customer {
  constructor(name, email, address, phone) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.membershipLevel = 'basic';
    this.joinDate = new Date();
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getAddress() {
    return this.address;
  }

  getPhone() {
    return this.phone;
  }

  getMembershipLevel() {
    return this.membershipLevel;
  }

  setMembershipLevel(level) {
    this.membershipLevel = level;
  }
}

class Address {
  constructor(street, city, state, zipCode, country) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }

  getStreet() {
    return this.street;
  }

  getCity() {
    return this.city;
  }

  getState() {
    return this.state;
  }

  getZipCode() {
    return this.zipCode;
  }

  getCountry() {
    return this.country;
  }
}

class Order {
  constructor(customer, items) {
    this.customer = customer;
    this.items = items;
    this.id = Date.now();
    this.createdAt = new Date();
  }

  // Feature Envy: This method is more interested in Customer than Order
  getCustomerDisplayInfo() {
    // Accessing customer data extensively
    const customerName = this.customer.getName();
    const customerEmail = this.customer.getEmail();
    const customerAddress = this.customer.getAddress();
    const customerPhone = this.customer.getPhone();
    const membershipLevel = this.customer.getMembershipLevel();
    
    // Building display string using customer data
    return `Customer: ${customerName} (${membershipLevel})
            Email: ${customerEmail}
            Phone: ${customerPhone}
            Address: ${customerAddress.getStreet()}, ${customerAddress.getCity()}, ${customerAddress.getState()} ${customerAddress.getZipCode()}`;
  }

  // Feature Envy: Calculating shipping based on customer address
  calculateShippingCost() {
    const address = this.customer.getAddress();
    const state = address.getState();
    const zipCode = address.getZipCode();
    const country = address.getCountry();
    
    // Logic that belongs more to Address or ShippingCalculator
    let baseCost = 10;
    
    if (country !== 'USA') {
      baseCost += 15; // International shipping
    }
    
    // State-specific logic
    if (state === 'CA' || state === 'NY') {
      baseCost += 5; // High cost states
    }
    
    // Zip code specific logic
    const firstDigit = parseInt(zipCode.charAt(0));
    if (firstDigit >= 9) {
      baseCost += 3; // West coast premium
    }
    
    return baseCost;
  }

  // Feature Envy: Extensive use of customer data for tax calculation
  calculateTax() {
    const address = this.customer.getAddress();
    const state = address.getState();
    const city = address.getCity();
    const zipCode = address.getZipCode();
    
    // Tax logic that depends heavily on address data
    let taxRate = 0;
    
    switch (state) {
      case 'CA':
        taxRate = 0.0725;
        if (city === 'Los Angeles') taxRate += 0.01;
        if (city === 'San Francisco') taxRate += 0.0125;
        break;
      case 'NY':
        taxRate = 0.08;
        if (city === 'New York City') taxRate += 0.045;
        break;
      case 'TX':
        taxRate = 0.0625;
        break;
      case 'FL':
        taxRate = 0.06;
        break;
      default:
        taxRate = 0.05;
    }
    
    // Special zip code adjustments
    if (zipCode.startsWith('90210')) {
      taxRate += 0.005; // Luxury area
    }
    
    const subtotal = this.calculateSubtotal();
    return subtotal * taxRate;
  }

  calculateSubtotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

class Invoice {
  constructor(order) {
    this.order = order;
    this.id = Date.now();
    this.generatedAt = new Date();
  }

  // Feature Envy: More interested in Order and Customer than Invoice
  generateInvoiceHeader() {
    const customer = this.order.customer;
    const address = customer.getAddress();
    
    // Extensive use of other objects' data
    return `
INVOICE #${this.id}
Date: ${this.generatedAt.toDateString()}

Bill To:
${customer.getName()}
${address.getStreet()}
${address.getCity()}, ${address.getState()} ${address.getZipCode()}
${address.getCountry()}

Email: ${customer.getEmail()}
Phone: ${customer.getPhone()}
Customer Level: ${customer.getMembershipLevel()}

Order #: ${this.order.id}
Order Date: ${this.order.createdAt.toDateString()}
    `;
  }

  // Feature Envy: Doing calculations that belong to Order
  generateInvoiceBody() {
    const items = this.order.items;
    let body = 'Items:\n';
    
    // Working extensively with order data
    for (let item of items) {
      body += `${item.name} - Qty: ${item.quantity} x $${item.price} = $${item.price * item.quantity}\n`;
    }
    
    const subtotal = this.order.calculateSubtotal();
    const tax = this.order.calculateTax();
    const shipping = this.order.calculateShippingCost();
    const total = subtotal + tax + shipping;
    
    body += `\nSubtotal: $${subtotal.toFixed(2)}`;
    body += `\nTax: $${tax.toFixed(2)}`;
    body += `\nShipping: $${shipping.toFixed(2)}`;
    body += `\nTotal: $${total.toFixed(2)}`;
    
    return body;
  }
}

class EmailService {
  // Feature Envy: More interested in Customer data than email sending
  sendWelcomeEmail(customer) {
    const name = customer.getName();
    const email = customer.getEmail();
    const address = customer.getAddress();
    const membershipLevel = customer.getMembershipLevel();
    const joinDate = customer.joinDate;
    
    // Building email content using extensive customer data
    const subject = `Welcome ${name}!`;
    const body = `
Dear ${name},

Welcome to our service! We're excited to have you as a ${membershipLevel} member.

Your account details:
- Email: ${email}
- Membership Level: ${membershipLevel}
- Join Date: ${joinDate.toDateString()}

Your registered address:
${address.getStreet()}
${address.getCity()}, ${address.getState()} ${address.getZipCode()}
${address.getCountry()}

Thank you for joining us!
    `;
    
    // Actual email sending logic is minimal
    console.log(`Sending email to: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }

  // Feature Envy: Working extensively with order data
  sendOrderConfirmation(order) {
    const customer = order.customer;
    const customerName = customer.getName();
    const customerEmail = customer.getEmail();
    const address = customer.getAddress();
    
    // Duplicating order display logic
    let itemsList = '';
    for (let item of order.items) {
      itemsList += `- ${item.name}: ${item.quantity} x $${item.price}\n`;
    }
    
    const subtotal = order.calculateSubtotal();
    const tax = order.calculateTax();
    const shipping = order.calculateShippingCost();
    const total = subtotal + tax + shipping;
    
    const subject = `Order Confirmation #${order.id}`;
    const body = `
Dear ${customerName},

Your order has been confirmed!

Order #: ${order.id}
Order Date: ${order.createdAt.toDateString()}

Items:
${itemsList}

Shipping Address:
${address.getStreet()}
${address.getCity()}, ${address.getState()} ${address.getZipCode()}

Order Summary:
Subtotal: $${subtotal.toFixed(2)}
Tax: $${tax.toFixed(2)}
Shipping: $${shipping.toFixed(2)}
Total: $${total.toFixed(2)}

Thank you for your order!
    `;
    
    console.log(`Sending confirmation to: ${customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }
}

class ReportGenerator {
  // Feature Envy: More interested in Customer and Order data
  generateCustomerReport(customer, orders) {
    const name = customer.getName();
    const email = customer.getEmail();
    const membershipLevel = customer.getMembershipLevel();
    const address = customer.getAddress();
    
    // Extensive manipulation of customer data
    let report = `Customer Report for ${name}\n`;
    report += `Email: ${email}\n`;
    report += `Membership: ${membershipLevel}\n`;
    report += `Location: ${address.getCity()}, ${address.getState()}\n\n`;
    
    // Working extensively with order data
    let t