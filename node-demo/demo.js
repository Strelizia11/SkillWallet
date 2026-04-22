const fs = require('fs');
const content = "This is the new Line(2).";

fs.writeFile('message.txt', content, (err) => {
    if (err) {
        console.error("Oops! Something went wrong:", err);
        return;
    }
    console.log("Success! 'message.txt' has been created.");
});