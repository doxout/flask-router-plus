var frp = require('../index'),
    http = require('http');

function test(cb, done) {
    var app = require('flask-router/node_modules/connect')()    
    var router = frp();
    var port = (30000 + Math.random() * 10000).toFixed(0);
    var server = http.createServer(app).listen(port, function() {
        cb(app, router, 'http://localhost:'+port, function(k) {
            if (k) return;
            server.close();
            done();
        });
    });
};

exports['usePath'] = function(t) {
    t.expect(1);
    test(function(app, router, server, done) {
        router.get('/t', function(req, res) {
            t.equals(req.usePath, '/test', 'checking usePath');
            res.end(200);
            done();
        });
        app.use('/test', router.route);
        http.get(server + '/test/t');
    }, t.done.bind(t));
};

exports['router.use'] = function(t) {
    t.expect(1);
    test(function(app, router, server, done) {
        router.use('/tx', function(req, res) {
            t.equals(req.url, '/ty', 'checking req.url in sub-use')
            res.end(200);
            done();
        });
        app.use('/test', router.route);
        http.get(server + '/test/tx/ty');
    }, t.done.bind(t));
};

exports['res.send'] = function(t) {
    t.expect(1);
    test(function(app, router, server, done) {
        router.use('/tx', function(req, res) {
            t.equals(req.url, '/ty', 'checking req.url in sub-use')
            res.send(200, {error: null});
            done();
        });
        app.use('/test', router.route);
        http.get(server + '/test/tx/ty');
    }, t.done.bind(t));
};

