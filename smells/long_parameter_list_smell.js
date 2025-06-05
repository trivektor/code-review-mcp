// Long Parameter List Smell Example
// Functions with too many parameters that are hard to understand and use

class UserRegistrationService {
  // Extremely long parameter list - hard to remember and use
  registerUser(firstName, lastName, middleName, email, password, confirmPassword, 
              phoneNumber, alternatePhone, dateOfBirth, gender, maritalStatus,
              streetAddress, apartmentNumber, city, state, zipCode, country,
              emergencyContactName, emergencyContactPhone, emergencyContactRelation,
              preferredLanguage, timezone, newsletter, promotions, smsNotifications,
              emailNotifications, accountType, referralCode, securityQuestion1,
              securityAnswer1, securityQuestion2, securityAnswer2, termsAccepted,
              privacyPolicyAccepted, marketingConsent, twoFactorEnabled) {
    
    // Validation becomes unwieldy with so many parameters
    if (!firstName || firstName.length < 2) {
      throw new Error('First name must be at least 2 characters');
    }
    if (!lastName || lastName.length < 2) {
      throw new Error('Last name must be at least 2 characters');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Valid email is required');
    }
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error('Valid phone number is required');
    }
    if (!streetAddress) {
      throw new Error('Street address is required');
    }
    if (!city) {
      throw new Error('City is required');
    }
    if (!state) {
      throw new Error('State is required');
    }
    if (!zipCode || zipCode.length < 5) {
      throw new Error('Valid zip code is required');
    }
    if (!termsAccepted) {
      throw new Error('Terms of service must be accepted');
    }
    if (!privacyPolicyAccepted) {
      throw new Error('Privacy policy must be accepted');
    }
    
    const user = {
      id: Date.now(),
      personalInfo: {
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        gender,
        maritalStatus
      },
      contactInfo: {
        email,
        phoneNumber,
        alternatePhone
      },
      address: {
        streetAddress,
        apartmentNumber,
        city,
        state,
        zipCode,
        country
      },
      emergencyContact: {
        name: emergencyContactName,
        phone: emergencyContactPhone,
        relation: emergencyContactRelation
      },
      preferences: {
        preferredLanguage,
        timezone,
        newsletter,
        promotions,
        smsNotifications,
        emailNotifications
      },
      security: {
        password: this.hashPassword(password),
        securityQuestion1,
        securityAnswer1,
        securityQuestion2,
        securityAnswer2,
        twoFactorEnabled
      },
      accountType,
      referralCode,
      marketingConsent,
      createdAt: new Date()
    };
    
    return this.saveUser(user);
  }

  // Another method with too many parameters
  updateUserProfile(userId, firstName, lastName, middleName, email, phoneNumber,
                   alternatePhone, streetAddress, apartmentNumber, city, state,
                   zipCode, country, preferredLanguage, timezone, newsletter,
                   promotions, smsNotifications, emailNotifications, profilePicture,
                   bio, website, linkedinUrl, twitterHandle, facebookUrl,
                   occupation, company, industry, yearsOfExperience) {
    
    const user = this.findUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Updating becomes verbose with many parameters
    if (firstName) user.personalInfo.firstName = firstName;
    if (lastName) user.personalInfo.lastName = lastName;
    if (middleName) user.personalInfo.middleName = middleName;
    if (email) user.contactInfo.email = email;
    if (phoneNumber) user.contactInfo.phoneNumber = phoneNumber;
    if (alternatePhone) user.contactInfo.alternatePhone = alternatePhone;
    if (streetAddress) user.address.streetAddress = streetAddress;
    if (apartmentNumber) user.address.apartmentNumber = apartmentNumber;
    if (city) user.address.city = city;
    if (state) user.address.state = state;
    if (zipCode) user.address.zipCode = zipCode;
    if (country) user.address.country = country;
    if (preferredLanguage) user.preferences.preferredLanguage = preferredLanguage;
    if (timezone) user.preferences.timezone = timezone;
    if (newsletter !== undefined) user.preferences.newsletter = newsletter;
    if (promotions !== undefined) user.preferences.promotions = promotions;
    if (smsNotifications !== undefined) user.preferences.smsNotifications = smsNotifications;
    if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;
    if (profilePicture) user.profile.picture = profilePicture;
    if (bio) user.profile.bio = bio;
    if (website) user.profile.website = website;
    if (linkedinUrl) user.profile.linkedinUrl = linkedinUrl;
    if (twitterHandle) user.profile.twitterHandle = twitterHandle;
    if (facebookUrl) user.profile.facebookUrl = facebookUrl;
    if (occupation) user.professional.occupation = occupation;
    if (company) user.professional.company = company;
    if (industry) user.professional.industry = industry;
    if (yearsOfExperience) user.professional.yearsOfExperience = yearsOfExperience;
    
    return this.saveUser(user);
  }

  hashPassword(password) {
    return 'hashed_' + password;
  }

  findUser(id) {
    return { id, personalInfo: {}, contactInfo: {}, address: {}, preferences: {}, profile: {}, professional: {} };
  }

  saveUser(user) {
    console.log('User saved:', user.id);
    return user;
  }
}

