function showUserProfile()
{
    var db = new XMLHttpRequest();

    db.open("POST","/user",true);

    db.onload = function()
    {
        userinfo_array = JSON.parse(db.responseText);
        userProfileHTML();
    }
    var token = sessionStorage.getItem("token");
    db.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    db.send(JSON.stringify({"token":token}));
}

function userProfileHTML()
{
    console.log(userinfo_array)
    
    document.getElementById("firstnameid").textContent = "First Name: " + userinfo_array[0].firstName;
    document.getElementById("lastnameid").textContent = "Last Name: " + userinfo_array[0].lastName;
    var genderString = ''
    if (userinfo_array[0].userGender == 1)
    {
        genderString = "Male"
    }
    else if (userinfo_array[0].userGender == 2)
    {
        genderString = "Female"
    }
    else
    {
        genderString = "Unspecified"
    }
    document.getElementById("genderid").textContent = "Gender: " + genderString;
    document.getElementById("mobilenumid").textContent = "Mobile Number: " + userinfo_array[0].userMobileNum;
    document.getElementById("homeaddressid").textContent = "Home Address: " + userinfo_array[0].userAddress;
    document.getElementById("useridid").textContent = "Userid: " + userinfo_array[0].loginID;
    document.getElementById("emailid").textContent = "Email: " + userinfo_array[0].userEmail;
}

function userDetails()
{
    var db = new XMLHttpRequest();

    db.open("POST","/user",true);

    db.onload = function()
    {
        userinfo_array = JSON.parse(db.responseText);
    }
    var token = sessionStorage.getItem("token");
    db.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    db.send(JSON.stringify({"token":token}));
}

function deleteAccount()
{
    var db = new XMLHttpRequest();

    db.open("DELETE","/deleteuser",true);

    db.onload = function()
    {
        sessionStorage.removeItem("token");
        window.location.href="/restaurants.html";
        alert("Account Deleted");
    }
    var token = sessionStorage.getItem("token");
    db.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    db.send(JSON.stringify({"token":token}));
}