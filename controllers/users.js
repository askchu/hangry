const User = require('../models/user');

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.registerPost = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            // After registering, you are immediately logged in. 
            if (err) return next(err);
            req.flash('success', 'Welcome to Hangry!');
            res.redirect('/hangry');
        }) 
       } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/hangry';
    delete req.session.returnTo;
    // takes you back to the original page you were before login page popped up
    // deletes the session value of "returnTo"
    res.redirect(redirectUrl);
};

module.exports.favoritePage = (req, res) => {
    
    res.render('users/favorites');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "See you next time!");
    res.redirect('/hangry');
};