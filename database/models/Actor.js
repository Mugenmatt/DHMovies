module.exports = (sequelize, dataTypes) => {

    let alias = "Actor";

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
        firstName : {
            type : dataTypes.STRING,
            allowNull : false,
        },
        lastName : {
            type: dataTypes.STRING,
            allowNull : false,
        },
        rating : {
            type : dataTypes.DECIMAL,
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        deletedAt : {
            type : dataTypes.DATE,
        }
    },

    config = {
        tableName : "actors",
        "paranoid" : true,
        // timestamps: false
    }
    

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models) {
        Actor.belongsToMany(models.Movie, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }

    return Actor;
}