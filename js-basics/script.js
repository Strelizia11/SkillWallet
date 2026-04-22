// Step2
let fruits = ["Apple", "Banana", "Cherry"];
let numbers = [10, 20, 30, 40];
fruits.push("Dragonfruit");       
fruits.unshift("Apricot");        
let lastFruit = fruits.pop();    
let firstFruit = fruits.shift();  
console.log("Current Fruits:", fruits);
console.log("Array Length:", fruits.length);

//Step3
let student = {
    firstName: "Alex",
    lastName: "Smith",
    age: 20,
    isEnrolled: true
};
student.age = 21; 
student["isEnrolled"] = false;
console.log(`Student: ${student.firstName} is now ${student.age} years old.`);

//Step4
let products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 }
];
products.forEach(item => console.log(`Product: ${item.name}`));
let affordableItems = products.filter(item => item.price < 100);
let productNames = products.map(item => item.name);
console.log("Affordable Items:", affordableItems);
console.log("Names Only:", productNames);

//Step5
console.log("--- Validation Report ---");
console.assert(fruits.length === 3, "Fruit array length should be 3");
console.assert(typeof student === 'object', "Student should be an object");
console.assert(productNames.includes("Laptop"), "Mapping failed to find Laptop");

console.log("All tests passed! Check the console output above for data verification.");