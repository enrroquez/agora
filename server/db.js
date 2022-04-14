const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/social_db`);

exports.getUserInfo = (userId) => {
    return db.query(
        `SELECT id, first, last, email, created_at FROM users WHERE id=$1`,
        [userId]
    );
};

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

exports.getCurrentResetCodesByEmail = (email) => {
    return db.query(
        "SELECT * FROM reset_codes WHERE email=$1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'",
        [email]
    );
};

exports.addSecretCode = (email, secretCode) => {
    return db.query(
        `INSERT INTO reset_codes (email, code)
            VALUES ($1, $2) RETURNING id`,
        [email, secretCode]
    );
};

exports.updatePasswordByEmail = (email, hashpass) => {
    return db.query(`UPDATE users SET hashpass = $2 WHERE email = $1`, [
        email,
        hashpass,
    ]);
};
