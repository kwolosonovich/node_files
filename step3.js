const process = require("process");
const fs = require("fs");
const axios = require("axios");
const newUrl = new URL(
  "http://curric.rithmschool.com/springboard/exercises/node-files/"
);

const cat = () => {
  fs.readFile("./one.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
};

cat();

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

if (typeof newUrl === "object") {
  webCat(newUrl.href);
} else {
  cat();
}
