module.exports = (sequelize, dataTypes) => {

    alias = "Genre";

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
        name : {
            type : dataTypes.STRING,
            allowNull : false,
        },
        ranking : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
        },
        active : {
            type : dataTypes.TINYINT,
            allowNull : false,
        },
        deletedAt : {
            type : dataTypes.DATE,
        }
    },

    config = {
        tableName : "genres",
        "paranoid" : true,
        // timestamps: false
    }
    

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models) {
        Genre.hasMany(models.Movie, {
            as: "peliculas",
            foreignKey: "genre_id"
        })
    }

    return Genre;
}