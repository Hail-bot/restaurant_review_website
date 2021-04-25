function registerMe()
{
    var registerUser = new XMLHttpRequest();

    registerUser.open("POST","/signup", true);
    registerUser.setRequestHeader("Content-Type","application/json");
    registerUser.onload = function()
    {
        $('#registerModal').modal('hide');
        $('#successModal').modal('show');
    }
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var telephonenumber = document.getElementById("telephonenumber").value;
    var radios = document.getElementsByName("gender");
    for (var i = 0, length = radios.length; i < length; i++) 
    {
        if (radios[i].checked) 
        {
            var gender = radios[i].value
            break;
        }
    }
    
    var payload = {loginid:username, firstname:firstname, lastname:lastname, loginpassword:password, usergender:gender, usermobilenum:telephonenumber, useremail:email, useraddress:address}
    registerUser.send(JSON.stringify(payload));
}

