const express = require("express");
const {createTables} = require("./models/sqlite/DBConnection")
createTables();
const app = express();
const PORT =  5000;

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

require("./api/routes")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});