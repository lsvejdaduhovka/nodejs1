const http = require("http");
const fs = require("fs");

let pocetPozadavku = 0;

function main(req, res) {
    pocetPozadavku++;
    console.log("url: " + req.url);

    if (req.url === "/") {
        res.writeHead(200, "Content-type: text/html");
        res.end(fs.readFileSync("index.html"));
    } else if (req.url.endsWith(".jpg")) {
        let fileName = req.url.substr(1);
        console.log("fileName: "+fileName);
        if (fs.existsSync(fileName)) {
            res.writeHead(200, "Content-type: image/jpeg");
            res.end(fs.readFileSync(fileName));
        } else {
            res.writeHead(404);
            res.end();
        }
    } else if (req.url === "/jinastranka") {
        res.writeHead(200, "Content-type: text/html");
        res.end("<html><body>blablabla</body></html>");
    } else {
        res.writeHead(404);
        res.end();
    }
}

http.createServer(main).listen(8080);

console.log("Server bezi na adrese http://localhost:8080");
