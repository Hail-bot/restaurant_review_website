"use strict"

var db = require('../db-connection');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "shakeelwantstocopythiscode"

class UsersDB
{
    getAllUsers(request, respond)
    {
        var sql = "SELECT * FROM restaurant_review.user";
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

    addUser(request, respond) 
    {
        var password = request.body.loginpassword;
        password = bcrypt.hashSync(password, 10);
        var userObject = new User(null, request.body.loginid, request.body.firstname, request.body.lastname, password, request.body.usergender, request.body.usermobilenum, request.body.useremail, request.body.useraddress);
        var sql = "INSERT INTO restaurant_review.user (loginID, firstName, lastName, loginPassword, userGender, userMobileNum, userEmail, userAddress) VALUES(?,?,?,?,?,?,?,?)";
        
        var values = [userObject.getLoginId(), userObject.getFirstName(), userObject.getLastName(), userObject.getLoginPassword(), userObject.getUserGender(), userObject.getUserMobileNum(), userObject.getUserEmail(), userObject.getUserAddress()];
    
        db.query(sql, values, function (error, result) 
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

    checkloginID(request,respond)
    {
        var sql = "SELECT loginID FROM restaurant_review.user WHERE loginID = ?"
        var loginID = request.body.loginID;

        db.query(sql,[loginID],function (error,result)
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

    login(request,respond)
    {
        var sql = "SELECT loginPassword FROM restaurant_review.user WHERE loginID = ?"
        var loginID = request.body.loginID;
        var password = request.body.password;
        db.query(sql,[loginID],function (error,result)
        {
            if(error)
            {
                respond.json(error);
            }
            else
            {
                const hash = result[0].loginPassword;
                var flag = bcrypt.compareSync(password,hash);
                if (flag)
                {
                    var token = jwt.sign(loginID,secret);
                    respond.json({result:token});
                }
                else
                {
                    respond.json({result:"invalid"});
                }
            }
        })
    }

    editUserInfo(request,respond)
    {
        var sql = "UPDATE restaurant_review.user SET firstName = ?, lastName = ?, userGender = ?, userMobileNum = ?, userAddress = ?, userEmail = ? WHERE userID = ?"

        var editUserObject = new User(request.params.userID, null, request.body.firstname, request.body.lastname, null, request.body.usergender, request.body.usermobilenum, request.body.useremail, request.body.useraddress);
        
        var values = [editUserObject.getFirstName(), editUserObject.getLastName(), editUserObject.getUserGender(), editUserObject.getUserMobileNum(), editUserObject.getUserAddress(), editUserObject.getUserEmail(), editUserObject.getUserId()];
        try {
            
            db.query(sql,values,function(error,result)
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
        } catch (error) {
            respond.json({result:"invalid token"});
        }
    }

    showUserInfo(request,respond) //what a nightmare
    {
        var token = request.body.token;
        var sql = "SELECT distinct loginID,firstName,lastName,userGender,userMobileNum,userAddress,userEmail,userID from restaurant_review.user WHERE loginID = ?";
        
        try
        {
            var decoded = jwt.verify(token,secret);
            
            db.query(sql,[decoded],function(error,result)
            {
                if(error)
                {
                    respond.json(error);
                }
                else
                {
                    respond.json(result);
                }
            });
        }
        catch(error)
        {
            respond.json({result:"invalid token"});
        }
    }

    deleteUser(request,respond)
    {
        var token = request.body.token;
        var sql = "DELETE FROM restaurant_review.user WHERE loginID = ?";
        
        try
        {
            var decoded = jwt.verify(token,secret);
            
            db.query(sql,[decoded],function(error,result)
            {
                if(error)
                {
                    respond.json(error);
                }
                else
                {
                    respond.json(result);
                }
            });
        }
        catch(error)
        {
            respond.json({result:"invalid token"});
        }
    }
}
module.exports = UsersDB;