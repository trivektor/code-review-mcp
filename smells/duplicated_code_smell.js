// Duplicated Code Smell Example
// Notice how similar logic is repeated throughout the file

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Tax calculation duplicated in multiple places
  calculateProductTax(price) {
    const taxRate = 0.08;
    return price * taxRate;
  }

  calculateServiceTax(price) {
    const taxRate = 0.08;
    return price * taxRate;
  }

  calculateShippingTax(price) {
    const taxRate = 0.08;
    return price * taxRate;
  }

  // Validation logic duplicated
  validateProductData(product) {
    if (!product.name || product.name.trim() === '') {
      throw new Error('Product name is required');
    }
    if (!product.price || product.price <= 0) {
      throw new Error('Product price must be positive');
    }
    if (!product.id || product.id.trim() === '') {
      throw new Error('Product ID is required');
    }
  }

  validateServiceData(service) {
    if (!service.name || service.name.trim() === '') {
      throw new Error('Service name is required');
    }
    if (!service.price || service.price <= 0) {
      throw new Error('Service price must be positive');
    }
    if (!service.id || service.id.trim() === '') {
      throw new Error('Service ID is required');
    }
  }

  // Discount calculation duplicated
  calculateMemberDiscount(price) {
    if (price > 100) {
      return price * 0.1;
    } else if (price > 50) {
      return price * 0.05;
    }
    return 0;
  }

  calculateVIPDiscount(price) {
    if (price > 100) {
      return price * 0.15; // Different rate but same structure
    } else if (price > 50) {
      return price * 0.08;
    }
    return 0;
  }

  calculateEmployeeDiscount(price) {
    if (price > 100) {
      return price * 0.2;
    } else if (price > 50) {
      return price * 0.1;
    }
    return 0;
  }

  // Email formatting duplicated
  sendOrderConfirmation(customerEmail, orderDetails) {
    const subject = `Order Confirmation - ${orderDetails.id}`;
    const body = `
      Dear Customer,
      
      Your order has been confirmed.
      Order ID: ${orderDetails.id}
      Total: $${orderDetails.total}
      
      Thank you for your business!
    `;
    
    // Simulate sending email
    console.log(`Sending to: ${customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }

  sendShippingNotification(customerEmail, orderDetails) {
    const subject = `Shipping Update - ${orderDetails.id}`;
    const body = `
      Dear Customer,
      
      Your order has been shipped.
      Order ID: ${orderDetails.id}
      Tracking: ${orderDetails.tracking}
      
      Thank you for your business!
    `;
    
    // Simulate sending email
    console.log(`Sending to: ${customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }

  sendDeliveryConfirmation(customerEmail, orderDetails) {
    const subject = `Delivery Confirmation - ${orderDetails.id}`;
    const body = `
      Dear Customer,
      
      Your order has been delivered.
      Order ID: ${orderDetails.id}
      Delivered at: ${orderDetails.deliveryTime}
      
      Thank you for your business!
    `;
    
    // Simulate sending email
    console.log(`Sending to: ${customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  }
}

class OrderProcessor {
  // More duplicated tax calculation
  processOrderTotal(items) {
    let total = 0;
    for (let item of items) {
      total += item.price;
      const taxRate = 0.08; // Same tax calculation again
      total += item.price * taxRate;
    }
    return total;
  }

  // Similar processing logic duplicated
  processOnlineOrder(order) {
    console.log('Processing online order...');
    
    // Validation
    if (!order.customer || !order.customer.email) {
      throw new Error('Customer email required');
    }
    if (!order.items || order.items.length === 0) {
      throw new Error('Order must have items');
    }
    
    // Calculate total
    let total = 0;
    for (let item of order.items) {
      total += item.price;
    }
    
    // Apply tax
    const tax = total * 0.08;
    total += tax;
    
    order.total = total;
    console.log(`Order processed: $${total}`);
    return order;
  }

  processPhoneOrder(order) {
    console.log('Processing phone order...');
    
    // Same validation
    if (!order.customer || !order.customer.email) {
      throw new Error('Customer email required');
    }
    if (!order.items || order.items.length === 0) {
      throw new Error('Order must have items');
    }
    
    // Same calculation
    let total = 0;
    for (let item of order.items) {
      total += item.price;
    }
    
    // Same tax
    const tax = total * 0.08;
    total += tax;
    
    order.total = total;
    console.log(`Order processed: $${total}`);
    return order;
  }

  processInStoreOrder(order) {
    console.log('Processing in-store order...');
    
    // Same validation again
    if (!order.customer || !order.customer.email) {
      throw new Error('Customer email required');
    }
    if (!order.items || order.items.length === 0) {
      throw new Error('Order must have items');
    }
    
    // Same calculation again
    let total = 0;
    for (let item of order.items) {
      total += item.price;
    }
    
    // Same tax again
    const tax = total * 0.08;
    total += tax;
    
    order.total = total;
    console.log(`Order processed: $${total}`);
    return order;
  }
}

// Usage showing the duplication in action
const cart = new ShoppingCart();
const processor = new OrderProcessor();

// All these do essentially the same thing with different names
console.log(cart.calculateProductTax(100));
console.log(cart.calculateServiceTax(100));
console.log(cart.calculateShippingTax(100));

// All these have nearly identical logic
console.log(cart.calculateMemberDiscount(120));
console.log(cart.calculateVIPDiscount(120));
console.log(cart.calculateEmployeeDiscount(120));