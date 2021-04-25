"use strict"

var db = require('../db-connection');
const Review = require('../Models/Review');

class ReviewsDB
{
    getAllReviews(request, respond)
    {
        var sql = "SELECT user.firstName, review.review, review.restaurantID, review.userID, review.reviewID, review.datePosted, review.reviewRating FROM restaurant_review.review INNER JOIN restaurant_review.user ON review.userID = user.userID";
        db.query(sql, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                respond.json(result);
            }
        });
    }

    getRestaurantReviews(request,respond)
    {
        var sql = "SELECT user.firstName, review.review, review.reviewID, review.datePosted, review.reviewRating FROM restaurant_review.review INNER JOIN restaurant_review.user ON review.userID = user.userID WHERE restaurantID = ?"

        var restaurantID = request.params.restaurantID;
        db.query(sql,[restaurantID],function (error, result) 
        {
                if(error)
                {
                    throw error;
                }
                else
                {
                    respond.json(result);
                }
        });
    }
    
    addReview(request, respond) 
    {
        var reviewObject = new Review(null, request.params.restaurantID, request.body.userid, request.body.review, request.body.reviewRating, null); //request.body.dateposted to be changed to null
        var sql = "INSERT INTO restaurant_review.review (restaurantID, userID, review, reviewRating, datePosted) VALUES (?,?,?,?,Now())"; //Now() to be implemented
        
        var values = [reviewObject.getRestaurantId(), reviewObject.getUserId(), reviewObject.getReview(), reviewObject.getReviewRating()]; //reviewObject.getDatePosted() to be deleted
    
        db.query(sql, values, function (error, result) 
        {
                if(error)
                {
                    throw error;
                }
                else
                {
                    respond.json(result);
                }
        });
    }

    editReview(request, respond)
    {
        var reviewObject = new Review(request.params.reviewID, null, null, request.body.review, request.body.reviewRating, null); //request.body.dateposted to be changed to null
        var sql = "UPDATE restaurant_review.review SET review = ?, reviewRating = ?, datePosted = Now() WHERE reviewID = ?;"; //Now() to be implemented

        var values = [reviewObject.getReview(), reviewObject.getReviewRating(), reviewObject.getReviewId()]; //reviewObject.getDatePosted() to be deleted

        db.query(sql, values, function (error, result) 
        {
                if(error)
                {
                    throw error;
                }
                else
                {
                    respond.json(result);
                }
        });
    }

    deleteReview(request,respond)
    {
        var sql = "DELETE FROM restaurant_review.review WHERE reviewID = ?";

        var reviewID = request.params.reviewID;

        db.query(sql,[reviewID],function (error, result) 
        {
                if(error)
                {
                    throw error;
                }
                else
                {
                    respond.json(result);
                }
        });
    }
}

module.exports = ReviewsDB;