"use strict";

class Review {
    constructor(reviewid, restaurantid, userid, review, reviewRating, datePosted)
    {
        this.reviewid = reviewid;
        this.restaurantid = restaurantid;
        this.userid = userid;
        this.review = review;
        this.reviewRating = reviewRating;
        this.datePosted = datePosted;
    }
    getReviewId() 
    {
        return this.reviewid;
    }
    getRestaurantId()
    {
        return this.restaurantid;
    }
    getUserId()
    {
        return this.userid;
    }
    getReview()
    {
        return this.review;
    }
    getReviewRating()
    {
        return this.reviewRating;
    }
    getDatePosted()
    {
        return this.datePosted;
    }

    setReviewId(reviewId) 
    {
        this.reviewid = reviewId;
    }
    setRestaurantId(restaurantId) 
    {
        this.restaurantid = restaurantId;
    }
    setUserId(userId) 
    {
        this.userid = userId;
    }
    setReview(review) 
    {
        this.review = review;
    }

    setReviewRating(rating) 
    {
        this.reviewRating = rating;
    }
    setDatePosted(datePosted) 
    {
        this.datePosted = datePosted;
    }

}

module.exports = Review; 