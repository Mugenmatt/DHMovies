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

        Movie.create({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.awards,
            releaseDate: req.body.fechaEstreno,
            length: req.body.duracion,
            genre: req.body.genero,
            
        })
        .then(() => {
            res.redirect('/')
        })
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
                return res.render('detail', { title: `Detalle de la película`, pelicula }); 
            })
        .catch(error => console.log(error))

    },

    update : function(req, res) {
        let peliculaACambiar = Movie.findByPk(req.params.id, {
            include : [{
                association : "genero",
            }, {
                association : "actores"
            }]
        })

        let generosListados = Genre.findAll()

        Promise.all([peliculaACambiar, generosListados])
        .then(function([pelicula, generos]){
            return res.render('updateFilm', { title: 'Actualización de Pelicula', pelicula, generos }); 
        })
    },

    updateProcess : function(req, res) {
        Movie.update(

            {
                title: req.body.titulo,
                rating: req.body.rating,
                awards: req.body.awards,
                releaseDate: req.body.releaseDate,
                length: req.body.length,
                genre: req.body.genre,
            },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/')
        })
    },

    delete : function(req, res) {
        Movie.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/')
        })
    }

}
