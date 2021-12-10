const express = require('express');
const app = express();
const cors = require('cors');
const myDB = require('./MyDB/index');
const port = 5000;
const route = require('./Routes/index');
require('dotenv').config();

myDB.connectDB();


app.use(express.json());
app.use(cors());

route(app);


app.listen(port, () => console.log(`${process.env.API}`));