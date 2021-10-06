 const LocalStrategy = require('passport-local').Strategy;



function initialize(passport,getUserByUsername,getUserById){
    const authenticateUser = (username,done) => {
        const user = getUserByUsername(username)
        if(user => null){
            return done(null,false,{message: 'No user with that username'})
        }
        return done(null,user)
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user,done) => done(null,user.id)) 
    passport.deserializeUser((id,done) => done(null,getUserById(id)))
}

module.exports = initialize