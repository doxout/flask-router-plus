var fr = require('flask-router');

module.exports = function () {
    var router = fr();
    var routerRoute = router.route.bind(router);
    router.route = function (req, res, next) {
        req.usePath = req.originalUrl
            .substr(0, req.originalUrl.length
                - req.url.length);
        res.send = function (code, headers, data) {
            if (null == data) { // .send(data), .send(code) or .send(code, data)
                data = headers;
                headers = {};
            }
            if (null == data && typeof(code) != 'number') { // .send(data)
                code = 200;
                data = code;
            }
            var ctype;
            if (typeof(data) == 'string') {
                ctype = 'text/html; charset=utf-8';
            } else if (null != data) {
                ctype = 'application/json';
                data = JSON.stringify(data);
            }
            headers['content-type'] = headers['content-type'] || ctype;
            res.writeHead(code, headers);
            if (null != data) res.write(data);
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
