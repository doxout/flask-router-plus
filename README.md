# flask router plus

Bulds upon `flask-router` by adding 2 new features:

### request.usePath

For every request sent to the router, returns the use path of the router i.e. the path in `connect.use(path, flaskRouter)` 

### router.use 

    router.use('/path', middleware, ...)

Like router.all, but modifies `req.url` to remove the path

