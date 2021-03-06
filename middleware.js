// const { hangry } = require('./schemas.js');
// const ExpressError = require('./utils/ExpressError');
// const Hangry = require('./models/hangry');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/register');
    }
    next();
}

