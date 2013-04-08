# flask router plus

Flask router upgrade that adds `router.use` and `request.usePath` to easily nest isolated routers

### request.usePath

For every request sent to the router, returns the use path of the router i.e. the path in `connect.use(path, flaskRouter)` 

### router.use 

    router.use('/path', middleware, ...)

Like router.all, but modifies `req.url` to remove the path

