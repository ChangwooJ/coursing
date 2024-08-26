const passport = require('../passport/passport-config');
const db = require('./DBinfo');

const postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: '인증 실패' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: '인증 성공' });
        });
    })(req, res, next);
}

const postLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 실패', error: err });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({ message: '로그아웃 성공' });
        });
    });
};

const getLogged = (req, res) => {
    if (req.isAuthenticated()) {
        const query = `
        SELECT 
        user_info.* 
        FROM coursing.user 
        LEFT JOIN coursing.user_info ON user.id = user_info.user_id 
        WHERE user.username = ?
        ;`;

        const params = req.user.username;

        db.query(query, params,(err, result) => {
            if (err) {
                res.status(500).send(err);
                console.log('X');
            } else {
                res.status(200).json({ isAuthenticated: true, user: req.user, user_info: result });
            }
        })
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
}


module.exports = { postLogin, postLogout, getLogged };