var http = require('http'),
    dataStore = require('./dataStore'),
    port = process.env.port || 1337;

http.createServer(function (req, res) {
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
        res.end();
        return;
    }
    
    if (req.method === 'PUT') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk.toString();
        });
        req.on('end', function () {
            
            var loginInfo = JSON.parse(data);
            
            dataStore.authenticate(loginInfo.username, loginInfo.password, function (err) {
                if (err) {
                    res.writeHead(401, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end();
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Length': 2 });
                res.end('{}');
            });
        });
        return;
    }
    
    if (req.method === 'POST') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk.toString();
        });
        req.on('end', function () {
            
            var userDto = JSON.parse(data);
            
            dataStore.saveUser(userDto, function (err) {
                if (err) {
                    res.write(JSON.stringify({ Error: err }), 'utf8');
                    res.end();
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end();
            });
        });
        return;
    }
    
    dataStore.users(function (err, users) {
        if (err) {
            res.write(JSON.stringify({ Error: err }), 'utf8');
            res.end();
            return;
        }
        
        var body = JSON.stringify(users);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE', 'Content-Length': body.length});
        res.end(body);
    });
}).listen(port);