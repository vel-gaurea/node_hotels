const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send("Welcome to our Hotel, How can i help you sir");
})

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




const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is listening on 3000")
});
