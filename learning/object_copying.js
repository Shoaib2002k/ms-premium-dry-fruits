// ==========================================
// Phase 1: JavaScript Fundamentals
// Lesson 1 - Part 2: Object Copying (Shallow vs. Deep Copy)
// ==========================================

console.log("--- Object Copying Practice ---");

// 1. The Reference Problem (What we saw in Lesson 1)
const originalCart = {
    totalPrice: 500,
    items: ["Almonds", "Cashews"]
};

// Direct Assignment (Copies the reference, NOT the values)
const referenceCart = originalCart;
referenceCart.totalPrice = 600;

console.log("1. Reference Assignment:");
console.log("Original Cart Total:", originalCart.totalPrice); // 600 (Mutated!)
console.log("Reference Cart Total:", referenceCart.totalPrice); // 600


// 2. Shallow Copy using the Spread Operator (...)
// Creates a new outer object, but nested arrays/objects still share references!
const shallowCart = { ...originalCart };
shallowCart.totalPrice = 750; // Changing a top-level primitive value

// Let's modify the nested array in the shallow copy
shallowCart.items.push("Walnuts"); 

console.log("\n2. Shallow Copy (Spread Operator):");
console.log("Original Cart Total:", originalCart.totalPrice); // 600 (Did NOT change, good!)
console.log("Shallow Cart Total:", shallowCart.totalPrice);   // 750
console.log("Original Cart Items:", originalCart.items);     // ["Almonds", "Cashews", "Walnuts"] (Nested array mutated!)
console.log("Shallow Cart Items:", shallowCart.items);       // ["Almonds", "Cashews", "Walnuts"]


// 3. Deep Copy using structuredClone() (Modern Native JS) or JSON.parse/stringify
// Completely clones the outer object AND all nested arrays/objects.
const deepCart = structuredClone(originalCart);
deepCart.totalPrice = 900;
deepCart.items.push("Pistachios");

console.log("\n3. Deep Copy (structuredClone):");
console.log("Original Cart Total:", originalCart.totalPrice); // 600 (Unchanged)
console.log("Original Cart Items:", originalCart.items);     // ["Almonds", "Cashews", "Walnuts"] (Unchanged, no Pistachios!)
console.log("Deep Cart Items:", deepCart.items);             // ["Almonds", "Cashews", "Walnuts", "Pistachios"] (Independent!)
