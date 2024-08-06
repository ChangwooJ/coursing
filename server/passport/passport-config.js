const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../handlers/DBinfo');

passport.use(new LocalStrategy({
    usernameField: 'username',  //전달받은 아이디, 여기서 ''안의 이름과 로그인 폼의 아이디 input의 name 값이 일치해야한다.
    passwordField: 'password'
},
    function (username, password, done) {
        const query = `
        SELECT * FROM coursing.user 
        WHERE username = ?;
      `;

        db.query(query, [username], (err, results) => {
            if (err) {
                return done(err);
            }
            //쿼리문을 이용해 반환값이 없으면 일치하는 아이디가 없는 것
            if (results.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            //이외의 경우(일치하는 아이디 있음)
            const user = results[0];

            if (password !== user.password) {
                console.log("Incorrect password");
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = 'SELECT * FROM coursing.user WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results[0]);
  });
});

module.exports = passport;