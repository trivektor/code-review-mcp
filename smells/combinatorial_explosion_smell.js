// Combinatorial Explosion Smell Example
// Many similar methods that handle slightly different combinations

class NotificationService {
  // Combinatorial explosion of notification methods
  // Instead of a flexible system, we have methods for every combination
  
  sendEmailNotificationToUser(userId, message) {
    console.log(`Sending email to user ${userId}: ${message}`);
  }

  sendSMSNotificationToUser(userId, message) {
    console.log(`Sending SMS to user ${userId}: ${message}`);
  }

  sendPushNotificationToUser(userId, message) {
    console.log(`Sending push notification to user ${userId}: ${message}`);
  }

  sendEmailNotificationToAdmin(adminId, message) {
    console.log(`Sending email to admin ${adminId}: ${message}`);
  }

  sendSMSNotificationToAdmin(adminId, message) {
    console.log(`Sending SMS to admin ${adminId}: ${message}`);
  }

  sendPushNotificationToAdmin(adminId, message) {
    console.log(`Sending push notification to admin ${adminId}: ${message}`);
  }

  sendEmailNotificationToModerator(moderatorId, message) {
    console.log(`Sending email to moderator ${moderatorId}: ${message}`);
  }

  sendSMSNotificationToModerator(moderatorId, message) {
    console.log(`Sending SMS to moderator ${moderatorId}: ${message}`);
  }

  sendPushNotificationToModerator(moderatorId, message) {
    console.log(`Sending push notification to moderator ${moderatorId}: ${message}`);
  }

  // Urgent variants
  sendUrgentEmailNotificationToUser(userId, message) {
    console.log(`Sending URGENT email to user ${userId}: ${message}`);
  }

  sendUrgentSMSNotificationToUser(userId, message) {
    console.log(`Sending URGENT SMS to user ${userId}: ${message}`);
  }

  sendUrgentPushNotificationToUser(userId, message) {
    console.log(`Sending URGENT push notification to user ${userId}: ${message}`);
  }

  sendUrgentEmailNotificationToAdmin(adminId, message) {
    console.log(`Sending URGENT email to admin ${adminId}: ${message}`);
  }

  sendUrgentSMSNotificationToAdmin(adminId, message) {
    console.log(`Sending URGENT SMS to admin ${adminId}: ${message}`);
  }

  sendUrgentPushNotificationToAdmin(adminId, message) {
    console.log(`Sending URGENT push notification to admin ${adminId}: ${message}`);
  }

  // Scheduled variants
  sendScheduledEmailNotificationToUser(userId, message, scheduleTime) {
    console.log(`Scheduling email to user ${userId} for ${scheduleTime