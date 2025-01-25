const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/auth");
const uploadesRouter = require("./routes/uploads");
const dotenv = require("dotenv");
dotenv.config();

// adding middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use("/api/auth",authRouter);
app.use("/api/uploads",uploadesRouter);

// connecting to database
mongoose.connect(process.env.MongoDB_URL)
    .then(() => {
        console.log("Connected to mongo db");
    })
    .catch((err) => {
        console.log("error :- ", err);
    })


app.listen(8000, () => {
    console.log("app is running on PORT 8000");
})

