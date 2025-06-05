// Data Clump Smell Example
// Same group of data items passed around together repeatedly

class CustomerService {
  constructor() {
    this.customers = [];
  }

  // Address data clump - always passed together
  createCustomer(name, email, street, city, state, zipCode, country) {
    const customer = {
      id: Date.now(),
      name,
      email,
      // Address fields always appear together
      street,
      city,
      state,
      zipCode,
      country,
      createdAt: new Date()
    };
    
    this.customers.push(customer);
    return customer;
  }

  // Same address data clump repeated
  updateCustomerAddress(customerId, street, city, state, zipCode, country) {
    const customer = this.findCustomer(customerId);
    if (customer) {
      // Same group of address fields
      customer.street = street;
      customer.city = city;
      customer.state = state;
      customer.zipCode = zipCode;
      customer.country = country;
    }
    return customer;
  }

  // Contact info data clump
  updateContactInfo(customerId, email, phone, fax, mobile) {
    const customer = this.findCustomer(customerId);
    if (customer) {
      // These contact fields always appear together
      customer.email = email;
      customer.phone = phone;
      customer.fax = fax;
      customer.mobile = mobile;
    }
    return customer;
  }

  // Date range data clump - always passed together
  getCustomersByDateRange(startYear, startMonth, startDay, endYear, endMonth, endDay) {
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    return this.customers.filter(customer => 
      customer.createdAt >= startDate && customer.createdAt <= endDate
    );
  }

  findCustomer(id) {
    return this.customers.find(c => c.id === id);
  }
}

class OrderService {
  constructor() {
    this.orders = [];
  }

  // Billing address data clump
  createOrder(customerId, billingStreet, billingCity, billingState, billingZip, billingCountry,
              shippingStreet, shippingCity, shippingState, shippingZip, shippingCountry, items) {
    const order = {
      id: Date.now(),
      customerId,
      // Billing address clump
      billingStreet,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      // Shipping address clump (same structure)
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      items,
      createdAt: new Date()
    };
    
    this.orders.push(order);
    return order;
  }

  // Payment info data clump
  processPayment(orderId, cardNumber, expiryMonth, expiryYear, cvv, cardholderName) {
    const order = this.findOrder(orderId);
    if (!order) return null;
    
    // These payment fields always appear together
    const paymentInfo = {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      cardholderName,
      processedAt: new Date()
    };
    
    order.payment = paymentInfo;
    return this.submitPayment(paymentInfo);
  }

  // Shipping calculation with address data clump
  calculateShipping(street, city, state, zipCode, country, weight, dimensions) {
    // Address fields always used together for shipping
    const shippingZone = this.determineShippingZone(state, country);
    const distance = this.calculateDistance(city, state, zipCode);
    
    let cost = 0;
    if (country !== 'USA') {
      cost += 15; // International fee
    }
    
    cost += weight * 0.5;
    cost += distance * 0.1;
    
    return cost;
  }

  // Time period data clump for reports
  generateOrderReport(startYear, startMonth, startDay, endYear, endMonth, endDay, 
                     reportType, includeDetails) {
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    const ordersInRange = this.orders.filter(order => 
      order.createdAt >= startDate && order.createdAt <= endDate
    );
    
    return this.formatReport(ordersInRange, reportType, includeDetails);
  }

  findOrder(id) {
    return this.orders.find(o => o.id === id);
  }

  submitPayment(paymentInfo) {
    return { success: true, transactionId: 'txn_' + Date.now() };
  }

  determineShippingZone(state, country) {
    return country === 'USA' ? 'domestic' : 'international';
  }

  calculateDistance(city, state, zipCode) {
    return Math.random() * 1000; // Simplified distance calculation
  }

  formatReport(orders, type, details) {
    return { type, orderCount: orders.length, includesDetails: details };
  }
}

class EmployeeService {
  constructor() {
    this.employees = [];
  }

  // Personal info data clump
  createEmployee(firstName, lastName, middleName, suffix, socialSecurityNumber,
                street, city, state, zipCode, country,
                homePhone, workPhone, mobile, email) {
    const employee = {
      id: Date.now(),
      // Name fields always together
      firstName,
      lastName,
      middleName,
      suffix,
      socialSecurityNumber,
      // Address fields always together
      street,
      city,
      state,
      zipCode,
      country,
      // Contact fields always together
      homePhone,
      workPhone,
      mobile,
      email,
      createdAt: new Date()
    };
    
    this.employees.push(employee);
    return employee;
  }

  // Salary data clump
  updateSalary(employeeId, baseSalary, bonus, commission, overtime, benefits) {
    const employee = this.findEmployee(employeeId);
    if (employee) {
      // These compensation fields always appear together
      employee.baseSalary = baseSalary;
      employee.bonus = bonus;
      employee.commission = commission;
      employee.overtime = overtime;
      employee.benefits = benefits;
      employee.totalCompensation = baseSalary + bonus + commission + overtime + benefits;
    }
    return employee;
  }

