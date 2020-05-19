// External imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

// configure the server's listen port and give user feedback 
app.listen(process.env.PORT || 4000, () => {
    console.log("Server starting on port 4000")
});