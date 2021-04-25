"use strict"
var db = require('../db-connection');

class RestaurantDB
{
    getAllRestaurants(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.restaurant";
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
    getChineseRestaurants(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.restaurant WHERE restaurantCuisine = 'Chinese'";
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
    getWesternRestaurants(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.restaurant WHERE restaurantCuisine = 'Western'";
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
    getSpecificRestaurant(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.restaurant WHERE restaurantID = ?";
        var restaurantID = request.params.id;

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
    searchRestaurant(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.restaurant WHERE restaurantName LIKE ?";
        var restaurantName = request.body.restaurantName;

        db.query(sql,[restaurantName],function (error,result)
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

module.exports = RestaurantDB;