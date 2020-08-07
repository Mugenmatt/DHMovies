module.exports = (sequelize, dataTypes) => {

    let alias = "Movie";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull : false,
            autoIncrement: true
        },
        createdAt: {
            type : dataTypes.DATE,
            allowNull : true
        },
        updatedAt: {
            type : dataTypes.DATE,
            allowNull : true
        },
        title : {
            type : dataTypes.STRING,
            allowNull : false,
        },
        rating : {
            type: dataTypes.DECIMAL.UNSIGNED,
            allowNull : false,
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        releaseDate : {
            type : dataTypes.DATE,
            allowNull : false,
        },
        length : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        deletedAt : {
            type : dataTypes.DATE,
            allowNull : true
        }
    },

    config = {
        tableName : "movies",
        "paranoid" : true,
        // timestamps: false
    }
    

    const Movie = sequelize.define(alias, cols, config);

    return Movie;
}