const process = require("process");
const fs = require("fs");
const axios = require("axios");
const newUrl = new URL(
  "http://curric.rithmschool.com/springboard/exercises/node-files/"
);
let path = process.argv[2];

// if path is a text file, log file content
const cat = () => {
  fs.readFile("./one.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
};
 
// if path is a URL, log URL content
const webCat = async (path) => {
    console.log(path)
    try {
        const res = await axios.get(path);
        console.log(res.data);
    } catch(err) {
        console.error(`Error with path: ${path}: ${err}`)
        process.exit(1);
    }
}

// check if path is a URL object or a file string
if (typeof(path) === 'object') {
    webCat(newUrl.href)
} else {
    cat()
}
