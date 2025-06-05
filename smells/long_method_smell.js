// Long Method Smell Example
// This method is doing way too many things and is hard to understand

class OrderProcessor {
  processCompleteOrder(orderData) {
    // This method is over 100 lines and does everything
    console.log('Starting order processing...');
    
    // Validation section (should be extracted)
    if (!orderData) {
      throw new Error('Order data is required');
    }
    
    if (!orderData.customer) {
      throw new Error('Customer information is required');
    }
    
    if (!orderData.customer.email || !orderData.customer.email.includes('@')) {
      throw new Error('Valid customer email is required');
    }
    
    if (!orderData.customer.name || orderData.customer.name.trim().length < 2) {
      throw new Error('Customer name must be at least 2 characters');
    }
    
    if (!orderData.customer.address || !orderData.customer.address.street) {
      throw new Error('Customer address is required');
    }
    
    if (!orderData.customer.address.city || !orderData.customer.address.zipCode) {
      throw new Error('Complete address with city and zip code is required');
    }
    
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }
    
    // Validate each item
    for (let i = 0; i < orderData.items.length; i++) {
      if (!orderData.items[i].id) {
        throw new Error(`Item ${i + 1} must have an ID`);
      }
      if (!orderData.items[i].name) {
        throw new Error(`Item ${i + 1} must have a name`);
      }
      if (!orderData.items[i].price || orderData.items[i].price <= 0) {
        throw new Error(`Item ${i + 1} must have a valid price`);
      }
      if (!orderData.items[i].quantity || orderData.items[i].quantity <= 0) {
        throw new Error(`Item ${i + 1} must have a valid quantity`);
      }
    }
    
    // Inventory checking section (should be extracted)
    console.log('Checking inventory...');
    const inventoryIssues = [];
    
    for (let item of orderData.items) {
      // Simulate inventory check
      const currentStock = Math.floor(Math.random() * 100);
      if (currentStock < item.quantity) {
        inventoryIssues.push({
          itemId: item.id,
          requested: item.quantity,
          available: currentStock
        });
      }
    }
    
    if (inventoryIssues.length > 0) {
      console.log('Inventory issues found:', inventoryIssues);
      // Handle backorder logic
      for (let issue of inventoryIssues) {
        console.log(`Item ${issue.itemId}: Only ${issue.available} available, ${issue.requested} requested`);
        // Check if backorder is allowed
        if (orderData.allowBackorder) {
          console.log(`Creating backorder for ${issue.requested - issue.available} units`);
        } else {
          throw new Error(`Insufficient inventory for item ${issue.itemId}`);
        }
      }
    }
    
    // Price calculation section (should be extracted)
    console.log('Calculating prices...');
    let subtotal = 0;
    let totalWeight = 0;
    
    for (let item of orderData.items) {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      // Calculate weight for shipping
      const itemWeight = item.weight || 1; // Default weight
      totalWeight += itemWeight * item.quantity;
      
      console.log(`Item: ${item.name}, Qty: ${item.quantity}, Price: $${item.price}, Total: $${itemTotal}`);
    }
    
    // Tax calculation
    let taxRate = 0.08; // Default tax rate
    
    // State-specific tax rates
    switch (orderData.customer.address.state) {
      case 'CA':
        taxRate = 0.095;
        break;
      case 'NY':
        taxRate = 0.085;
        break;
      case 'TX':
        taxRate = 0.0625;
        break;
      case 'FL':
        taxRate = 0.06;
        break;
      default:
        taxRate = 0.08;
    }
    
    const taxAmount = subtotal * taxRate;
    
    // Discount calculation section (should be extracted)
    console.log('Applying discounts...');
    let discountAmount = 0;
    
    // Customer tier discounts
    if (orderData.customer.tier === 'VIP') {
      discountAmount += subtotal * 0.15;
      console.log('VIP discount applied: 15%');
    } else if (orderData.customer.tier === 'Premium') {
      discountAmount += subtotal * 0.10;
      console.log('Premium discount applied: 10%');
    } else if (orderData.customer.tier === 'Member') {
      discountAmount += subtotal * 0.05;
      console.log('Member discount applied: 5%');
    }
    
    // Volume discounts
    if (subtotal > 500) {
      const volumeDiscount = subtotal * 0.02;
      discountAmount += volumeDiscount;
      console.log(`Volume discount applied: $${volumeDiscount}`);
    }
    
    // Promotional codes
    if (orderData.promoCode) {
      switch (orderData.promoCode.toUpperCase()) {
        case 'SAVE10':
          discountAmount += subtotal * 0.10;
          console.log('Promo code SAVE10 applied: 10% off');
          break;
        case 'SAVE20':
          discountAmount += subtotal * 0.20;
          console.log('Promo code SAVE20 applied: 20% off');
          break;
        case 'NEWCUSTOMER':
          if (orderData.customer.isNewCustomer) {
            discountAmount += subtotal * 0.15;
            console.log('New customer promo applied: 15% off');
          }
          break;
        default:
          console.log('Invalid promo code');
      }
    }
    
    // Shipping calculation section (should be extracted)
    console.log('Calculating shipping...');
    let shippingCost = 0;
    
    if (orderData.shippingMethod === 'express') {
      shippingCost = Math.max(15, totalWeight * 3);
    } else if (orderData.shippingMethod === 'overnight') {
      shippingCost = Math.max(25, totalWeight * 5);
    } else {
      // Standard shipping
      if (totalWeight <= 1) {
        shippingCost = 5;
      } else if (totalWeight <= 5) {
        shippingCost = 8;
      } else if (totalWeight <= 10) {
        shippingCost = 12;
      } else {
        shippingCost = 15 + (totalWeight - 10) * 1.5;
      }
    }
    
    // Free shipping promotion
    if (subtotal > 100 && orderData.customer.tier !== 'Basic') {
      shippingCost = 0;
      console.log('Free shipping applied');
    }
    
    // Payment processing section (should be extra