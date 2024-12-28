//require the bcrypt for the password field
const bcrypt = require("bcryptjs");
//create a User collection
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        //email column to save the emailID
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //password column to save the password
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //username column to save the username
        username: {
            type: DataTypes.STRING
        }
    });
    //create a one to many relationship between user and the memories
    User.associate = models => {
        User.hasMany(models.Memories, {
            onDelete: 'cascade'
        })
        //encrypt the password
        User.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password);
        };
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created, we will automatically hash their password
        User.addHook("beforeCreate", function (user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        });
    }
    //return the user collection
    return User;
}
