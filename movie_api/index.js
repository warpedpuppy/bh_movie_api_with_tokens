const express = require('express'),
  bodyParser = require('body-parser'),       
  uuid = require('uuid');

  morgan = require('morgan'),
  app = express(),      
  mongoose = require('mongoose');
  Models = require('./models.js');
        
  Movies = Models.Movie;
  Users = Models.User;
  Genres = Models.Genre;
  Directors = Models.Director;

  mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });

    

        let movies = [
            {
                name: "Under Seige",
                description: "Action Thriller",
                genre: "Action",
                director: {
                    name: "Andrew Davis",
                    bio: "https://en.wikipedia.org/wiki/Andrew_Davis",
                    birth_year: "1946",
                    death_year: "-",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/3/3d/StevenSeagalUnderSiege_cover.jpg",
            },
            {
                name: "Schitt’s Creek",
                description: "Sitcom",
                genre: "Comedy",
                director: {
                    name: "Eugene Levy",
                    bio: "https://en.wikipedia.org/wiki/Eugene_Levy",
                    birth_year: "1946",
                    death_year: "-",
                },
                image_URL: "https://en.wikipedia.org/wiki/File:Schitt%27s_Creek_logo.png",
            },
            {
                name: "The Last Dance",
                description: "Miniseries",
                genre: "Documentary",
                director: {
                    name: "Jason Hehir ",
                    bio: "https://www.imdb.com/name/nm2629370/bio",
                    birth_year: "1976",
                    death_year: "-",
                    },
                image_URL: "https://en.wikipedia.org/wiki/File:The_Last_Dance_2020.jpg",
            },
            {
                name: "The Queen’s Gambit",
                description: "Miniseries",
                genre: "Drama",
                director: {
                    name: "Scott Frank",
                    bio: "https://en.wikipedia.org/wiki/Scott_Frank",
                    birth_year: "1960",
                    death_year: "-",
             },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/1/12/The_Queen%27s_Gambit_%28miniseries%29.png",
            },
            {
                name: "Training Day",
                description: "Crime Thriller",
                genre: "Crime",
                director: {
                    name: "Antoine Fuqua",
                    bio: "https://en.wikipedia.org/wiki/Antoine_Fuqua",
                    birth_year: "1966",
                    death_year: "-",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/b/b3/Training_Day_Poster.jpg",
            },
            {
                name: "What's Eating Gilbert Grape",
                description: "Period Drama",
                genre: "Drama",
                director: {
                    name: "Lasse Hallström",
                    bio: "https://en.wikipedia.org/wiki/Lasse_Hallstr%C3%B6m",
                    birth_year: "1946",
                    death_year: "-",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/5/5c/What%27s_Eating_Gilbert_Grape_poster.png",
            },
            {
                name: "The Whole Truth",
                description: "Thriller",
                genre: "Drama",
                director: {
                    name: "Courtney Hunt",
                    bio: "https://en.wikipedia.org/wiki/Courtney_Hunt",
                    birth_year: "1964",
                    death_year: "-",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/a/a8/TheWholeTruth_2016poster.jpg",
            },
            {
                description: "Musical Drama",
                name: "My Fair Lady",
                genre: "Romance",
                director: {
                    name: "George Cukor",
                    bio: "https://en.wikipedia.org/wiki/George_Cukor",
                    birth_year: "1899",
                    death_year: "1923",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/d/d5/My_fair_lady_poster.jpg",
            },
            {
                name: "Ma Rainey’s Black Bottom",
                description: "Music",
                genre: "Drama",
                director: {
                    name: "George C. Wolfe",
                    bio: "https://en.wikipedia.org/wiki/George_C._Wolfe",
                    birth_year: "1954",
                    death_year: "-",
                },
                image_URL: "https://upload.wikimedia.org/wikipedia/en/1/19/Stranger_Things_Poster.jpg",
            },
            {
                name: "Nomadland",
                description: "Period Drama",
                genre: "Drama",
                director: {
                    name: "Chloé Zhao",
                    bio: "https://en.wikipedia.org/wiki/Chlo%C3%A9_Zhao",
                    birth_year: "1982",
                    death_year: "-",
                },
                image_URL: "https://en.wikipedia.org/wiki/Nomadland_(film)#/media/File:Nomadland_poster.jpeg",
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
        Movies.find()
          .then((movies) => {
              res.status(201).json(movies);
          })
          .catch((err) => {
              console.error(err);
              res.status(500).send("Error: " + err);
          });
    });

    app.get('/movies/:title', (req, res) => {
        Movie.findOne({ Title: req.params.Title })
          .then((movie) => {
              res.json(movie);
          })
          .catch((err) => {
              console.error(err);
              res.status(500).send("Error: " + err);
          });
    });


    app.get('/movies/directors/:name', (req, res) => {
        let moviesByDirector = movies.filter( function(movie){ return movie.director.name === req.params.name} )
        res.json(moviesByDirector);
    });

    app.get('/movies/genre/:name', (req, res) => {
        let moviesByGenre = movies.filter( function(movie){ return movie.genre === req.params.name} )
        res.json(moviesByGenre);
    });
  

    app.post('/movies', (req, res) => {
        let newMovie = req.body;

        if(!newMovie.title) {
            const message = 'Missing title in request body';
            res.status(400).send(message);
        }else {
            newMovie.id = uuid.v4();
            movies.push(newMovie);
            res.status(201).send(newMovie);
        }
    });

    app.delete('/movies/remove/:title', (req, res) => {
        res.send('Successful delete request returning list with movies removed that were deleted');
    });

    //--------User requests--------

    app.get('/users', (req, res) => {
        Users.find()
            .then(function (users) {
                res.status(201).json(users);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("Error:" + err);
            });
    });

    app.post('/users', (req, res) => {
       Users.findOne({Username: req.body.Username })
         .then((user) => {
             if (user) {
                 return res.status(400).send(req.body.Username + "already exists")
             } else {
                 Users.create({
                     Username: req.body.Username,
                     Password: req.body.Password,
                     Email: req.body.Email,
                     Birthday: req.body.Birthday,
                 })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send("Error: " + error);
                    });
             }
         })
    });

    app.put('/users/:username', (req, res) => {
        let newData = req.body;

        let user = user.find((user) => { return user.username === req.params.username});
    
        if (newData.email) {
            user.email = newData.email;
        }
        if (newData.password) {
            user.passowrd = newData.password;
        }
        if (newData.birthday) {
        user.birthday = newData.birthday;
    }
        res.json({user})
    });


    app.delete('/users/delete/:id', (req, res) => {
        let user = user.find((user) => { return user.id === req.params.id});

            if (user) {
                user = user.filter( (user) => { return user.id !== req.params.id});
                res.status(201).send('User' + req.params.id + 'was deleted.');
            }else {
                res.status(201).send('User not found.');
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

    
    