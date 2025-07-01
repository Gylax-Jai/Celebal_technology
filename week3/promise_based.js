const fs = require('fs').promises;

fs.readFile('jai.txt')
    .then(data => {
        console.log('File content:', data);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });
