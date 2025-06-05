// Magic Number Smell Example
// Numbers without clear meaning scattered throughout the code

class GameEngine {
  constructor() {
    this.players = [];
    this.enemies = [];
    this.powerUps = [];
    this.score = 0;
  }

  // What do these numbers mean?
  calculateDamage(baseDamage, weaponType) {
    let damage = baseDamage;
    
    if (weaponType === 'sword') {
      damage *= 1.5; // What is 1.5?
    } else if (weaponType === 'bow') {
      damage *= 1.2; // What is 1.2?
    }
    
    // Critical hit chance?
    if (Math.random() < 0.15) { // What is 0.15?
      damage *= 2.5; // What is 2.5?
    }
    
    return Math.min(damage, 999); // What is 999?
  }

  // More magic numbers
  spawnEnemy() {
    const enemy = {
      health: Math.random() * 100 + 50, // Why 100 + 50?
      attack: Math.random() * 25 + 10,  // Why 25 + 10?
      speed: Math.random() * 3 + 1,     // Why 3 + 1?
      x