"use strict";

class User
{
    constructor(userid, loginid, firstname, lastname, loginpassword, usergender, usermobilenum, useremail, useraddress)
    {
        this.userid = userid;
        this.loginid = loginid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.loginpassword = loginpassword;
        this.usergender = usergender;
        this.usermobilenum = usermobilenum;
        this.useremail = useremail;
        this.useraddress = useraddress;
    }

    getUserId()
    {
        return this.userid
    }
    getLoginId()
    {
        return this.loginid 
    }
    getFirstName()
    {
        return this.firstname
    }
    getLastName()
    {
        return this.lastname
    }
    getLoginPassword()
    {
        return this.loginpassword
    }
    getUserGender()
    {
        return this.usergender
    }
    getUserMobileNum()
    {
        return this.usermobilenum
    }
    getUserEmail()
    {
        return this.useremail
    }
    getUserAddress()
    {
        return this.useraddress
    }

    setUserId(userId)
    {
        this.userid = userId;
    }
    setLoginId(loginId)
    {
        this.loginid = loginId;
    }
    setFirstName(firstName)
    {
        this.firstname = firstName;
    }
    setLastName(lastName)
    {
        this.lastname = lastName;
    }
    setLoginPassword(loginPassword)
    {
        this.loginpassword = loginPassword;
    }
    setUserGender(userGender)
    {
        this.usergender = userGender;
    }
    setUserMobileNum(userMobileNum)
    {
        this.usermobilenum = userMobileNum;
    }
    setUserEmail(userEmail)
    {
        this.useremail = userEmail;
    }
    setUserAddress(userAddress)
    {
        this.useraddress = userAddress;
    }
}

module.exports = User;