// Middle Man Smell Example
// Classes that do nothing but delegate to other classes

class Employee {
  constructor(name, position, department, salary) {
    this.name = name;
    this.position = position;
    this.department = department;
    this.salary = salary;
    this.startDate = new Date();
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.position;
  }

  getDepartment() {
    return this.department;
  }

  getSalary() {
    return this.salary;
  }

  getStartDate() {
    return this.startDate;
  }

  calculateExperience() {
    const years = (new Date() - this.startDate) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  }

  getAnnualSalary() {
    return this.salary * 12;
  }
}

class Department {
  constructor(name, manager, budget) {
    this.name = name;
    this.manager = manager;
    this.budget = budget;
    this.employees = [];
  }

  getName() {
    return this.name;
  }

  getManager() {
    return this.manager;
  }

  getBudget() {
    return this.budget;
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeCount() {
    return this.employees.length;
  }

  getTotalSalaryExpense() {
    return this.employees.reduce((total, emp) => total + emp.getAnnualSalary(), 0);
  }
}

// Middle Man class - does nothing but delegate
class EmployeeManager {
  constructor(employee) {
    this.employee = employee;
  }

  // All these methods just delegate to the employee object
  getName() {
    return this.employee.getName();
  }

  getPosition() {
    return this.employee.getPosition();
  }

  getDepartment() {
    return this.employee.getDepartment();
  }

  getSalary() {
    return this.employee.getSalary();
  }

  getStartDate() {
    return this.employee.getStartDate();
  }

  calculateExperience() {
    return this.employee.calculateExperience();
  }

  getAnnualSalary() {
    return this.employee.getAnnualSalary();
  }

  // Even new functionality just delegates
  getEmployeeInfo() {
    return `${this.employee.getName()} - ${this.employee.getPosition()}`;
  }

  isExperienced() {
    return this.employee.calculateExperience() > 2;
  }

  getFormattedSalary() {
    return `$${this.employee.getSalary().toLocaleString()}`;
  }
}

// Another Middle Man - DepartmentWrapper
class DepartmentWrapper {
  constructor(department) {
    this.department = department;
  }

  // Pure delegation methods
  getName() {
    return this.department.getName();
  }

  getManager() {
    return this.department.getManager();
  }

  getBudget() {
    return this.department.getBudget();
  }

  addEmployee(employee) {
    return this.department.addEmployee(employee);
  }

  getEmployees() {
    return this.department.getEmployees();
  }

  getEmployeeCount() {
    return this.department.getEmployeeCount();
  }

  getTotalSalaryExpense() {
    return this.department.getTotalSalaryExpense();
  }

  // Even "new" methods are just delegating
  getDepartmentInfo() {
    return `${this.department.getName()} (${this.department.getEmployeeCount()} employees)`;
  }

  isOverBudget() {
    return this.department.getTotalSalaryExpense() > this.department.getBudget();
  }

  getManagerName() {
    return this.department.getManager();
  }
}

// More Middle Man examples
class CustomerService {
  constructor(customer) {
    this.customer = customer;
  }

  // Just delegating to customer object
  getCustomerId() {
    return this.customer.getId();
  }

  getCustomerName() {
    return this.customer.getName();
  }

  getCustomerEmail() {
    return this.customer.getEmail();
  }

  getCustomerPhone() {
    return this.customer.getPhone();
  }

  getCustomerAddress() {
    return this.customer.getAddress();
  }

  // Even complex operations are just delegation
  getCustomerDisplayName() {
    return this.customer.getDisplayName();
  }

  isCustomerActive() {
    return this.customer.isActive();
  }

  getCustomerType() {
    return this.customer.getType();
  }
}

// Order processing with unnecessary middle men
class OrderWrapper {
  constructor(order) {
    this.order = order;
  }

  getOrderId() {
    return this.order.getId();
  }

  getOrderDate() {
    return this.order.getDate();
  }

