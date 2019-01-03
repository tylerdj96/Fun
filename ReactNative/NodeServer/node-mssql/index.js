var express = require('express');
const sql = require('mssql')

var app = express();

app.set('view engine', 'ejs');


// Enable tcp protocol for sql server, set the sttaic port to 1433 for all ips, restart the server

//const DbConnectionString = 'mssql://{user-name}:{password}@{db-server-ip}:{sql-server-port}/{db-name}';
//const DbConnectionString = 'mssql://sa:x4p3m0nk3yx@127.0.0.1:1433/SimpleArmory';

const dbConfig = {
    server: 'localhost',
    database: 'SimpleArmory',
    user: 'sa',
    password: 'x4p3m0nk3yx',
    port: 1433
};

sql.connect(dbConfig, (err) => {
    if (err) {
        console.log('Error connecting to DB... ' + err.stack);
    }
    else {
        console.log('SQL Server Connected...')
    }
});

//var executeQuery = (response, query) => {
//    sql.connect(dbConfig, (err) => {
//        if (err) {
//            console.log('Error connecting to db, error was: ' + err.stack);
//            res.send(err.stack);
//        }
//        else {
//            //Create a request object
//            var request = new sql.Request();
//            //send the query to the db
//            request.query(query, (err, res) => {
//                if (err) {
//                    console.log('Error while querying the db, error was: ' + err.stack);
//                    res.send(err.stack);
//                }
//                else {
//                    console.log('Successfully queried the db!');
//                    //console.log(res.recordset[0]);

//                    response.setHeader('Content-Type', 'application/json');
//                    //response.send(res);
//                    res.send('some stuff...');
//                }
//            });
//        }
//    });
//    sql.close();
//}

sql.on('error', err => {
    console.dir(err);
    sql.close();
});

//app.get("/", (req, res) => {
//    sql.connect(dbConfig).then(pool => {
//        return pool.request()
//            .query('select * from dbo.PlayerInformation;');
//    }).then(result => {
//        sql.close();
//        res.render("data", { model: result.recordset });
//        console.dir("The table info is:");
//        console.dir(result);
//    }).catch(err => {
//        console.dir(err);
//        sql.close();
//    });
//});

app.get('/FetchPlayerData', (req, res) => {
    const request = new sql.Request();
    let playerName = req.query.PlayerName;
    let query = `SELECT * FROM dbo.PlayerInformation WHERE PlayerName = '${playerName}'`;
    request.query(query, (err, result) => {
        if (err) {
            console.log('Error querying the DB... ' + err.stack);
        }
        else {
            console.log('Successfully queried the DB, sending the response...');
            console.log(result);
            res.send(result);
        }
    });
});


app.get('/SendPlayerData', (req, res) => {
    const request = new sql.Request();
    let playerName = req.query.PlayerName;
    let serverName = req.query.ServerName;
    let twosRating = req.query.twos;
    let threesRating = req.query.threes;

    let query = `INSERT INTO dbo.PlayerInformation VALUES('${playerName}', '${serverName}', '${twosRating}', '${threesRating}')`

    request.query(query, (err, result) => {
        if (err) {
            console.log('Error inserting into the DB... ' + err.stack);
        }
        else {
            console.log('Successfully inserted into the DB!');
            res.send('Inserted player ' + playerName + ' into the DB!');
        }

    });

});

//app.get("/SendData", (req, res) => {

//    console.dir("Hit the post request");

//});

//console.log('test log vs dir');
//console.dir('test');

app.listen("4501", function() {
    console.log("node server listening at port : 4501");
});