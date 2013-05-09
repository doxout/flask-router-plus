var frp = require('../index');
var http = require('http');
var test = require("tap").test;

function tst(cb, done) {
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

test('usePath', function(t) {
    t.plan(1);
    tst(function(app, router, server, done) {
        router.get('/t', function(req, res) {
            t.equals(req.usePath, '/test', 'checking usePath');
            res.end(200);
            done();
        });
        app.use('/test', router.route);
        http.get(server + '/test/t');
    }, t.end.bind(t));
});

test('router.use', function(t) {
    t.plan(1);
    tst(function(app, router, server, done) {
        router.use('/tx', function(req, res) {
            t.equals(req.url, '/ty', 'checking req.url in sub-use')
            res.end(200);
            done();
        });
        app.use('/test', router.route);
        http.get(server + '/test/tx/ty');
    }, t.end.bind(t));
});


