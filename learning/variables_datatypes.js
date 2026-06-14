// ==========================================
// Phase 1: JavaScript Fundamentals
// Lesson 1: Variables, Scope, and Data Types
// ==========================================

// 1. VARIABLES & SCOPE (var, let, const)
console.log("--- 1. Variables & Scope ---");

// Global scope example
const storeName = "MS Premium Dry Fruits"; 
// const: Cannot be reassigned. Use it for values that shouldn't change.
console.log("Store Name:", storeName);

// Block scope example with let
let cartItemCount = 0; 
// let: Block-scoped. Can be reassigned. Perfect for counters, variables that change.
if (true) {
    let localDiscount = 10; // Only accessible inside this block { }
    console.log("Discount inside block:", localDiscount);
    cartItemCount = 2; // Can reassign outer 'let' variables
}
// console.log(localDiscount); // ReferenceError: localDiscount is not defined

// var: Function-scoped, avoids block scope (NOT recommended in modern JS)
if (true) {
    var legacyVariable = "I leak outside blocks!";
}
console.log("Legacy variable output:", legacyVariable); // Accessible here! Can cause bugs.


// 2. DATA TYPES (Primitive vs. Reference)
console.log("\n--- 2. Data Types ---");

// Primitive Types: Stored by value
let productPrice = 299; // Number
let isAvailable = true; // Boolean
let selectedCategory = null; // Null (explicitly empty)
let customerPhone; // Undefined (declared but not initialized)

console.log("Price Type:", typeof productPrice);
console.log("Phone Type:", typeof customerPhone);

// Reference Types: Stored by reference (memory address)
// Object: Key-Value pairs (representing a product)
const almondProduct = {
    id: 101,
    name: "California Almonds",
    price: 350,
    inStock: true
};

// Array: Ordered list of items
const cartItems = ["Almonds", "Cashews", "Walnuts"];

console.log("Product Name:", almondProduct.name);
console.log("First Cart Item:", cartItems[0]);

// Understanding Reference Behavior (Crucial for React State!)
const anotherProductReference = almondProduct; // Points to the SAME memory address
anotherProductReference.price = 400; // Modifying the reference also changes the original!

console.log("Original Product Price after modification:", almondProduct.price); // Prints 400!
