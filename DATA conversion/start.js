const path = require("path");
const fs = require("fs");
const clc = require("cli-color");
// const readline = require('readline');
const lineByLine = require("n-readlines");

console.log();
console.log();
console.log("--------------------------------------------");
console.log();

const directoryPath = path.join(__dirname, "..", "public", "data");
console.log(clc.yellow("Data Directory Path:"), directoryPath);

const filesList = fs.readdirSync(directoryPath);
const htmlFilesList = filesList.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    const fileName = path.basename(file);
    return !!(extension === ".html" && !fileName.startsWith("_"));
});
htmlFilesList.forEach((file) => {
    console.log(file);
});
console.log();
console.log("HTML Files for proccesing:", htmlFilesList.length);
console.log();

const data = [];
htmlFilesList.forEach((file) => {
    const fullFileName = path.join(directoryPath, file);
    const liner = new lineByLine(fullFileName);
    const line1 = liner.next();
    const line2 = liner.next();
    const line3 = liner.next();
    console.log(file, "line1:", line1.toString("utf8"));
    console.log(file, "line2:", line2.toString("utf8"));
    console.log(file, "line3:", line3.toString("utf8"));
    if (liner.next()) liner.close();
    console.log("---");
    data.push({
        alias: file.slice(0, -5),
        search: line2.toString("utf8").slice(0, -1).trim(),
        title: line1.toString("utf8").slice(0, -1).trim(),
    });
});
console.log(data);

const dataString = JSON.stringify(data, null, 2);

console.log(dataString);

fs.writeFileSync(path.join(directoryPath, "collection.json"), dataString);

console.log();
console.log("--------------------------------------------");
console.log(clc.yellow("- КОНЕЦ -"));
