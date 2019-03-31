const routes = require('next-routes')();

routes.add('/user/purchases/:username', '/user/purchases')
    .add('/user/signup', '/user/signup')
    .add('/user/settings/:username', '/user/settings')
    .add('/vendor/signup', '/vendor/signup')
    .add('/vendor/manage/:username', '/vendor/manage')
    .add('/vendor/settings/:username', '/vendor/settings')
    .add('/user/search/:search', '/user/search')
    .add('/user/categories/:category', '/user/categories')
    .add('/user/settings/:username', '/user/settings')
    .add('/user/:username', '/user/index');

module.exports = routes;
