function fetchReviews()
{
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    request.onload = function()
    {
        review_array = JSON.parse(request.responseText);
    };

    request.send();
}

function showRestaurantReviews(element) 
{
    document.getElementById("emptyReview").innerHTML = "No reviews yet. Help restaurants by leaving a review!";
    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("review").textContent = "Reviews for " + restaurant_array[item].restaurantName;
    document.getElementById("reviewList").textContent = "";

    for (var i = 0; i < review_array.length; i++) 
    {
        if (review_array[i].restaurantID == restaurant_array[item].restaurantID) 
        {
            console.log(review_array[i])
            document.getElementById("emptyReview").innerHTML = "";
            selectedReviewId = restaurant_array[item].restaurantID;
            star = "";

            date = new Date(review_array[i].datePosted).toLocaleDateString
            (
                'en-gb',
                {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                }
            );
            time = new Date(review_array[i].datePosted).toLocaleTimeString();

            var html = '<li class="media">                                                           \
                            <div class="media-body">                                                 \
                                <span class="pull-right">                                            \
                                    <small>'+ date +' '+ time +'</small>                             \
                                </span>                                                              \
                                <span class="pull-right" id="rating'+ i +'"></span>                  \
                                <h4 class="media-heading"><b>'+ review_array[i].firstName +'</b></h4>\
                                <p>'+review_array[i].review+'</p> \
                                <span class="pull-right"><img src="images/delete-24px.svg" id="deletekappa'+i+'"class="delete" data-dismiss="modal" item="' + i + '" onclick="deleteReview(this)" hidden/></span> \
                                <span class="pull-right"><img src="images/edit-24px.svg" id="editkappa'+i+'"class="edit" data-toggle="modal" data-target="#editReviewModal" data-dismiss="modal" item="' +i+ '" onclick="editReview(this)" hidden/></span>\
                            </div>                                                                   \
                            <hr>                                                                     \
                        </li>';
            document.getElementById("reviewList").insertAdjacentHTML('beforeend', html);
            
            if(userinfo_array[0] != null)
            {
                if(userinfo_array[0].userID === review_array[i].userID)
                {
                    console.log("true")
                    document.getElementById("editkappa"+i).removeAttribute("hidden");
                    document.getElementById("deletekappa"+i).removeAttribute("hidden");
                }
            }
            
            var star = "";
            for (var j = 0; j < review_array[i].reviewRating; j++) 
            {
                star += "<img src='images/icons8-star-48.png' style='width:50px' />";
            }
            document.getElementById("rating" + i).insertAdjacentHTML('afterbegin', star + "<br/>");
        }
    }
}

function newReview()
{
    rating = 0;
    document.getElementById("userReviews").value = "";
    
}

function averageRating()
{
    averageReviewRating = 0
    
}

function addReview()
{
    console.log(userinfo_array[0])
    if(userinfo_array[0] != null)
    {
        var review = new Object();
        review.restaurantID = restaurant_array[currentIndex].restaurantID;
        review.userid = userinfo_array[0].userID;
        review.review = document.getElementById("textReview").value;
        review.reviewRating = rating;
        review.datePosted = null;

        var reviewRequest = new XMLHttpRequest();

        reviewRequest.open("POST", "/restaurant/"+restaurant_array[currentIndex].restaurantID+"/addreview")

        reviewRequest.setRequestHeader("Content-Type", "application/json");
        reviewRequest.onload = function()
        {
            fetchReviews();
        };
        reviewRequest.send(JSON.stringify(review));
    }
    else
    {
        alert("Please login to use this function!")
    }
}

var yellowstarEmpty = 'images/icons8-star-48-empty.png';
var yellowstar = 'images/icons8-star-48.png';
var rating = 0;

function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var yellowstars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    for (let yellowstar of yellowstars){
        yellowstar.setAttribute("src", yellowstarEmpty);
    }
    changeStarImage(num, classTarget);
}

function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", yellowstar);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", yellowstar);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", yellowstar);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", yellowstar);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", yellowstar);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", yellowstar);
            rating = 5;
            break;
    }
}

function editReview(element)
{
    var item = element.getAttribute("item");

    currentIndex=item;

    document.getElementById("editTextReview").value = review_array[item].review
    displayCorrectStar('editpop', review_array[item].reviewRating)
}

function displayCorrectStar(classname, num)
{
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop)
    {
        p.setAttribute("src", yellowstarEmpty);
    }
    changeStarImage(num, classTarget);
}

//This function sends the Comment data to the server for updating
function updateComment() {
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
        var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._id;
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateComment.setRequestHeader("Content-Type", "application/json");
        comment_array[currentIndex].username = document.getElementById("editnickname").value;
        comment_array[currentIndex].review = document.getElementById("edituserComments").value;
        comment_array[currentIndex].rating = rating;
        updateComment.onload = function() {
            fetchComments();
        };
        updateComment.send(JSON.stringify(comment_array[currentIndex]));
    }
}

function updateReview()
{
    var response = confirm("Are you sure you want to edit review?");
    if (response == true)
    {
        var edit_review_url = "/restaurant/1/reviews/" +review_array[currentIndex].reviewID+"/edit";
        var updateReviewdb = new XMLHttpRequest();
        updateReviewdb.open("PUT",edit_review_url,true)
        updateReviewdb.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].review = document.getElementById("editTextReview").value;
        review_array[currentIndex].reviewRating = rating;
        updateReviewdb.onload = function()
        {
            fetchReviews();
        };
        updateReviewdb.send(JSON.stringify(review_array[currentIndex]));
    }
}
    
//This function deletes the selected comment in a specific movie
function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_comment_url = comment_url + "/" + comment_array[item]._id;
        var eraseComment = new XMLHttpRequest();
        eraseComment.open("DELETE", delete_comment_url, true);
        eraseComment.onload = function() {
            fetchComments();
        };
        eraseComment.send();
    }
}

function deleteReview(element)
{
    var response  = confirm("Do you want to delete comment?");

    if (response == true)
    {
        var item = element.getAttribute("item");
        var deleteReviewUrl = "/restaurant/1/reviews/" + review_array[item].reviewID +"/delete";
        var deleteReviewdb = new XMLHttpRequest();
        deleteReviewdb.open("DELETE",deleteReviewUrl,true);
        deleteReviewdb.onload = function()
        {
            fetchReviews();
        };
        deleteReviewdb.send();
    }
}


