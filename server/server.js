const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./db");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());

let sessionSecret = require("../secrets.json").SESSION_SECRET;

app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// you will have a bunch more code here, remember to add your middlewares
// remember to set up a route for registration

function hashPass(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

function compare(password, hash) {
    return bcrypt.compare(password, hash);
}

app.use(express.json());

///incorporar ses.js

app.post("/reset.json", (req, res) => {
    const { email } = req.body;
    console.log("email: ", email);

    // Confirm that there is a user with the submitted email address
    db.getUserByEmail(email)
        .then(({ rows }) => {
            console.log("User with that email has Id: ", rows[0].id);

            // Generate a secret code and store it so it can be retrieved later
            // const secretCode = cryptoRandomString({ length: 6 });<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

            // Put the secret code into an email message and send it to the user

            res.json({ success: true });
        })
        .catch((err) => {
            console.log(
                "(reset) User does not exist in our DB, error: ",
                err.message
            );
            console.log("notifying the component...");
            res.json({ success: false });
        });

    // res.json({ success: true });
});

app.post("/register.json", (req, res) => {
    console.log("req.body when calling post to register.json: ", req.body);
    const { first, last, email, password } = req.body;
    hashPass(password)
        .then((hash) => {
            console.log("hass:", hash);
            db.addUser(first, last, email, hash)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Error: ", err.message);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("Some error hashing the password: ", err.message);
            res.json({ success: false });
        });
});

app.post("/login.json", (req, res) => {
    console.log("req.body when calling post to login.json: ", req.body);
    const { email, password } = req.body;
    db.getUserByEmail(email)
        .then(({ rows }) => {
            console.log("rows: ", rows);
            console.log("rows[0].id: ", rows[0].id);
            compare(password, rows[0].hashpass)
                .then((match) => {
                    if (match) {
                        console.log("comparison matched!");
                        req.session.userId = rows[0].id; // req.session.userId está disponible en cualquier route?
                        console.log("req.session:", req.session);
                        console.log("req.session.userId: ", req.session.userId);
                        // res.json({userId: req.session.userId});
                        res.json({ success: true });
                    } else {
                        console.log(
                            "Hashed passwords comparison did not matched!"
                        );
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        })
        .catch((err) => {
            res.json({ success: false });
            console.log(
                "(login) User does not exist in our DB, error: ",
                err.message
            );
        });
});

// this is the route we added in the encounter
app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
