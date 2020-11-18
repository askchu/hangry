if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const hangryRoutes = require('./routes/hangry');
const zomato = require('zomato-api');
const mongoose = require('mongoose');





const client = zomato({
    userKey: process.env.ZOMATO
});

app.engine('ejs', ejsMate);
// ejs tool for using boilerplate layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
// This make it so that req.body will be parsed and able to use the information 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));


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


app.get('/', (req, res) => {
    res.render('home');
});

app.use('/hangry', hangryRoutes);



app.listen(3000, (req, res) => {
    console.log("Server connected...");
});