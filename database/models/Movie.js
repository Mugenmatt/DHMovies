module.exports = (sequelize, dataTypes) => {

    alias = "Movie";

    cols = {
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

    Movie.associate = function(models) {
        Movie.belongsTo(models.Genre, {
            as: "genero",
            foreignKey: "genre_id"
        })

    Movie.belongsToMany(models.Actor, {
        as: "actores",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false
    })
    }

        

    return Movie;
}