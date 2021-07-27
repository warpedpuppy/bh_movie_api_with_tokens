const express = require('express'),
const morgan = require('morgan'),
const app = express(),
const bodyParser = require('body-parser'),
const uuid = require('uuid'),
const path = require('path');


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

    let users = [
        {
        id: 1,
        username: 'Dan',
        password: 'password1',
        email: 'dan@yahoo.com',
        birthday: '05-15- 2005'
        }
    ];

    app.use('/documentation.html', express.static('public'));

    app.use(morgan('common'));
    
    app.use(bodyParser.json());
    

//---------Movie Requests--------

    app.get('/movies', (req, res) => {
        res.json(movies);
    });

    app.get('/movies/:name', (req, res) => {
        res.send('Details have not been loaded yet');
    });


    app.get('/movies/directors/:name', (req, res) => {
        res.json(movies.find( (movies) =>
        { return movies.directors === req.params.name;
        }));
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

    //--------User requests--------

    app.get('/users', (req, res) => {
        res.json(users);
    });

    app.post('/users', (req, res) => {
        let newUser = req.body;
        
        if (!newUser.username) {
            const message = 'Username not found';
            res.status(400).send(message);
        }else {
            newUser.id = uuid.v4();
            users.push(newUser);
            res.status(201).send(newUser);
        }
    });

    app.put('/user/:username/', (req, res) => {
        let user = user.find((user) => {
            return user.username === req.params.username});
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
        res.send('Welcome to My Flix');
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    
    