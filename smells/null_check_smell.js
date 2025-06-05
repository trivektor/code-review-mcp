// Null Check Smell Example
// Excessive null/undefined checking throughout the codebase

class UserService {
  constructor() {
    this.users = [];
  }

  // Excessive null checking everywhere
  getUserInfo(user) {
    if (user === null) {
      return 'No user provided';
    }
    if (user === undefined) {
      return 'User is undefined';
    }
    if (!user) {
      return 'User is falsy';
    }
    
    if (user.name === null) {
      return 'User name is null';
    }
    if (user.name === undefined) {
      return 'User name is undefined';
    }
    if (!user.name) {
      return 'User has no name';
    }
    
    if (user.profile === null) {
      return 'User profile is null';
    }
    if (user.profile === undefined) {
      return 'User profile is undefined';
    }
    if (!user.profile) {
      return 'User has no profile';
    }
    
    if (user.profile.bio === null) {
      return 'Bio is null';
    }
    if (user.profile.bio === undefined) {
      return 'Bio is undefined';
    }
    if (!user.profile.bio) {
      return 'User has no bio';
    }
    
    return user.profile.bio;
  }

  // More null checking madness
  processUserData(userData) {
    if (userData === null || userData === undefined) {
      throw new Error('User data cannot be null or undefined');
    }
    
    if (userData.personalInfo === null || userData.personalInfo === undefined) {
      throw new Erro