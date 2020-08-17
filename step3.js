const process = require("process");
const fs = require("fs");
const axios = require("axios");
let path = process.argv[2];

// if path is a text file, log file content
const cat = (path) => {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
};

// if path is a URL, log URL content
const webCat = async (path) => {
  console.log(path);
  try {
    const res = await axios.get(path);
    console.log(res.data);
  } catch (err) {
    console.error(`Error with path: ${path}: ${err}`);
    process.exit(1);
  }
};

// check if path is a URL object or a file string
const checkType = (path) => {
    try {
        const newUrl = new URL(
        path
        );
        webCat(newUrl.href);
    } catch {
        console.log('file')
        cat(path)
    }
}

checkType(path)