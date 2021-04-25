"use strict"

const reviewsdb = require('../Models/ReviewsDB');

var reviewsDBObject = new reviewsdb();

function routeReviews(app)
{
    app.route('/reviews')
        .get(reviewsDBObject.getAllReviews);
    app.route('/restaurant/:restaurantID/reviews')
        .get(reviewsDBObject.getRestaurantReviews);
    app.route('/restaurant/:restaurantID/addreview')
        .post(reviewsDBObject.addReview);
    app.route('/restaurant/:restaurantID/reviews/:reviewID/edit')
        .put(reviewsDBObject.editReview);
    app.route('/restaurant/:restaurantID/reviews/:reviewID/delete')
        .delete(reviewsDBObject.deleteReview);
}
module.exports = {routeReviews};