  getOrderItems() {
    return this.order.getItems();
  }

  getOrderTotal() {
    return this.order.getTotal();
  }

  getOrderStatus() {
    return this.order.getStatus();
  }

  getCustomer() {
    return this.order.getCustomer();
  }

  // Methods that add minimal value
  getOrderSummary() {
    return `Order ${this.order.getId()} - $${this.order.getTotal()}`;
  }

  isOrderCompleted() {
    return this.order.getStatus() === 'completed';
  }
}

class PaymentProcessor {
  constructor(paymentGateway) {
    this.gateway = paymentGateway;
  }

  // All methods just delegate to the gateway
  processPayment(amount, cardInfo) {
    return this.gateway.processPayment(amount, cardInfo);
  }

  refundPayment(transactionId) {
    return this.gateway.refundPayment(transactionId);
  }

  getTransactionStatus(transactionId) {
    return this.gateway.getTransactionStatus(transactionId);
  }

  validateCard(cardInfo) {
    return this.gateway.validateCard(cardInfo);
  }

  getTransactionHistory(customerId) {
    return this.gateway.getTransactionHistory(customerId);
  }

  // Even "utility" methods are just delegation
  formatTransactionId(transactionId) {
    return this.gateway.formatTransactionId(transactionId);
  }

  calculateFee(amount) {
    return this.gateway.calculateFee(amount);
  }
}

// Data access with middle man
class UserDataManager {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  // Pure delegation to repository
  findById(id) {
    return this.repository.findById(id);
  }

  findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  save(user) {
    return this.repository.save(user);
  }

  delete(id) {
    return this.repository.delete(id);
  }

  findAll() {
    return this.repository.findAll();
  }

  count() {
    return this.repository.count();
  }

  // Methods that just call repository methods
  createUser(userData) {
    return this.repository.create(userData);
  }

  updateUser(id, userData) {
    return this.repository.update(id, userData);
  }

  getUsersByStatus(status) {
    return this.repository.findByStatus(status);
  }
}

// Configuration management middle man
class ConfigManager {
  constructor(configStore) {
    this.store = configStore;
  }

  // All delegation, no added value
  get(key) {
    return this.store.get(key);
  }

  set(key, value) {
    return this.store.set(key, value);
  }

  has(key) {
    return this.store.has(key);
  }

  delete(key) {
    return this.store.delete(key);
  }

  clear() {
    return this.store.clear();
  }

  getAll() {
    return this.store.getAll();
  }

  // Even these "helper" methods just delegate
  getString(key, defaultValue = '') {
    return this.store.get(key) || defaultValue;
  }

  getNumber(key, defaultValue = 0) {
    return this.store.get(key) || defaultValue;
  }

  getBoolean(key, defaultValue = false) {
    return this.store.get(key) || defaultValue;
  }
}

// Usage examples showing unnecessary delegation
const employee = new Employee('John Doe', 'Developer', 'Engineering', 5000);
const department = new Department('Engineering', 'Jane Smith', 500000);

// These middle man classes add no value
const employeeManager = new EmployeeManager(employee);
const departmentWrapper = new DepartmentWrapper(department);

// Instead of using the employee directly, we go through a middle man
console.log(employee.getName()); // Direct access
console.log(employeeManager.getName()); // Unnecessary delegation

// Same data, more indirection
console.log(department.getName()); // Direct
console.log(departmentWrapper.getName()); // Through middle man

// The problems with middle man:
// 1. Adds unnecessary complexity
// 2. More classes to maintain
// 3. Extra layer of indirection
// 4. No real value added
// 5. Makes code harder to navigate
// 6. Increases coupling without benefits

// When middle man is appropriate:
// - When you need to adapt interfaces
// - When you want to add caching, logging, or security
// - When you need to simplify complex APIs
// - When you want to isolate dependencies

// But in these examples, the middle men add no value and should be removed