var fr = require('flask-router'),
    send = require('./lib/send');

module.exports = function () {
    var router = fr();
    var routerRoute = router.route.bind(router);
    router.route = function (req, res, next) {
        req.usePath = req.originalUrl
            .substr(0, req.originalUrl.length
                - req.url.length);
        res.send = function (code, headers, data) {
            var args = send.arguments(code, headers, data);
            res.writeHead(args.code, args.headers);
            if (null != data) res.write(args.data);
            res.end();
        };
        routerRoute(req, res, next);
    };
    router.use = function (usepath) {
        if (usepath[usepath.length - 1] != '/')
            usepath += '/';

        var args = [].slice.call(arguments, 1);
        args.unshift(function (req, res, next) {
            req.url = '/' + req.params.__path;
            next();
        });
        args.unshift(usepath + '<path:__path>');
        this.all.apply(this, args);
    };
    return router;
};
