const process = require("process");
const fs = require("fs");

fs.readFile('./one.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(data)
})