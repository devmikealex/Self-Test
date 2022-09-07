/* jshint node: true */
/*jshint -W033 */

const express = require("express")
const app = express()
const path = require("path");

const PORT = process.env.PORT || 3000

app.use((req,res,next) => {
    res.set('Cache-Control', 'no-store')
    // req.myData = "My Data"
    console.log('------------middleware')
    console.log(req.originalUrl)
    console.log(req.method)
    next()
})

app.get("/", (req, res) => {
    // res.send("Root folder")
    res.redirect("index.html")
})

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/favicon.ico")
})

const pathStatic = path.join(__dirname, "..", "build");
console.log("pathStatic", pathStatic)
app.use(express.static(pathStatic))

app.listen(PORT, () => {
    console.log(`Ser Start http://127.0.0.1:${PORT}`);
});
