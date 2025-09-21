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

// page not found
app.use((req,res,next)=>{
    res.status(404).json({
        message:"page not found"
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});