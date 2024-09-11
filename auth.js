const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const Person = require('./models/Person')

passport.use(new LocalStratergy(async (username, password, done) => {
    try {
        console.log("Received Credentials:");
        const user = await Person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' })
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (isPasswordMatch) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        }
    } catch (err) {
        return done(err)
    }
}));

module.exports = passport