const express = require("express");
const app = express();
const compression = require("compression");
const bcrypt = require("bcryptjs");
const db = require("./db");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");

/////////////////////////////////////////
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////////////////////////////////////////

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

app.get("/find-users", function (req, res) {
    console.log("req.query.search: ", req.query.search);
    if (req.query.search) {
        db.searchForUsers(req.query.search)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("some error while doing a search for users: ", err);
            });
    } else {
        db.findRecentUsers()
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("some error finding mos recent members: ", err);
            });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, function (req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    const { filename } = req.file;
    console.log("data from uploaded file: ", filename);

    if (req.file) {
        let fullUrl = "https://s3.amazonaws.com/spicedling/" + filename;
        db.updateProfilePic(req.session.userId, fullUrl)
            .then((result) => {
                console.log("result after insert into DB: ", result);
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.log("some error with DB: ", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});

function hashPass(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

function compare(password, hash) {
    return bcrypt.compare(password, hash);
}

app.use(express.json());

app.post("/profile/biography.json", (req, res) => {
    db.updateBiography(req.session.userId, req.body.currentBio)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("Some error updating bio", err);
        });
});

app.get("/user.json", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("Some error getting user info", err);
        });
});

app.post("/password/reset/verify.json", (req, res) => {
    console.log("req.body: ", req.body);
    const { email, resetCode, password } = req.body;
    db.getCurrentResetCodesByEmail(email)
        .then(({ rows }) => {
            console.log("Infos from that user: ", rows[0]);
            if (rows[0].code == resetCode) {
                hashPass(password)
                    .then((hash) => {
                        console.log("hass:", hash);
                        db.updatePasswordByEmail(email, hash)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("Error: ", err.message);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "Some error hashing the password: ",
                            err.message
                        );
                        res.json({ success: false });
                    });
            }
        })
        .catch((err) => {
            console.log(
                "Some error getting the resetCode from DB: ",
                err.message
            );
        });
});

app.post("/password/reset/start.json", (req, res) => {
    const { email } = req.body;
    db.getUserByEmail(email)
        .then(({ rows }) => {
            console.log("User with that email has Id: ", rows[0].id);
            const secretCode = cryptoRandomString({ length: 6 });
            db.addSecretCode(email, secretCode)
                .then(() => {
                    const recipient = email;
                    ses.sendEmail(recipient, secretCode, "Reset Code")
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("error sending email: ", err.message);
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log("error sending email: ", err.message);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log(
                "(reset) User does not exist in our DB, error: ",
                err.message
            );
            console.log("notifying the component...");
            res.json({ success: false });
        });
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
                        req.session.userId = rows[0].id;
                        console.log("req.session:", req.session);
                        console.log("req.session.userId: ", req.session.userId);
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

app.get("/logout.json", function (req, res) {
    req.session = null;
    res.redirect("/");
});

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
