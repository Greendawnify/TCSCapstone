let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

// database url details
let url = "mongodb://localhost:27017/TCS_Capstone";

// middleware enable data from post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const mongooseDbOptions = {
  // to avoid warnings with mongobd
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(url, mongooseDbOptions);

//connect the data
mongoose.connection;

// link to Product Router
//var productRouter =

//link to User Router

// link to employee router

// link to admin router

// middleware
app.use("/product", productRouter);

app.listen(9090, () => console.log("Running on server 9090"));
