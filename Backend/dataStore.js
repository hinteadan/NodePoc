function DataProvider() {
    
    var pg = require('pg'),
        model = require('./model.js'),
        connectionString = 'postgres://postgres:' + encodeURIComponent('Password#1') + '@localhost:5432/NodePoc',
        _ = require('lodash');
    
    this.users = function (callback) {
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                callback(err, null); return;
            }
            
            client.query('SELECT "Id","Username" FROM "Users"', function (err, result) {
                if (err) {
                    callback(err, null); return;
                }
                
                client.end();
                
                callback(null, _.map(result.rows, function (row) {
                    return new model.User(row.Id, row.Username);
                }));
            });

        });
    };
}

module.exports = new DataProvider();