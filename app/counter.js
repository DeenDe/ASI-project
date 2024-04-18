// counter.js
const fs = require('fs');

function incrementCounter() {
    fs.readFile('counter', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let count = parseInt(data) || 0;
        count++;

        fs.writeFile('counter', count.toString(), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }

            console.log('Counter incremented:', count);
        });
    });
}

module.exports = {
    incrementCounter
};