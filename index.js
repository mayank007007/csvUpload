const express = require('express');
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');

app.use(express.urlencoded());
app.use(express.static('./assets'));

//make the uploads path available to the browser
//When a client makes a request to a URL that starts with /uploads, this middleware will be triggered.
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);

});