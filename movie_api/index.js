const express = require('express');
const morgan = require('morgan');
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


    app.get('/movies', (req, res) => {
        res.json(movies);
    });

    app.get('/movies/:genre', (req, res) => {
        res.json(movies.find( (movies) =>
        { return movies.genre === req.params.genre}));
    });


    app.get('/movies/:directors', (req, res) => {
        res.json(movies.find( (movies) =>
        { return movies.directors === req.params.directors}));
    });

    app.get('/user/movies/:favorite', (req, res) => {
        res.send('Successful GET request returning list of movies added to users favorites');
    });

    app.post('/user/movies/:favorite/:movieid', (req, res) => {
        res.send('Successful Add request returning movies added to favorites');
    });

    app.delete('/user/movies/:favorite/remove/:movieid', (req, res) => {
        res.send('Successful delete request returning list with movies removed that were deleted');
    });

    app.post('/user', (req, res) => {
        let newUser = req.body;
        
        if (!newUser) {
            const message = 'Username not found';
            res.status(400).send(message);
        }else {
            newUser.id = uuid.v4();
            movies.push(newUser);
            res.status(201).send(newUser);
        }
    });

    app.put('/user/:userid/', (req, res) => {
        let user = user.find((user) => {
            return user.name === req.params.name});
    });


    app.delete('/user/delete/:userid', (req, res) => {
        let user = user.find((user) => {
            return user.id === req.params.id});

            if (user) {
                user = user.filter((obj) => {
                    return obj.id !== req.params.id});
                res.status(201).send('User' + req.params.id + 'was deleted.');
            }
    });



    app.get('/', (req, res) => {
        res.send('This is a test!');
    });

    app.use('/documentation.html', express.static('public'));

    app.use(morgan('common'));

    app.use(bodyParser.json());

    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    