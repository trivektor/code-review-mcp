// Callback Hell Smell Example
// Deeply nested callbacks that create pyramid of doom

class DataProcessor {
  // Classic callback hell - pyramid of doom
  processUserOrder(userId, callback) {
    // First level - get user
    this.getUser(userId, (userError, user) => {
      if (userError) {
        return callback(userError);
      }
      
      // Second level - validate user
      this.validateUser(user, (validationError, isValid) => {
        if (validationError) {
          return callback(validationError);
        }
        
        if (!isValid) {
          return callback(new Error('User validation failed'));
        }
        
        // Third level - get user's cart
        this.getUserCart(userId, (cartError, cart) => {
          if (cartError) {
            return callback(cartError);
          }
          
          // Fourth level - validate cart items
          this.validateCartItems(cart.items, (itemValidationError, validItems) => {
            if (itemValidationError) {
              return callback(itemValidationError);
            }
            
            // Fifth level - calculate prices
            this.calculatePrices(validItems, (priceError, pricing) => {
              if (priceError) {
                return callback(priceError);
              }
              
              // Sixth level - apply discounts
              this.applyDiscounts(user, pricing, (discountError, finalPricing) => {
                if (discountError) {
                  return callback(discountError);
                }
                
                // Seventh level - process payment
                this.processPayment(user.paymentMethod, finalPricing.total, (paymentError, paymentResult) => {
                  if (paymentError) {
                    return callback(paymentError);
                  }
                  
                  // Eighth level - update inventory
                  this.updateInventory(validItems, (inventoryError, inventoryResult) => {
                    if (inventoryError) {
                      return callback(inventoryError);
                    }
                    
                    // Ninth level - create order record
                    this.createOrderRecord(user, validItems, finalPricing, paymentResult, (orderError, order) => {
                      if (orderError) {
                        return callback(orderError);
                      }
                      
                      // Tenth level - send confirmation email
                      this.sendConfirmationEmail(user.email, order, (emailError, emailResult) => {
                        if (emailError) {
                          return callback(emailError);
                        }
                        
                        // Eleventh level - log the transaction
                        this.logTransaction(order.id, user.id, (logError, logResult) => {
                          if (logError) {
                            return callback(logError);
                          }
                          
                          // Finally return success
                          callback(null, {
                            order: order,
                            payment: paymentResult,
                            email: emailResult,
                            log: logResult
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  // Another callback hell example - file processing
  processFileUpload(file, userId, callback) {
    // Validate file
    this.validateFile(file, (validationError, isValid) => {
      if (validationError) {
        return callback(validationError);
      }
      
      if (!isValid) {
        return callback(new Error('File validation failed'));
      }
      
      // Check user permissions
      this.checkUserPermissions(userId, 'file_upload', (permissionError, hasPermission) => {
        if (permissionError) {
          return callback(permissionError);
        }
        
        if (!hasPermission) {
          return callback(new Error('User does not have upload permission'));
        }
        
        // Scan file for viruses
        this.scanFileForViruses(file, (scanError, scanResult) => {
          if (scanError) {
            return callback(scanError);
          }
          
          if (!scanResult.clean) {
            return callback(new Error('File contains malware'));
          }
          
          // Resize image if it's an image
          this.resizeImageIfNeeded(file, (resizeError, resizedFile) => {
            if (resizeError) {
              return callback(resizeError);
            }
            
            const fileToUpload = resizedFile || file;
            
            // Upload to cloud storage
            this.uploadToCloudStorage(fileToUpload, (uploadError, uploadResult) => {
              if (uploadError) {
                return callback(uploadError);
              }
              
              // Generate thumbnail
              this.generateThumbnail(uploadResult.url, (thumbnailError, thumbnailUrl) => {
                if (thumbnailError) {
                  return callback(thumbnailError);
                }
                
                // Save file metadata to database
                this.saveFileMetadata(userId, uploadResult, thumbnailUrl, (saveError, fileRecord) => {
                  if (saveError) {
                    return callback(saveError);
                  }
                  
                  // Update user's storage quota
                  this.updateUserStorageQuota(userId, fileToUpload.size, (quotaError, newQuota) => {
                    if (quotaError) {
                      return callback(quotaError);
                    }
                    
                    // Send notification to user
                    this.sendUploadNotification(userId, fileRecord, (notificationError, notificationResult) => {
                      if (notificationError) {
                        return callback(notificationError);
                      }
                      
                      callback(null, {
                        file: fileRecord,
                        upload: uploadResult,
                        thumbnail: thumbnailUrl,
                        quota: newQuota,
                        notification: notificationResult
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  // Even more nested callbacks - report generation
  generateUserActivityReport(userId, startDate, endDate, callback) {
    this.getUser(userId, (userError, user) => {
      if (userError) return callback(userError);
      
      this.getUserActivities(userId, startDate, endDate, (activitiesError, activities) => {
        if (activitiesError) return callback(activitiesError);
        
        this.getUserSessions(userId, startDate, endDate, (sessionsError, sessions) => {
          if (sessionsError) return callback(sessionsError);
          
          this.getUserPurchases(userId, startDate, endDate, (purchasesError, purchases) => {
            if (purchasesError) return callback(purchasesError);
            
            this.calculateEngagementMetrics(activities, sessions, (metricsError, metrics) => {
              if (metricsError) return callback(metricsError);
              
              this.generateCharts(metrics, purchases, (chartsError, charts) => {
                if (chartsError) return callback(chartsError);
                
                this.formatReportData(user, activities, sessions, purchases, metrics, charts, (formatError, reportData) => {
                  if (formatError) return callback(formatError);
                  
                  this.saveReportToFile(reportData, (saveError, filePath) => {
                    if (saveError) return callback(saveError);
                    
                    this.emailReportToUser(user.email, filePath, (emailError, emailResult) => {
                      if (emailError) return callback(emailError);
                      
                      callback(null, {
                        report: reportData,
                        file: filePath,
                        email: emailResult
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  // Simulated async operations that use callbacks
  getUser(userId, callback) {
    setTimeout(() => {
      if (userId === 'invalid') {
        return callback(new Error('User not found'));
      }
      callback(null, { 
        id: userId, 
        name: 'John Doe', 
        email: 'john@example.com',
        paymentMethod: { type: 'credit_card' }
      });
    }, 100);
  }

  validateUser(user, callback) {
    setTimeout(() => {
      callback(null, user.name && user.email);
    }, 50);
  }

  getUserCart(userId, callback) {
    setTimeout(() => {
      callback(null, {
        items: [
          { id: 1, name: 'Product A', price: 25.99, quantity: 2 },
          { id: 2, name: 'Product B', price: 15.50, quantity: 1 }
        ]
      });
    }, 75);
  }

  validateCartItems(items, callback) {
    setTimeout(() => {
      callback(null, items);
    }, 60);
  }

  calculatePrices(items, callback) {
    setTimeout(() => {
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      callback(null, { subtotal: total, tax: total * 0.08, total: total * 1.08 });
    }, 80);
  }

  applyDiscounts(user, pricing, callback) {
    setTimeout(() => {
      const discount = pricing.total * 0.1; // 10% discount
      callback(null, {
        ...pricing,
        discount: discount,
        total: pricing.total - discount
      });
    }, 90);
  }

  processPayment(paymentMethod, amount, callback) {
    setTimeout(() => {
      callback(null, { 
        transactionId: 'txn_' + Date.now(),
        amount: amount,
        status: 'completed'
      });
    }, 200);
  }

  updateInventory(items, callback) {
    setTimeout(() => {
      callback(null, { updated: items.length });
    }, 100);
  }

  createOrderRecord(user, items, pricing, payment, callback) {
    setTimeout(() => {
      callback(null, {
        id: 'order_' + Date.now(),
        userId: user.id,
        items: items,
        total: pricing.total,
        paymentId: payment.transactionId
      });
    }, 120);
  }

  sendConfirmationEmail(email, order, callback) {
    setTimeout(() => {
      callback(null, { sent: true, messageId: 'msg_' + Date.now() });
    }, 150);
  }

  logTransaction(orderId, userId, callback) {
    setTimeout(() => {
      callback(null, { logged: true, logId: 'log_' + Date.now() });
    }, 80);
  }

  // Additional methods for file upload example
  validateFile(file, callback) {
    setTimeout(() => callback(null, true), 50);
  }

  checkUserPermissions(userId, permission, callback) {
    setTimeout(() => callback(null, true), 60);
  }

  scanFileForViruses(file, callback) {
    setTimeout(() => callback(null, { clean: true }), 200);
  }

  resizeImageIfNeeded(file, callback) {
    setTimeout(() => callback(null, null), 100);
  }

  uploadToCloudStorage(file, callback) {
    setTimeout(() => callback(null, { url: 'https://cloud.example.com/file123' }), 300);
  }

  generateThumbnail(url, callback) {
    setTimeout(() => callback(null, 'https://cloud.example.com/thumb123'), 150);
  }

  saveFileMetadata(userId, uploadResult, thumbnailUrl, callback) {
    setTimeout(() => callback(null, { id: 'file_' + Date.now() }), 100);
  }

  updateUserStorageQuota(userId, fileSize, callback) {
    setTimeout(() => callback(null, { used: fileSize, remaining: 1000000 }), 80);
  }

  sendUploadNotification(userId, fileRecord, callback) {
    setTimeout(() => callback(null, { sent: true }), 100);
  }

  // Additional methods for report example
  getUserActivities(userId, startDate, endDate, callback) {
    setTimeout(() => callback(null, []), 100);
  }

  getUserSessions(userId, startDate, endDate, callback) {
    setTimeout(() => callback(null, []), 120);
  }

  getUserPurchases(userId, startDate, endDate, callback) {
    setTimeout(() => callback(null, []), 110);
  }

  calculateEngagementMetrics(activities, sessions, callback) {
    setTimeout(() => callback(null, {}), 200);
  }

  generateCharts(metrics, purchases, callback) {
    setTimeout(() => callback(null, {}), 150);
  }

  formatReportData(user, activities, sessions, purchases, metrics, charts, callback) {
    setTimeout(() => callback(null, {}), 100);
  }

  saveReportToFile(reportData, callback) {
    setTimeout(() => callback(null, '/tmp/report.pdf'), 200);
  }

  emailReportToUser(email, filePath, callback) {
    setTimeout(() => callback(null, { sent: true }), 150);
  }
}

// Usage examples showing how difficult callback hell is to work with
const processor = new DataProcessor();

// This deeply nested structure is hard to:
// 1. Read and understand
// 2. Debug when something goes wrong
// 3. Test individual steps
// 4. Handle errors properly
// 5. Maintain and modify

processor.processUserOrder('user123', (error, result) => {
  if (error) {
    console.error('Order processing failed:', error.message);
  } else {
    console.log('Order processed successfully:', result);
  }
});

processor.processFileUpload(
  { name: 'test.jpg', size: 1024000 }, 
  'user123', 
  (error, result) => {
    if (error) {
      console.error('File upload failed:', error.message);
    } else {
      console.log('File uploaded successfully:', result);
    }
  }
);

// The problems with callback hell:
// 1. Code grows horizontally instead of vertically
// 2. Error handling is repetitive and scattered
// 3. Hard to reason about the flow of execution
// 4. Difficult to test individual steps in isolation
// 5. Callback parameters can be confusing (error-first pattern)
// 6. Easy to miss error handling cases
// 7. Hard to refactor or modify the sequence of operations