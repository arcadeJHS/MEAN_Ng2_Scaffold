var express = require('express'),
    path = require('path'),
    port = process.env.PORT || 3000,
    app = express(),
    index = require('./server/routes/index'),
    scores = require('./server/routes/scores');

app.use('/api/', scores);
app.use('/app', express.static(path.resolve(__dirname, 'client/app')));
app.use('/styles', express.static(path.resolve(__dirname, 'client/styles')));
app.use('/media', express.static(path.resolve(__dirname, 'client/media')));
app.use('/libs', express.static(path.resolve(__dirname, 'client/libs')));
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