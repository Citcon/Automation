const swaggerJSDoc = require('swagger-jsdoc');

// swagger-ui definition
const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Hello World', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A sample API', // Description (optional)
    },
    host: `localhost:3000`, // Host (optional)
    basePath: '/', // Base path (optional)
}


// initialize swagger-ui-jsdoc
module.exports = function () {
    // options for the swagger-ui docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*.js'],
    };
    return swaggerJSDoc(options)
};