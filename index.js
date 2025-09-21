require('dotenv').config();
const express = require('express');
const dbconnetcion = require('./src/config/dbconfig');
const router = require('./src/config/route');
const app = express();
const port = process.env.PORT || 3000;

// database connection
 dbconnetcion();

// router middleware
app.use(router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});