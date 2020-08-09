module.exports = (sequelize, dataTypes) => {

    let alias = "ActorMovie";

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
        actor_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        movie_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        }
    },

    config = {
        tableName : "actor_movie",
        // timestamps: false
    }
    

    const ActorMovie = sequelize.define(alias, cols, config);

    // ActorMovie.associate = function(models) {
    //     ActorMovie.hasMany(models.)
    // }

    return ActorMovie;
}