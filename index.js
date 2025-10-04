require('dotenv').config();
const express = require('express');
const dbconnetcion = require('./src/config/dbconfig');
const router = require('./src/route');
const errorHandlingMiddleware = require('./src/utils/errorhandling');
const pathNotFoundMiddleware = require('./src/utils/pathnotefound');
const app = express();
const port = process.env.PORT || 3000;

// database connection
 dbconnetcion();

// middleware
app.use(express.json())


// router middleware
app.use(router)

// page not found
app.use(pathNotFoundMiddleware)

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});