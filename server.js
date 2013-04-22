var locomotive = require('locomotive'),
    env = process.env.NODE_ENV || 'development',
    port = process.argv[2] || process.env.PORT || 3000,
    address = '0.0.0.0';

locomotive.boot(__dirname, env, function (err, server) {
    if (err) {
        throw err;
    }
    console.log(env);
    server.listen(port, address);
});