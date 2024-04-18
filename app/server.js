const http = require('http');
const fs = require('fs');
const path = require('path');
const { incrementCounter } = require('./counter.js');

const PORT = process.env.PORT || 3000;

// Function to handle requests for visitor count
function handleVisitorCount(req, res) {
    fs.readFile('counter', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error reading visitor count');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    });
}

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html as default page
    }
    else if (req.url === '/getVisitorCount') {
        handleVisitorCount(req, res); // Handle visitor count separately
        return; // Stop execution of the rest of the code
    }
    else if (req.url === '/new-visitor') {
        incrementCounter(); // Increment counter for new visitor
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
