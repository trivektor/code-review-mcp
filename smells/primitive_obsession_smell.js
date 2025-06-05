// Primitive Obsession Smell Example
// Using primitive types instead of proper domain objects

class UserRegistrationSystem {
  constructor() {
    this.users = [];
  }

  // Using primitives for complex concepts
  createUser(firstName, lastName, email, phone, ssn, birthDate, address) {
    // Validation scattered throughout using primitives
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Invalid email format');
    }
    
    // Phone number as string - no validation or formatting
    if (phone.length < 10) {
      throw new Error('Invalid phone number');
    }
    
    // SSN as string - security risk, no masking
    if (ssn.length !== 11 || !ssn.includes('-')) {
      throw new Error('Invalid SSN format');
    }
    
    // Birth date as string - hard to work with
    const birthYear = parseInt(birthDate.split('-')[0]);
    if (new Date().getFullYear() - birthYear < 18) {
      throw new Error('Must be 18 or older');
    }
    
    // Address as string - no structure
    if (!address.includes(',')) {
      throw new Error('Address must include city and state');
    }
    
    const user = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      ssn,
      birthDate,