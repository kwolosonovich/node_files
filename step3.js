const process = require("process");
const fs = require("fs");
const axios = require("axios");
let path = null;
let output = null;
let w = null;
let p = process.argv;

// if path is a text file, log file content or write to file
const cat = () => {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    if (w === null) {
      console.log(data);
    } else if (w !== null) {
      fs.writeFile(output, data, "utf8", function (err) {
        if (err) {
          console.error(`Error with: ${output}: ${err}`);
          process.exit(1);
        }
      });
    }
  })
};

// if path is a URL, log URL content or write to file
const webCat = async (newUrl) => {
  try {
    const res = await axios.get(newUrl);
    if (w === null) {
      console.log(res.data);
    } else {
      fs.writeFile(output, res.data, "utf8", function (err) {
        if (err) {
          console.error(`Error with: ${output}: ${err}`);
          process.exit(1);
        }
      });
    }
  } catch {
    console.error(`Error fetching ${newUrl}: ${err}`);
    process.exit(1);
  }
};

// check if path is a URL object or a file string
const checkType = () => {
  try {
    const newUrl = new URL(path);
    webCat(newUrl.href);
  } catch {
    cat();
  }
};

// check for oupout value using length of process.argv
if (p.length === 3) {
  path = process.argv[2];
  checkType();
} else {
  path = process.argv[4];
  output = process.argv[3];
  w = process.argv[2];
  checkType();
}

