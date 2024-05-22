const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Tasks API',
      description: 'Tasks API consisting of Tasks and Login'
    },
    host: 'localhost:3000',
    tags: [ 
    { name: 'tasks', description: 'Operations related to tasks' },
    { name: 'login', description: 'Operations related to login' },
  ],
  };
  
  const outputFile = './swagger.json';
  const routes = ['tasks.js', 'login.js'];

  swaggerAutogen(outputFile, routes, doc);