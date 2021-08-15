const express = require('express'),
  bodyParser = require('body-parser'),       
  uuid = require('uuid');
const { Movie } = require('./models.js');

  morgan = require('morgan'),
  app = express(),      
  mongoose = require('mongoose');
  Models = require('./models.js');
        
  Movies = Models.Movie;
  Users = Models.User;
 

  mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });

    

     
    app.use('/documentation.html', express.static('public'));

    app.use(morgan('common'));
    
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    let auth = require('./auth')(app);
    const passport = require('passport');
    require('./passport');
    

//---------Returns Movies Home Page--------
app.get('/', (req, res) => {
    res.send('Welcome to My Flix');
});

//----Returns all movies----
    app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.find()
          .then((movies) => {
              res.status(201).json(movies);
          })
          .catch((err) => {
              console.error(err);
              res.status(500).send("Error: " + err);
          });
    });

//-----Returns movies by Title-----
    app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.findOne({ Title: req.params.Title })
          .then((movie) => {
             res.json(movie);
          })
          .catch((err) => {
              console.error(err);
              res.status(500).send("Error: " + err);
          });
    });

//------Returns a list of all movie directors----
    app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.find()
        .then( movies => {
            let directors = movies.map(movie => movie.Director);
            res.status(201).json(directors)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
  });
    
//-------Returns a list of all genres------
    app.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.find()
        .then( movies => {
            let Genre = movies.map(movie => movie.Genre);
            res.status(201).json(Genre)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
  });
    
//--------Returns a movie by genre------
    app.get('/movies/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
       Movie.find({"Genre.Name": req.params.name})
       .then( movies => {
           res.status(201).json(movies)
       })
       .catch((err) => {
           console.error(err);
           res.status(500).send("Error: " + err);
       });
    });
  
    //--------User requests--------

    //------Show User List------
    app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.find()
            .then(function (users) {
                res.status(201).json(users);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("Error:" + err);
            });
    });

    //------Adding a new User-----
    app.post('/users', (req, res) => {
       Users.findOne({Username: req.body.Username })
        .then((user) => {
             if (user) {
                 return res.status(400).send(req.body.Username + " already exists")
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
                        res.status(500).send("Error: " + error);
                    });
             }
         })
    });


    //-----Updating a users information
    app.put('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
       Users.findOne({_id: req.params.id })
       .then((user) => {
           if (!user) {
               return res.status(400).send(req.body.Username + " does not exist")
           } else {
               let updateObject = {};
               if (req.body.Username) {
                   updateObject.Username = req.body.Username;
               }
               if (req.body.Password) {
                   updateObject.Password = req.body.Password;
               }
               if (req.body.Email) {
                   updateObject.Email = req.body.Email;
               }
               if (req.body.Birthday) {
                   updateObject.Birthday = req.body.Birthday;
               }
               Users
               .findByIdAndUpdate({_id: req.params.id}, updateObject, {new: true})
               .then((user) => {
                   res.status(201).json(user);
               })
               .catch((error) => {
                   res.status(500).send("Error: " + error);
               });
           }
       })
    });


//--------Delete an existing user-----
    app.delete('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOne({_id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(400).send(req.body.Username + " does not exist")
            } else {
                Users
                .findOneAndDelete({_id: req.params.id})
                .then((user) => {
                    res.status(201).json(user);
                })
                .catch((error) => {
                    res.status(500).send("Error: " + error);
                });
            }
        })
    });

    //------Add Movies to Users favorites-----
    app.post('/users/:id/movies/:Title',  passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOneAndUpdate({_id: req.params.id }, {
          $push: { FavoriteMovies: req.params.Title}
        }),
        { new: true}, // update is returned  
         ((err, user) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            }else {
                res.json(user);
            }
        });
    });

    //------Delete Movies from Users Favorites-----
    app.delete('/users/:id/movies/:Title',  passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOneAndUpdate({_id: req.params.id }, {
          $pull: { FavoriteMovies: req.params.Title}
        }),
        { new: true}, // update is returned  
         ((err, user) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            }else {
                res.json(user);
            }
        });
    });
   
    

    

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });

    
    
