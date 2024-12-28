const db = require('mysql2');

const con = db.createConnection({
    host: 'localhost',
    user: 'jomalone',
    password: '123456',
    database: 'jomalone_db',
});

process.on('SIGINT', () => {
    con.end(err => {
        if (err) {
            console.log('종료 실패 : ', err.message);
        } else {
            console.log('종료 성공 : ', con.threadId);
        }

        process.exit(0);
    });
});

module.exports = con.promise();
