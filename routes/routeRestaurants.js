"use strict"

const restaurantdb = require('../Models/RestaurantDB');

var restaurantsDBObject = new restaurantdb();

function routeRestaurants(app)
{
    app.route('/restaurant')
        .get(restaurantsDBObject.getAllRestaurants);
    app.route('/restaurant/chinese')
        .get(restaurantsDBObject.getChineseRestaurants);
    app.route('/restaurant/western')
        .get(restaurantsDBObject.getWesternRestaurants);
    app.route('/restaurant/:id')
        .get(restaurantsDBObject.getSpecificRestaurant);
    app.route('/results')
        .post(restaurantsDBObject.searchRestaurant);
}
module.exports = {routeRestaurants};