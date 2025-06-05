// Large Class Smell Example
// This class has too many responsibilities and is doing everything

class UserManagementSystem {
  constructor() {
    this.users = [];
    this.sessions = [];
    this.emailTemplates = {};
    this.auditLog = [];
    this.config = {};
    this.cache = new Map();
    this.permissions = {};
    this.notifications = [];
    this.reports = [];
    this.fileUploads = [];
  }

  // USER MANAGEMENT RESPONSIBILITIES
  createUser(userData) {
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date(),
      status: 'active'
    };
    this.users.push(user);
    this.logAction('user_created', user.id);
    return user;
  }

  updateUser(userId, updates) {
    const user = this.findUserById(userId);
    if (user) {
      Object.assign(user, updates);
      user.updatedAt = new Date();
      this.logAction('user_updated', userId);
      this.invalidateCache(`user_${userId}`);
    }
    return user;
  }

  deleteUser(userId) {
    const index = this.users.findIndex(u => u.id === userId);
    if (index > -1) {
      this.users.splice(index, 1);
      this.logAction('user_deleted', userId);
      this.invalidateCache(`user_${userId}`);
      this.endAllUserSessions(userId);
    }
  }

  findUserById(id) {
    const cacheKey = `user_${id}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.cache.set(cacheKey, user);
    }
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  listUsers(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    return this.users.slice(start, start + limit);
  }

  // AUTHENTICATION RESPONSIBILITIES
  login(email, password) {
    const user = this.findUserByEmail(email);
    if (!user || !this.verifyPassword(password, user.passwordHash)) {
      this.logAction('login_failed', null, { email });
      throw new Error('Invalid credentials');
    }
    
    const session = this.createSession(user.id);
    this.logAction('login_success', user.id);
    return { user, session };
  }

  logout(sessionId) {
    const session = this.findSession(sessionId);
    if (session) {
      this.endSession(sessionId);
      this.logAction('logout', session.userId);
    }
  }

  createSession(userId) {
    const session = {
      id: this.generateSessionId(),
      userId: userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true
    };
    this.sessions.push(session);
    return session;
  }

  findSession(sessionId) {
    return this.sessions.find(s => s.id === sessionId && s.isActive);
  }

  endSession(sessionId) {
    const session = this.findSession(sessionId);
    if (session) 