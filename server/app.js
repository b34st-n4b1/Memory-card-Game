require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")

const homeRoute = require("./routes/homeRoute");

let port = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


//custom middleware
app.use("/api", homeRoute);

app.listen(port, () => console.log(`server is running at port ${port}`));
