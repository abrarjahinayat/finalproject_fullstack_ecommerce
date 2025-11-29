require('dotenv').config();
const express = require('express');
const dbconnetcion = require('./src/config/dbconfig');
const router = require('./src/route');
const errorHandlingMiddleware = require('./src/utils/errorhandling');
const pathNotFoundMiddleware = require('./src/utils/pathnotefound');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
const session = require('express-session')
app.use(cors())
// database connection
 dbconnetcion();

// middleware
app.use(express.json())

// static folder middleware
app.use(express.static("uploads"));


// Express Session Middleware
// app.use(session({
//   secret: process.env.SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))

// router middleware
app.use(router)




//  app.get('/', (req, res, next) => {
//   console.log(req.session.userinfo);
//   res.send("session text");
// });

// page not found
app.use(pathNotFoundMiddleware)

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});