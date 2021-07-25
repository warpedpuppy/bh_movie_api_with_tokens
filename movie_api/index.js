const express = require('express');
morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

let topmovies = [
   { 
       title: 'Batman',
    genre: 'Action'
    },
    {
      title:'Indiana Jones and the Last Crusade',
      genre:'Lethal Weapon 2'  
    },
    {
        title:'Honey, I Shrunk the Kids',
        genre:'Adventure'
    },
    {
        title:'Rain Man',
        genre:'Comedy'
    },
    {
        title:'Look Whos Talking',
        genre: 'Comedy'
    },
    {
        title: 'Ghostbusters II',
        genre: 'Comedy'
    },
    {
        title: 'Back to the Future Part II',
        genre: 'Adventure'
    },
    {
        title: 'Parenthood',
        genre: 'Comedy'
    },
    {
        title: 'Dead Poets Society',
        genre: 'Drama'
    }
];

    app.get('/movies',(req, res) => {
        res.json(topmovies);
    });

    app.get('/movies', (req, res) => {
        res.send('Successful GET request returning lists of movies');
    });

    app.get('/movies/[movietitle]', (req, res) => {
        res.send('Successful GET request returning title, img, description, genre, director, actors');
    });

    app.get('/movies/[genre]', (req, res) => {
        res.send('Successful GET request returning list of movies by genre');
    });

    app.get('/movies/[directors]', (req, res) => {
        res.send('Successful GET request returning list of directors and information about directors');
    });

    app.get('/user/[username]/movies/[favorite]/[movieId]', (req, res) => {
        res.send('Successful GET request returning list of movies added to users favorites');
    });

    app.post('/user/[username]/movies/[favorite]/[movieId]', (req, res) => {
        res.send('Successful Add request returning movies added to favorites');
    });

    app.delete('/user/[username]/movies/[favorite]/remove/[movieId]', (req, res) => {
        res.send('Successful delete request returning list with movies removed that were deleted');
    });

    app.post('/user', (req, res) => {
        res.send('Successful add a new user account and provide id');
    });

    app.post('/user/[username]', (req, res) => {
        res.send('Successful add update to users account');
    });

    app.get('/user/[username]', (req, res) => {
        res.send('Successful GET request returning users information');
    });

    app.delete('/user/[username]', (req, res) => {
        res.send('Successful deletes users account');
    });



    app.get('/', (req, res) => {
        res.send('This is a test!');
    });

    app.use('/documentation.html', express.static('public'));

    app.use(morgan('common'));

    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    