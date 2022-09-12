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
    console.log(file, "line1:", line1.toString("utf8"));
    const line2 = liner.next();
    console.log(file, "line2:", line2.toString("utf8"));
    const line3 = liner.next();
    console.log(file, "line3:", line3.toString("utf8"));
    const line4 = liner.next();
    console.log(file, "line4:", line4.toString("utf8"));
    try {
        liner.close();
    } catch (error) {
        console.log(error);
    }
    console.log("---");
    
    const title = line1.toString("utf8").slice(0, -1).trim()
    const alias = file.slice(0, -5)
    let searchByHand = line2.toString("utf8").slice(0, -1).trim()
    let abbr = ''

    const a = line3.toString("utf8").slice(0, -1).trim()
    if (a === '%%'){
        abbr = line4.toString("utf8").slice(0, -1).trim()
    }
    let search = `${title} ${alias} ${abbr}`
    search = search.toLowerCase()
    search = search.replace(/[^а-яёa-zA-Z0-9_\s]/g, '') // удаление не букв и не цифр
    search = search.replace(/\s+/g, ' ') // удаление пробелов подряд
    search = search.trim()
    const array = search.split(' ')
    const unique = [...new Set(array)];
    const lenFilter = unique.filter(item => item.length > 3)
    search = lenFilter.join(' ')

    searchByHand = searchByHand.toLowerCase()
    searchByHand = searchByHand.replace(/\s+/g, ' ')
    searchByHand = searchByHand.trim()

    search = `${search} ${searchByHand}`
    
    data.push({
        alias,
        search,
        title 
    });
});
console.log(data);

const dataString = JSON.stringify(data, null, 2);

console.log(dataString);

fs.writeFileSync(path.join(directoryPath, "collection.json"), dataString);

console.log();
console.log("--------------------------------------------");
console.log(clc.yellow("- КОНЕЦ -"));
