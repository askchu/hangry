if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const zomato = require('zomato-api');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');
const userRoutes = require('./routes/users');
const hangryRoutes = require('./routes/hangry');
// const { MongoStore } = require('connect-mongo');
const MongoDBStore = require('connect-mongo')(session);


app.engine('ejs', ejsMate);
// ejs tool for using boilerplate layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
// This make it so that req.body will be parsed and able to use the information 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || "thisisasecret";


// dbURL = process.env.DB_URL || 
dbURL = 'mongodb://localhost:27017/hangry';
// Connects to mongoDB Atlas or current computer storage
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//Checks for Mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected...")
})

const store = new MongoDBStore({
    url: dbURL,
    secret,
    touchAfter: 24 * 60 * 60
    // lazy update the session, by limiting a period of time. if a data has changed, it'll be saved and updated. 
    // if its the same as it was, dont continiously update the page
});

store.on("Eror", function (e) {
    console.log("Session Store Error", e)
})
const sessionOption = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    // These two {resave & saveUninitialized} makes the deprecation warnings go away
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        // milliseconds, seconds, minutes, hours, days
        maxAge: 1000 * 60 * 60 * 24 * 7
        // this sets the expiry to a week from today
    }
};


app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// Use localstrategy >> the authentication method is located in the user model

passport.serializeUser(User.serializeUser());
// How we store a user in a session
passport.deserializeUser(User.deserializeUser());
// How to unstore it in a session

// CONNECT-FLASH 
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // In all templates, have access to current user
    // Check navbar - for if user is logged in, you can see logout
    // If user is not logged in, they only see register & login
    res.locals.success = req.flash('success');
    // By putting res.locals..... You will have access in your templates automatically
    res.locals.error = req.flash('error');
    next();
});

// Route Handlers

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/', userRoutes);
app.use('/hangry', hangryRoutes);




app.listen(3000, (req, res) => {
    console.log("Server connected...");
});