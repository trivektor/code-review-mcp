// Clever Code Smell Example
// This code works but is unnecessarily complex and hard to understand

class DataProcessor {
  // Overly clever one-liner that's hard to understand
  processNumbers(arr) {
    return arr.reduce((a,b,i,arr)=>i%2?a+b*arr[i-1]:a,0);
  }

  // Clever but cryptic string manipulation
  reverseWords(str) {
    return str.split('').reverse().join('').split(' ').reverse().join(' ');
  }

  // Unnecessarily complex date calculation
  daysBetween(date1, date2) {
    return Math.floor(Math.abs(new Date(date2) - new Date(date1)) / 864e5);
  }

  // Overly clever array flattening
  flattenArray(arr) {
    return arr.toString().split(',').map(x => +x || x);
  }

  // Showing off with bitwise operations where simple math would do
  multiplyByTwo(num) {
    return num << 1;
  }

  // Clever but hard to understand object property access
  getNestedValue(obj, path) {
    return path.split('.').reduce((o,p)=>o&&o[p], obj);
  }

  // Unnecessarily clever sorting
  sortByLength(strings) {
    return strings.sort((a,b)=>a.length-b.length||a.localeCompare(b));
  }

  // Overly complex ternary chains
  getStatus(user) {
    return user.active ? user.verified ? user.premium ? 'premium' : 'verified' : 'unverified' : 'inactive';
  }

  // Clever regex that's hard to understand
  extractEmails(text) {
    return text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
  }

  // Unnecessarily complex array manipulation
  uniqueAndSort(arr) {
    return [...new Set(arr)].sort((a,b)=>a-b);
  }
}

// Usage examples that show how confusing this code is
const processor = new DataProcessor();

// What does this do? Hard to tell from the method call
console.log(processor.processNumbers([1, 2, 3, 4, 5, 6]));

// Is this reversing words or characters? Not clear
console.log(processor.reverseWords("hello world test"));

// These might work but are hard to maintain and understand
console.log(processor.daysBetween("2023-01-01", "2023-12-31"));
console.log(processor.multiplyByTwo(42));
console.log(processor.getStatus({active: true, verified: true, premium: false}));