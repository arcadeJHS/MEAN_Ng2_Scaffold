var express = require('express'),
    path = require('path'),
    port = process.env.PORT || 3000,
    app = express(),
    index = require('./backend/routes/index'),
    scores = require('./backend/routes/scores');

app.use('/api/', scores);
app.use('/app', express.static(path.resolve(__dirname, 'webapp/app')));
app.use('/styles', express.static(path.resolve(__dirname, 'webapp/styles')));
app.use('/libs', express.static(path.resolve(__dirname, 'webapp/libs')));
app.use('/', index);

// 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// start server
var server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});