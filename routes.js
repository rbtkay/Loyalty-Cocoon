const routes = require('next-routes')();

routes.add('/user/purchases/:username', '/user/purchases')
    .add('/user/signup/:promo', '/user/signup')
    .add('/user/signup/', '/user/signup')
    .add('/user/settings/:username', '/user/settings')
    .add('/user/settings', '/user/settings')
    .add('/user/search/:search', '/user/search')
    .add('/user/categories/:category', '/user/categories')
    .add('/user/settings/:username', '/user/settings')
    .add('/user/:username', '/user/index')
    .add('/user', '/user')
    .add('/vendor/manage/:modalUsername', '/vendor/manage')
    .add('/vendor/dashboard', '/vendor/dashboard')
    .add('/vendor/signup', '/vendor/signup')
    .add('/vendor/settings/:username', '/vendor/settings')
    .add('/vendor', '/vendor')
    .add('/resetPassword', '/resetPassword')
    .add('/auth/:token', '/');


module.exports = routes;
