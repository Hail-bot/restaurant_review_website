$(document).ready(function()
{
    var token = sessionStorage.getItem("token");
    if (token != null) 
    {
        $('#registerMenu').hide();
        $('#loginMenu').hide();
        $('#logoutMenu').show();
        $('#userProfile').show();
    } 
    else 
    {
        window.location.href="restaurants.html"
    }
})