"use strict;"

class Restaurant
{
    constructor(id, name, address, hours, phone, thumbnail, pic, cuisine)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.hours = hours;
        this.phone = phone;
        this.thumbnail = thumbnail;
        this.pic = pic;
        this.cuisine = cuisine;
    }
    getId()
    {
        return this.id;
    }
    getName()
    {
        return this.name;
    }
    getAddress()
    {
        return this.address;
    }
    getHours()
    {
        return this.hours;
    }
    getPhone()
    {
        return this.phone;
    }
    getThumbnail()
    {
        return this.thumbnail;
    }
    getPic()
    {
        return this.pic;
    }
    getCuisine()
    {
        return this.cuisine;
    }
}

module.exports = Restaurant;