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

module.exports.favoritePage = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);
    res.render('users/favorites', { user });
}

module.exports.generateFavorite = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);
    console.log(req.body);

    const length = user.favorites.length + 1;
    const randRestNum = Math.floor(Math.random() * length);
    console.log(randRestNum);

    res.redirect('/favorites');
}

module.exports.editFavorite = async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user);
    // console.log(req.body);
    res.render('users/editFavorites', { user })
}

module.exports.deleteFavorite = async (req, res) => {
    const user = await User.findById(req.user.id);
    const result = req.body
    const id = result.id;
    console.log(id);


    // Removes the restaurant selected
    const x = await User.updateOne({ _id: user }, { $pull: { favorites: { _id: id } } }, { new: true });
    console.log(x);

    res.redirect('/editFavorites');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "See you next time!");
    res.redirect('/hangry');
};