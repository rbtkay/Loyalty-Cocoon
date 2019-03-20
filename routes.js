const routes = require('next-routes')();

routes.add('/user/:search', '/user/search')
    .add('/user/:username', '/user/index');

module.exports = routes;
