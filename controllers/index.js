const DB = require('../database/models')

const sequelize = DB.sequelize;

const Movie = DB.Movie;

module.exports = {

    index : function(req, res) {

        // sequelize.query('SELECT * FROM movies')
        // .then(peliculas => {
        //     let todasLasPeliculas = peliculas[0]; 
        //     // res.send(todasLasPeliculas)
        //     return res.render('index', { title: 'DH Movies Challenge', todasLasPeliculas }); 
        // })

        Movie.findAll()
        .then(peliculas => {
            let todasLasPeliculas = peliculas;
                return res.render('index', { title: 'DH Movies Challenge', todasLasPeliculas }); 
            })
        .catch(error => console.log(error))

    },

    newFilm : function(req, res) {
        res.render('newFilm')
    },

    detail : function(req, res) {

        Movie.findByPk(req.params.id)
        .then(pelicula => {
                return res.render('detail', { title: 'DH Movies Challenge', pelicula }); 
            })
        .catch(error => console.log(error))

    },

}
