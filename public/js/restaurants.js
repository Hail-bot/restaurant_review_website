function getRestaurantData(cuisine)
{
    var request = new XMLHttpRequest();
    request.open('GET', "/restaurant", true);

    request.onload = function() 
    {
        restaurant_array = JSON.parse(request.responseText);

        displayRestaurants(cuisine);
        //userDetails();
        fetchReviews();
    }
    request.send();
}

function displayRestaurants(cuisine)
{
    var summary = document.createElement("h2");
    summary.classList.add("summaryText")
    summary.id = "summary"+ cuisine
    var div = document.createElement("div");
    div.id = "restaurantTable" + cuisine
    document.getElementById(cuisine).appendChild(summary)
    document.getElementById(cuisine).appendChild(div)
    var table = document.getElementById("restaurantTable" + cuisine);
    var restaurantCount = 0;
    var message = "";

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for(var count = 0; count < totalRestaurants; count++)
    {
        if (restaurant_array[count].restaurantCuisine == cuisine)
        {
            var thumbnail = restaurant_array[count].restaurantThumbnail;
            var title = restaurant_array[count].restaurantName;
            var address = restaurant_array[count].restaurantAddress;
            var cell =           
                        '<br>'+              
                        '<div>' + 
                            '<a id="restaurants" href="#" data-toggle="modal" data-target="#restaurantModal" onClick="showRestaurantDetails(this)" item=' + count + '>'+
                                '<img src=' + thumbnail + ' width="160" height="160"/>'+
                            '</a>'+
                            '<span class="hlol">  <b>     ' + title + '</b></span> <span> @ '+address+'</span>'+
                            '<span id = "'+restaurant_array[count].restaurantID+'"></span>'+
                            '<button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn buttonslol btn-outline-dark btn-sm" onClick="showRestaurantDetails(this)" >View Details</button>'+                     
                            '<button href="#" data-toggle="modal" data-target="#reviewModal" item="' + count + '" type="button" class="btn buttonslol btn-outline-dark btn-sm" onClick="showRestaurantReviews(this)" >Reviews</button>'+
                        '</div>';
                        
            table.insertAdjacentHTML('beforeend', cell);           
            restaurantCount++;  
        }
    }
    message = " " + cuisine + " Restaurants";    
    document.getElementById("summary" +cuisine).textContent = message;
}


function showRestaurantDetails(element)
{
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantPic").src = restaurant_array[item].restaurantPic;
    document.getElementById("restaurantName").textContent = restaurant_array[item].restaurantName;
    document.getElementById("restaurantAddress").textContent = restaurant_array[item].restaurantAddress;
    document.getElementById("restaurantHours").textContent = restaurant_array[item].restaurantHours;
    document.getElementById("restaurantPhone").textContent = restaurant_array[item].restaurantPhone;
}

function search()
{
    var searchTerm = document.getElementById("searchTerm").value;
    var searchdb = new XMLHttpRequest();
    searchdb.open('POST',"/results",true);
    searchdb.onload = function()
    {
        restaurant_array = JSON.parse(searchdb.responseText);
        displaySpecificRestaurant();
        fetchReviews();
    }
    searchdb.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var payload = {restaurantName:searchTerm}
    searchdb.send(JSON.stringify(payload));
}

function displaySpecificRestaurant()
{
    
    console.log(restaurant_array[0])
    var specificRestaurantTable = document.getElementById("specificRestaurant")
    var thumbnail = restaurant_array[0].restaurantThumbnail;
    var title = restaurant_array[0].restaurantName;
    var address=restaurant_array[0].restaurantAddress;
    specificRestaurantTable.innerHTML = ''
    var cell =                         
                '<div>' + 
                    '<a id="restaurants" href="#" data-toggle="modal" data-target="#restaurantModal" onClick="showRestaurantDetails(this)" item=' + 0 + '>'+
                        '<img src=' + thumbnail + ' width="160" height="160"/>'+
                    '</a>'+
                        '<span class="hlol"><b>       ' + title + '</b></span> <span> @ '+address+'</span>' +
                        '<button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + 0 + '" type="button" class="btn buttonslol btn-outline-dark btn-sm" onClick="showRestaurantDetails(this)" >View Details</button>'+                     
                        '<button href="#" data-toggle="modal" data-target="#reviewModal" item="' + 0 + '" type="button" class="btn buttonslol btn-outline-dark btn-sm" onClick="showRestaurantReviews(this)" >Reviews</button>'+
                '</div>';
                
    specificRestaurantTable.insertAdjacentHTML('beforeend', cell);
}