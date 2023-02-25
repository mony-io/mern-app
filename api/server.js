require("dotenv").config();

const express = require("express"); // What Is Express JS? Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.
const mongoose = require("mongoose"); // Mongoose acts as a front end to MongoDB, an open source NoSQL database that uses a document-oriented data model. A "collection" of "documents" in a MongoDB database is analogous to a "table" of "rows" in a relational database.
const cors = require("cors");
const PORT = process.env.PORT;

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(cors()); // Cross-Origin Resource Sharing : is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
app.use(express.json()); // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

// JSON : JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to database MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Connect to db & running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// use() : use is a method to configure the middleware used by the routes of the Express HTTP server object. 1. Request event trigered on node http server instance. 2. express does some of its inner manipulation with req object. 3. This is when express starts doing things you specified with app. use.
