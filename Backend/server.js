var http = require('http'),
    data = require('./dataStore'),
    port = process.env.port || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    data.users(function (err, users) {
        if (err) {
            res.write(JSON.stringify({ Error: err }), 'utf8');
            res.end();
            return;
        }
        res.write(JSON.stringify(users), 'utf8');
        res.end();
    });
}).listen(port);