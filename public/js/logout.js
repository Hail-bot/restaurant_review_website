function logoutMe()
{
    $('#registerMenu').show();
    $('#loginMenu').show();
    $('#logoutMenu').hide();
    sessionStorage.removeItem("token");
    window.location.assign("/restaurants.html")
}