class OrderService {
  // Long parameter list for order creation
  createOrder(customerId, customerEmail, customerName, customerPhone,
             billingStreet, billingCity, billingState, billingZip, billingCountry,
             shippingStreet, shippingCity, shippingState, shippingZip, shippingCountry,
             shippingMethod, shippingSpeed, shippingInstructions,
             paymentMethod, cardNumber, expiryMonth, expiryYear, cvv, cardholderName,
             billingEmail, taxId, discountCode, giftMessage, giftWrap,
             orderNotes, priorityHandling, signatureRequired, insuranceRequired,
             deliveryDate, deliveryTimeSlot, specialInstructions) {
    
    // Method becomes huge just handling all the parameters
    const order = {
      id: Date.now(),
      customer: {
        id: customerId,
        email: customerEmail,
        name: customerName,
        phone: customerPhone
      },
      billing: {
        street: billingStreet,
        city: billingCity,
        state: billingState,
        zip: billingZip,
        country: billingCountry,
        email: billingEmail
      },
      shipping: {
        street: shippingStreet,
        city: shippingCity,
        state: shippingState,
        zip: shippingZip,
        country: shippingCountry,
        method: shippingMethod,
        speed: shippingSpeed,
        instructions: shippingInstructions,
        signatureRequired,
        insuranceRequired,
        deliveryDate,
        deliveryTimeSlot,
        specialInstructions
      },
      payment: {
        method: paymentMethod,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        cardholderName
      },
      options: {
        taxId,
        discountCode,
        giftMessage,
        giftWrap,
        orderNotes,
        priorityHandling
      },
      createdAt: new Date()
    };
    
    return this.processOrder(order);
  }

  // Long parameter list for shipping calculation
  calculateShipping(weight, length, width, height, originStreet, originCity,
                   originState, originZip, originCountry, destStreet, destCity,
                   destState, destZip, destCountry, shippingMethod, shippingSpeed,
                   insurance, signatureRequired, saturdayDelivery, priorityHandling,
                   fragile, hazardous, oversized, value, currency) {
    
    let cost = 0;
    
    // Calculation logic becomes complex with many factors
    const baseRate = this.getBaseRate(shippingMethod);
    const weightCost = weight * 0.5;
    const sizeCost = (length * width * height) * 0.001;
    const distanceCost = this.calculateDistance(
      originCity, originState, originZip, originCountry,
      destCity, destState, destZip, destCountry
    ) * 0.1;
    
    cost = baseRate + weightCost + sizeCost + distanceCost;
    
    if (shippingSpeed === 'express') cost *= 1.5;
    if (shippingSpeed === 'overnight') cost *= 2.0;
    if (insurance) cost += value * 0.01;
    if (signatureRequired) cost += 3.99;
    if (saturdayDelivery) cost += 12.99;
    if (priorityHandling) cost += 7.99;
    if (fragile) cost += 5.99;
    if (hazardous) cost += 25.00;
    if (oversized) cost += 15.99;
    
    return cost;
  }

  processOrder(order) {
    console.log('Processing order:', order.id);
    return order;
  }

  getBaseRate(method) {
    return method === 'ground' ? 5.99 : 9.99;
  }

  calculateDistance(originCity, originState, originZip, originCountry,
                   destCity, destState, destZip, destCountry) {
    return Math.random() * 1000; // Simplified distance calculation
  }
}

class ReportGenerator {
  // Extremely long parameter list for report generation
  generateSalesReport(startYear, startMonth, startDay, endYear, endMonth, endDay,
                     includeProducts, includeCustomers, includeRegions, includeSalespersons,
                     groupByProduct, groupByCustomer, groupByRegion, groupBySalesperson,
                     groupByMonth, groupByQuarter, groupByYear,
                     showQuantities, showRevenue, showProfit, showMargins,
                     showComparisons, showTrends, showForecasts,
                     filterByProductCategory, filterByCustomerType, filterByRegion,
                     filterByMinAmount, filterByMaxAmount,
                     sortByDate, sortByAmount, sortByProduct, sortByCustomer,
                     sortAscending, includeCharts, includeGraphs, includeTables,
                     outputFormat, emailTo, saveToFile, fileName, compress) {
    
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    const reportConfig = {
      dateRange: { start: startDate, end: endDate },
      includes: {
        products: includeProducts,
        customers: includeCustomers,
        regions: includeRegions,
        salespersons: includeSalespersons
      },
      grouping: {
        byProduct: groupByProduct,
        byCustomer: groupByCustomer,
        byRegion: groupByRegion,
        bySalesperson: groupBySalesperson,
        byMonth: groupByMonth,
        byQuarter: groupByQuarter,
        byYear: groupByYear
      },
      metrics: {
        quantities: showQuantities,
        revenue: showRevenue,
        profit: showProfit,
        margins: showMargins,
        comparisons: showComparisons,
        trends: showTrends,
        forecasts: showForecasts
      },
      filters: {
        productCategory: filterByProductCategory,
        customerType: filterByCustomerType,
        region: filterByRegion,
        minAmount: filterByMinAmount,
        maxAmount: filterByMaxAmount
      },
      sorting: {
        byDate: sortByDate,
        byAmount: sortByAmount,
        byProduct: sortByProduct,
        byCustomer: sortByCustomer,
        ascending: sortAscending
      },
      output: {
        charts: includeCharts,
        graphs: includeGraphs,
        tables: includeTables,
        format: outputFormat,
        emailTo,
        saveToFile,
        fileName,
        compress
      }
    };
    
    return this.buildReport(reportConfig);
  }

  buildReport(config) {
    console.log('Building report with config:', Object.keys(config));
    return { reportId: Date.now(), status: 'completed' };
  }
}

class EmailService {
  // Long parameter list for email sending
  sendEmail(toAddress, fromAddress, replyToAddress, ccAddresses, bccAddresses,
           subject, htmlBody, textBody, attachments, priority, deliveryReceipt,
           readReceipt, encryption, digitalSignature, templateId, templateVars,
           sendAt, timezone, retryCount, retryInterval, trackOpens, trackClicks,
           unsubscribeLink, listId, campaignId, tags, customHeaders, messageId,
           inReplyTo, references, autoReply, forwardingRules