const routes = require('next-routes')();

routes.add('/user/purchases/:username', '/user/purchases')
    .add('/user/settings/:username', '/user/settings')
    .add('/vendor/manage/:username', '/vendor/manage')
    .add('/user/:search', '/user/search')
    .add('/user/:username', '/user/index');

module.exports = routes;
