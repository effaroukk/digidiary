//create a db variable to get the model 
const db = require("../models");
//function to create the memories
exports.createMemories = (req, res) => {
    //sequlize function to create a new record in the memroies collection
    db.Memories.create({
        description: req.body.description,
        title: req.body.title,
        imageurl: req.body.imageurl,
        UserId: req.body.UserId
    })
        .then((data) => res.send(data))
        .catch((err) => { console.log(err) })
}
//function to get all the records from the database
exports.getMemories = (req, res) => {
    //sequlize functnio to get all the memroies record for the perticular user
    db.Memories.findAll({ where: { userId: req.query.id } })
        .then((data) => { res.json(data) })
        .catch((err) => { console.log(err) })
}
//function to update the memories collection based on the id
exports.updateMemories = (req, res) => {
    //sequlize function to update the memories record based on the id
    db.Memories.findAll({ where: { id: req.body.id } })
        .then(function (data) {
            //if the record is updated then send the records to the client
            const memoID = (data[0].dataValues.id);
            db.Memories.update(req.body,
                {
                    where: {
                        id: memoID
                    }
                })
                .then(function (dbmemo) {
                    res.json(dbmemo);
                });
        })
        .catch(function (err) {
            //if there were error on updation return the error
            res.status(401).json(err);
        })
}
//function to filter the memories data based on the data
exports.filterDate = (req, res) => {
    //Sequlize function to filter the records based on the userID
    db.Memories.findAll({ where: { UserId: req.query.userId } })
        .then(function (data) {
            const returnArray = [];
            //based on the date filter the data 
            data.forEach(element => {
                if (element.dataValues.createdAt == req.query.date) {
                    returnArray.push(element);
                }
            });
            //return the filtered data to the client
            res.json(returnArray);
        })
        .catch(function (err) {
            //if there is an error on filter return the error to the client
            res.status(401).json(err);
        })
}
//function to delete the memories record
exports.deleteMemories = (req, res) => {
    //sequlize function to delete the record based on id
    db.Memories.destroy({ where: { id: req.query.id } })
        .then(function (data) {
            //on success deletion return the result
            res.json(data);
        })
        .catch(function (err) {
            //if the deletion failed return error
            res.status(401).json(err);
        })
}
