const db = require("mysql2");

const con = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

process.on("SIGINT", () => {
    con.end((err) => {
        if (err) {
            console.log("종료 실패 : ", err.message);
        } else {
            console.log("종료 성공 : ", con.threadId);
        }

        process.exit(0);
    });
});

module.exports = con.promise();
