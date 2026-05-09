// ======================================
// STEP 2: ARRAY DESTRUCTURING
// ======================================

const fruits = ["Apple", "Banana", "Orange", "Mango"];

// Extract values using array destructuring
const [firstFruit, secondFruit] = fruits;

console.log("First Fruit:", firstFruit);
console.log("Second Fruit:", secondFruit);

// Skipping elements
const [ , , thirdFruit] = fruits;

console.log("Third Fruit:", thirdFruit);

// ======================================
// STEP 3: OBJECT DESTRUCTURING
// ======================================

const student = {
  name: "John",
  age: 21,
  course: "Computer Science"
};

// Extract object properties
const { name, age, course } = student;

console.log("Student Name:", name);
console.log("Age:", age);
console.log("Course:", course);

// ======================================
// STEP 4: ADVANCED DESTRUCTURING
// ======================================

const user = {
  username: "ram123",
  info: {
    city: "Dagupan",
    country: "Philippines"
  }
};

// Nested destructuring
const {
  username,
  info: { city, country }
} = user;

console.log("Username:", username);
console.log("City:", city);
console.log("Country:", country);

// Default values
const settings = {
  theme: "Dark"
};

const { theme, language = "English" } = settings;

console.log("Theme:", theme);
console.log("Language:", language);

// Variable renaming
const employee = {
  empName: "Sarah",
  position: "Developer"
};

const {
  empName: employeeName,
  position: employeePosition
} = employee;

console.log("Employee:", employeeName);
console.log("Position:", employeePosition);

// ======================================
// STEP 5: DESTRUCTURING IN FUNCTIONS
// ======================================

// Destructuring directly in function parameters
const displayUser = ({ fullName, email }) => {

  console.log(`User: ${fullName}`);
  console.log(`Email: ${email}`);

};

displayUser({
  fullName: "Michael Reyes",
  email: "michael@example.com"
});

// ======================================
// FINAL MESSAGE
// ======================================

console.log("All destructuring examples executed successfully!");