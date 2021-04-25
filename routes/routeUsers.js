"use strict";

const usersdb = require('../Models/UsersDB');

var usersDBObject = new usersdb();

function routeUsers(app)
{
    app.route('/users')
        .get(usersDBObject.getAllUsers);
    app.route('/signup')
        .post(usersDBObject.addUser)
        .get(usersDBObject.checkloginID);
    app.route('/login')
        .post(usersDBObject.login);
    app.route('/user/:userID')
        .get(usersDBObject.showUserInfo);
    app.route('/user/:userID/edit')
        .put(usersDBObject.editUserInfo);
    app.route('/user')
        .post(usersDBObject.showUserInfo);
    app.route('/deleteuser')
        .delete(usersDBObject.deleteUser);
}
module.exports = {routeUsers};