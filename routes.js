const routes = require('next-routes')();

routes.add('/user/:search', '/user/search');

module.exports = routes;
