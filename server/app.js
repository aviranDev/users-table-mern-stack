//Express framework setup
const express = require('express');
const app = express();

//parser JSON bodies
app.use(express.json());

//import MongoDB
require('./db/db');

//Security applied to an API
const cors = require('cors');
app.use(cors());

//morgan logger
const morgan = require('morgan');
app.use(morgan('dev'));


//user routes
const userRouter = require('./routes/routes');
app.use('/api/users', userRouter);

//binds and listen the connections on the specidied host and port
const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port${port}`));