const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MIS Portal API",
    version: "1.0.0",
    description: "API Documentation for MIS Portal Project",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // IMPORTANT: your routes are here
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;