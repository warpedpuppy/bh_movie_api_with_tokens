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

    app.get('/movies[directors]', (req, res) => {
        res.json('/movies/:directors', (req, res) => { return movies.directors === req.params.directors});
    });

    app.get(/user, (req, res) => {
        res.send('Successful get request returning data on users')
    });

    app.get('/', (req, res) => {
        res.send('This is a test!');
    });

    //add movies//
    app.post('/movies', (req, res) => {
        let newMovies = req.body;

        if (!newMovies.name) {
            const message = 'Missing name in request body';
            res.status(400).send(message);
        } else {
            newMovies.id = uuid.v4();
            movies.push(newMovies);
            res.status(201).send(newMovies);
        }
    });

    //delete movies//
    app.delete('/movies/:id', (req, res) => {
        let movies = movies.find((movies) => {
            return movies.id === req.params.id }); 
    
        if (student) {
            students = students.filter((obj) => {
                return obj.id !== req.params.id });
            res.status(201).send('movies ' + req.params.id + 'was deleted.');
            }
    });


    //add users//
    app.post('/movies/:user', (req, res) => {
        let newUser = req.body;

        if (!newUser) {
            const message = 'Missin name in request body';
            res.status(400).send(message);
        } else {
            newUser.id = uuid.v4();
            res.status(201).send(newStudent);
        }
    });


    //delete users//
    app.delete('/movies/:user', (req, res) => {
        let user = user.find((obj) => { return obj.id !== req.params.id});
        res.status(201).send('User ' + req.params.id + 'was deleted. ');
        }
    });

    //update movies//
    app.put('/movies/:name/:genre/:description/:image', (req, res) => {
        let student = students.find((student) => { return movies})
    })

    app.use('/documentation.html', express.static('public'));

    app.use(morgan('common'));

    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    