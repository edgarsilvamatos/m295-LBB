const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/swagger-ui', (request, response) => {
    fs.readFile(__dirname + '/../swagger/swagger.json', 'utf8', (err, data) => {
        if (err) {
            response.status(500).send('Internal Server Error');
            return;
        }
        const jsonData = JSON.parse(data); 
        response.send(jsonData);
    });
})

module.exports = router