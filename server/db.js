const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/social_db`);

exports.addUser = (first, last, email, hashpass) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashpass)
            VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, hashpass]
    );
};
exports.getUserByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};
