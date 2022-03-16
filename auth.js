const db = require('./db/models');

const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
        userName: user.userName,
        userEmail: user.email
    }
}

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth;
        const user = await db.User.findByPk(userId);

        try {
            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }

        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }


    } else {
        res.locals.authenticated = false;
        next();
    }
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/users/login');
    }
    return next();
}

const logoutUser = (req, res) => {
    delete req.session.auth
}

module.exports = {
    loginUser,
    restoreUser,
    logoutUser,
    requireAuth
}
