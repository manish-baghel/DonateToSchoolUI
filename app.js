var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = require('./ApplicationInstance');
var compression = require('compression');
var mainRoutes = require('./backend/routes/MainRoutes');
const env = require('./env');

app.use(compression());
app.use(favicon(path.resolve(__dirname, 'favicon.png')));
app.use(express.static(path.resolve(__dirname, 'client')));

app.set('port',env.PORT);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/', mainRoutes);
app.listen(app.get('port'), function () {
    console.log('Application running in port '+ app.get('port'));
});