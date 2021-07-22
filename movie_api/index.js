const express = require('express');
const app = express();

let topmovies = [
   { 
       title: 'Batman',
    genre: Action
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

    app.get('/', (req, res) => {
        res.send('This is a test!');
    });

    app.use('/documentation.html', express.static('public'));

    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    