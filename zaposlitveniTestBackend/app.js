
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var User = require("./models/userModel")

// vključimo mongoose in ga povežemo z MongoDB
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1/CompanyEmployeesAplication";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// vključimo routerje
var usersRouter = require('./routes/userRoutes');

var app = express();

const createUsers = async () => {
  const users = [
    {
      name: 'John Doe',
      username: 'jdoe',
      email: 'jdoe@example.com',
      phone: '123-456-7890',
      website: 'http://jdoe.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4',
        city: 'Springfield',
        zipcode: '12345',
        geo: { lat: 40.7128, lng: -74.0060 }
      },
      company: {
        name: 'Doe Enterprises',
        catchPhrase: 'Innovating the Future',
        bs: 'Tech Solutions'
      }
    },
    {
      name: 'Jane Smith',
      username: 'jsmith',
      email: 'jsmith@example.com',
      phone: '234-567-8901',
      website: 'http://jsmith.com',
      address: {
        street: '456 Oak Rd',
        suite: 'Suite 2B',
        city: 'Metropolis',
        zipcode: '54321',
        geo: { lat: 34.0522, lng: -118.2437 }
      },
      company: {
        name: 'Smith Industries',
        catchPhrase: 'Pioneering Excellence',
        bs: 'Global Services'
      }
    },
    {
      name: 'Bob Johnson',
      username: 'bjohnson',
      email: 'bjohnson@example.com',
      phone: '345-678-9012',
      website: 'http://bjohnson.com',
      address: {
        street: '789 Pine St',
        suite: 'Unit 3',
        city: 'Gotham',
        zipcode: '67890',
        geo: { lat: 51.5074, lng: -0.1278 }
      },
      company: {
        name: 'Johnson Solutions',
        catchPhrase: 'Your Trusted Partner',
        bs: 'Consulting'
      }
    },
    {
      name: 'Alice Brown',
      username: 'abrown',
      email: 'abrown@example.com',
      phone: '456-789-0123',
      website: 'http://abrown.com',
      address: {
        street: '321 Maple Ave',
        suite: 'Apt 10',
        city: 'Star City',
        zipcode: '11223',
        geo: { lat: 48.8566, lng: 2.3522 }
      },
      company: {
        name: 'Brown Innovations',
        catchPhrase: 'Reinventing the Future',
        bs: 'Tech Innovations'
      }
    }
  ];




  try {
    // Preverimo, če uporabniki že obstajajo
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      // Če ni uporabnikov, jih dodamo
      const savedUsers = await User.insertMany(users);
      console.log('Uporabniki so bili uspešno dodani:', savedUsers);
    } else {
      console.log('Uporabniki že obstajajo, preskočili smo dodajanje.');
    }
  } catch (err) {
    console.error('Napaka pri dodajanju uporabnikov:', err);
  }
};


createUsers();





var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:5500'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);


// error handler
app.use(function(err, req, res, next) {
  // Log the error details for debugging purposes
  console.error("Error occurred:", err);

  // Set locals, providing error details in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send a detailed JSON error response (useful for debugging)
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});


module.exports = app;
