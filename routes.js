const routes = require('next-routes')();

routes.add('/user/purchases/:username', '/user/purchases')
    .add('/user/settings/:username', '/user/settings')
    .add('/vendor/manage/:username', '/vendor/manage')
    .add('/user/search/:search', '/user/search')
    .add('/user/categories/:category', '/user/categories')
    .add('/user/settings/:username', '/user/settings')
    .add('/user/:username', '/user/index')
    .add('/error', '/');

module.exports = routes;