  // Work schedule data clump
  setWorkSchedule(employeeId, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd,
                 wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd,
                 fridayStart, fridayEnd) {
    const employee = this.findEmployee(employeeId);
    if (employee) {
      // Schedule fields always passed together
      employee.schedule = {
        monday: { start: mondayStart, end: mondayEnd },
        tuesday: { start: tuesdayStart, end: tuesdayEnd },
        wednesday: { start: wednesdayStart, end: wednesdayEnd },
        thursday: { start: thursdayStart, end: thursdayEnd },
        friday: { start: fridayStart, end: fridayEnd }
      };
    }
    return employee;
  }

  findEmployee(id) {
    return this.employees.find(e => e.id === id);
  }
}

class ProductService {
  constructor() {
    this.products = [];
  }

  // Product dimensions data clump
  createProduct(name, description, price, length, width, height, weight, 
               category, sku, brand) {
    const product = {
      id: Date.now(),
      name,
      description,
      price,
      // Dimension fields always together
      length,
      width,
      height,
      weight,
      category,
      sku,
      brand,
      createdAt: new Date()
    };
    
    this.products.push(product);
    return product;
  }

  // Pricing data clump
  updatePricing(productId, basePrice, discount, tax, shipping, handling) {
    const product = this.findProduct(productId);
    if (product) {
      // Price-related fields always appear together
      product.basePrice = basePrice;
      product.discount = discount;
      product.tax = tax;
      product.shipping = shipping;
      product.handling = handling;
      product.finalPrice = basePrice - discount + tax + shipping + handling;
    }
    return product;
  }

  // Color specification data clump
  setProductColors(productId, red, green, blue, alpha, hexCode, colorName) {
    const product = this.findProduct(productId);
    if (product) {
      // Color fields always used together
      product.color = {
        red,
        green,
        blue,
        alpha,
        hexCode,
        colorName
      };
    }
    return product;
  }

  // Search parameters data clump
  searchProducts(minPrice, maxPrice, minRating, maxRating, 
                inStock, category, brand, sortBy, sortDirection) {
    return this.products.filter(product => {
      // Price range fields always used together
      const priceInRange = product.price >= minPrice && product.price <= maxPrice;
      // Rating range fields always used together
      const ratingInRange = (product.rating || 0) >= minRating && (product.rating || 0) <= maxRating;
      
      return priceInRange && ratingInRange;
    });
  }

  findProduct(id) {
    return this.products.find(p => p.id === id);
  }
}

class EventService {
  constructor() {
    this.events = [];
  }

  // Date/time data clump
  createEvent(name, description, 
             startYear, startMonth, startDay, startHour, startMinute,
             endYear, endMonth, endDay, endHour, endMinute,
             location) {
    const event = {
      id: Date.now(),
      name,
      description,
      // Start date/time fields always together
      startDate: new Date(startYear, startMonth - 1, startDay, startHour, startMinute),
      // End date/time fields always together  
      endDate: new Date(endYear, endMonth - 1, endDay, endHour, endMinute),
      location,
      createdAt: new Date()
    };
    
    this.events.push(event);
    return event;
  }

  // Location data clump
  updateEventLocation(eventId, venueName, street, city, state, zipCode, 
                     country, roomNumber, floor) {
    const event = this.findEvent(eventId);
    if (event) {
      // Location fields always appear together
      event.location = {
        venueName,
        street,
        city,
        state,
        zipCode,
        country,
        roomNumber,
        floor
      };
    }
    return event;
  }

  findEvent(id) {
    return this.events.find(e => e.id === id);
  }
}

// Usage examples showing data clumps in action
const customerService = new CustomerService();
const orderService = new OrderService();
const employeeService = new EmployeeService();
const productService = new ProductService();
const eventService = new EventService();

// Address data always passed together
const customer = customerService.createCustomer(
  'John Doe',
  'john@example.com',
  '123 Main St',  // street
  'Anytown',      // city
  'CA',           // state
  '90210',        // zipCode
  'USA'           // country
);

// Same address data clump when updating
customerService.updateCustomerAddress(
  customer.id,
  '456 Oak Ave',  // street
  'Somewhere',    // city
  'NY',           // state
  '10001',        // zipCode
  'USA'           // country
);

// Date range always passed as separate parameters
const recentCustomers = customerService.getCustomersByDateRange(
  2023, 1, 1,   // start date
  2023, 12, 31  // end date
);

// Multiple address clumps for billing and shipping
const order = orderService.createOrder(
  customer.id,
  '123 Main St', 'Anytown', 'CA', '90210', 'USA',  // billing address
  '456 Oak Ave', 'Somewhere', 'NY', '10001', 'USA', // shipping address
  [{ id: 1, name: 'Product A', price: 29.99 }]
);

// Payment info data clump
orderService.processPayment(
  order.id,
  '4111111111111111', // cardNumber
  12,                 // expiryMonth
  2025,              // expiryYear
  '123',             // cvv
  'John Doe'         // cardholderName
);

console.log('Data clumps make method signatures very long and confusing!');

// Problems with data clumps:
// 1. Long parameter lists are hard to remember and use
// 2. Easy to pass parameters in wrong order
// 3. Same data validation repeated everywhere
// 4. Changes require updating many method signatures
// 5. No semantic grouping of related data
// 6. Difficult to add new related fields
// 7. Code duplication for data handling
// 8. Methods become harder to test