//create an instance of sequlize
const Sequelize = require('sequelize')
//create a colletion Memories
module.exports = function (sequelize, DataTypes) {
    const Memories = sequelize.define('Memories', {
        //description column to save the message from the client
        description:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        //title column to save th title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //image column to save the imageURL
        imageurl:
        {
            type: DataTypes.STRING
        },
        //createAt column to save the date on which the record is created
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });
    //create a 1 to many realtion between the user and the memories table
    Memories.associate = models => {
        Memories.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    //return the Memories collection
    return Memories;
}
