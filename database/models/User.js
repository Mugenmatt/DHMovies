module.exports = (sequelize, dataTypes) => {

    const alias = 'User';

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },

        email : {
            type : dataTypes.STRING,
            allowNull : false,
            unique : true
        },

        password : {
            type : dataTypes.STRING,
            allowNull : false
        },

        rol : {
            type : dataTypes.INTEGER
        },

        createdAt : {
            type : dataTypes.DATE
        },

        updatedAt : {
            type : dataTypes.DATE
        },

        deletedAt : {
            type : dataTypes.DATE
        }
    }

    const config = {
        // timestamps : false,
        tableName : 'users',
        "paranoid" : true,
    }

    const User = sequelize.define(alias, cols, config);

    return User;

}