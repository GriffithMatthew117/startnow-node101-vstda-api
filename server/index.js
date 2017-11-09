
const server = require('./app');

// port to be either a database enviroment port or local.
var port = process.env.PORT || 8484;

server.listen(port, () => {
    console.log('Server is listening on port:', port);
})