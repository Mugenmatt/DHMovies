const DB = require('../database/models')

const sequelize = DB.sequelize;

const Movie = DB.Movie;

const Genre = DB.Genre;

const Actor = DB.Actor;

const ActorMovie = DB.ActorMovie;

module.exports = {

    index : function(req, res) {

        Movie.findAll()
        .then(peliculas => {
            let todasLasPeliculas = peliculas;
                return res.render('index', { title: 'DH Movies Challenge', todasLasPeliculas }); 
            })
        .catch(error => console.log(error))

    },

    newFilm : function(req, res) {

        Genre.findAll()
        .then(generos => {
                return res.render('newFilm', { title: 'Nueva Película', generos }); 
            })
        .catch(error => console.log(error))
    },

    newFilmProcess : function(req, res) {
        res.redirect('/')
    },

    detail : function(req, res) {

        Movie.findByPk(req.params.id, {
            include : [{
                association : "genero",
            }, {
                association : "actores"
            }]
        })
        .then(pelicula => {
                return res.render('detail', { title: 'DH Movies Challenge', pelicula }); 
            })
        .catch(error => console.log(error))

    },

}
