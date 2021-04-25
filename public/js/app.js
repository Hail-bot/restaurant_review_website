/*var movie_url = "/movies";
var movie_array = []; // This creates an empty movie array
var movieCount = 0;*/
/*  There are two categories: "Now Showing" and "Coming Soon". This variable states which 
    category of movies should be listed when the home page is first loaded. */
/*var category = "Now Showing";
var currentIndex = 0;*/

var comment_url = "/comments";
var comment_array = []; //this creates an empty array

var restaurant_array = [];
var restaurantCount = 0;

var cuisine = "Chinese"
var currentIndex = 0;

var review_url = "/reviews";
var review_array = [];

var userinfo_array = []

var averageReviewRating = null

function w3includeHTMLCallback(restaurantCuisine)
{
    w3.includeHTML(myCallback);

        function myCallback() 
        {
            getRestaurantData(restaurantCuisine)
        }
}