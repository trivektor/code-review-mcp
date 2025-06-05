// Base Class Depends on Subclass Smell Example
// Base classes that know about and depend on their subclasses

// Violation: Animal base class knows about specific animal types
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  // BAD: Base class contains logic specific to subclasses
  makeSound() {
    if (this instanceof Dog) {
      return this.bark();
    } else if (this instanceof Cat) {
      return this.meow();
    } else if (this instanceof Bird) {
      return this.chirp();
    } else if (this instanceof Fish) {
      return '...'; // Fish don't make sounds
    } else {
      return 'Some generic animal sound';
    }
  }

  // BAD: Base class knows about subclass-specific behaviors
  getMovementType() {
    if (this instanceof Bird) {
      return 'flying';
    } else if (this instanceof Fish) {
      return 'swimming';