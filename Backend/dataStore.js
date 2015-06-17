function DataProvider() {
    
    var pg = require('pg'),
        model = require('./model.js'),
        connectionString = 'postgres://postgres:' + encodeURIComponent('Password#1') + '@localhost:5432/NodePoc',
        _ = require('lodash');
    
    this.authenticate = function (username, password, callback) {
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                done();
                callback(err, null); return;
            }
            
            client.query('SELECT "Id","Username" FROM "Users" WHERE "Username"=\'' + username + '\'', function (err, result) {
                if (err) {
                    done();
                    callback(err, null); return;
                }
                
                done();
                
                if (result.rows.length === 0) {
                    callback(new Error('Invalid Credentials'), null); return;
                }
                
                callback(null, true);
            });

        });
    };
    
    this.saveUser = function (user, callback) {
        
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                done();
                callback(err, null); return;
            }
            
            client.query('SELECT uuid_generate_v4() AS id', function (err, result) {
                if (err) {
                    done();
                    callback(err, null); return;
                }
                
                user.id = user.id || result.rows[0].id;
                
                client.query('INSERT INTO "Users"("Id", "Username") VALUES($1, $2)', [user.id, user.username], function (err, result) {
                    if (err) {
                        done();
                        callback(err, null); return;
                    }
                    
                    client.query('INSERT INTO "UserDetails"("UserId", "FirstName", "LastName") VALUES ($1, $2, $3)', [user.id, user.details.firstName, user.details.lastName], function (err, result) {
                        if (err) {
                            done();
                            callback(err, null); return;
                        }
                        
                        done();

                        callback(null);
                    });
                    
                });

            });

        });
    };
    
    this.users = function (callback) {
        pg.connect(connectionString, function (err, client, done) {
            if (err) {
                done();
                callback(err, null); return;
            }
            
            client.query('SELECT "Id","Username" FROM "Users"', function (err, result) {
                if (err) {
                    done();
                    callback(err, null); return;
                }
                
                client.query('SELECT * FROM "UserDetails"', function (err, details) {
                    
                    if (err) {
                        done();
                        callback(err, null); return;
                    }
                    
                    done();
                    
                    callback(null, _.map(result.rows, function (row) {
                        var user = new model.User(row.Id, row.Username),
                            detailsRow = _.find(details.rows, { UserId: user.id });
                        
                        if (detailsRow) {
                            user.details.firstName = detailsRow.FirstName;
                            user.details.lastName = detailsRow.LastName;
                        }
                        
                        return user;
                    }));
                });
            });

        });
    };
}

module.exports = new DataProvider();