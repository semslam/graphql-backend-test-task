const express = require("express");
const graphQlRoute = require("./GraphQl.route");

module.exports = (app) => {
    const router = express.Router();
    app.use("/graphql", graphQlRoute(router));   
  };