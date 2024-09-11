const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const LocalStratergy = require('passport-local').Strategy;
const Person = require('./models/Person')

const bodyParser = require('body-parser');
app.use(bodyParser.json());




// app.get('/user/:slug', (req, res) => {
//     res.send(`You Ordered ${req.params.slug}`);
//     // console.log(`You Ordered ${req.params.slug}`);
// })
// app.get('/chicken', function (req, res) {
//     const CustomizedChicken = {
//         name: "Dragon Chicken",
//         is_spicy: true,
//         serverSoup: true,
//         is_chutney: false
//     }
//     res.send(CustomizedChicken);
// })

// app.get('/daal', function (req, res) {
//     res.send("Serving Daal");
// })

const logRequest = (req, res, next) => {  //MIDDLEWARE FUNCTION
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next(); // MOVE TO THE NEXT PHASE
}

app.use(logRequest);     //MIDDLEWARE 

app.use(passport.initialize());

const LocalAuthMiddleware = passport.authenticate('local',{session:false});


app.get('/',LocalAuthMiddleware, function (req, res) {
    res.send("Welcome to our Hotel, How can i help you sir");
})


const personRoutes = require('./routes/personRoutes');
app.use('/person',LocalAuthMiddleware, personRoutes)

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is listening on 3000")
});
