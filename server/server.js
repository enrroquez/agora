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
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

app.use(compression());
app.use(express.json());

let sessionSecret = require("../secrets.json").SESSION_SECRET;

app.use(express.static(path.join(__dirname, "..", "client", "public")));
///////////////////////////////////////////////////
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//////////////////////////////////////////////////

app.get(`/citation/:id`, function (req, res) {
    console.log("req.params.id: ", req.params.id);
    db.getOneCitation(req.params.id)
        .then(({ rows }) => {
            console.log("rows from DB in getOneCitation Info: ", rows);
            if (rows.lenght == 0) {
                res.json({ citationDontExist: true });
            } else {
                res.json(rows[0]);
            }
        })
        .catch((err) => {
            console.log("error retriving user data from DB: ", err);
        });
});

app.get(`/getCitations`, (req, res) => {
    db.getPreviousCitations()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("some error finding mos recent members: ", err);
        });
});

// app.post(`/updateCitation`)<<<<<<<<<<<<<<<<

app.post(`/saveSelection`, (req, res) => {
    console.log("req.body: ", req.body);
    // console.log("req.session.userId:", req.session.userId);
    const { capturedSelection } = req.body;
    db.addSelection(
        capturedSelection,
        req.session.citationId,
        req.session.userId
    )
        .then(({ rows }) => {
            console.log(
                "DB selection insert success, what do I get back?: ",
                rows[0]
            );
            req.session.selectionId = rows[0].id;
            res.json({
                success: true,
                "Chi Kung": "cool",
                citationId: req.session.citationId,
            });
        })
        .catch((err) => {
            console.log("error adding citation in DB: ", err);
            res.json({ success: false });
        });
});

app.post(`/saveCitation`, (req, res) => {
    console.log("req.body: ", req.body);
    // console.log("req.session.userId:", req.session.userId);
    const { citationInProgress, authorInProgress, sourceInProgress } = req.body;
    db.addCitation(
        citationInProgress,
        authorInProgress,
        sourceInProgress,
        req.session.userId
    )
        .then(({ rows }) => {
            //Would be good to bring back: name, created_at and send them to client
            console.log(
                "DB citation insert success, what do I get back?: ",
                rows[0]
            );
            req.session.citationId = rows[0].id;
            res.json({
                success: true,
                citationId: rows[0].id,
                userId: req.session.userId,
            });
        })
        .catch((err) => {
            console.log("error adding citation in DB: ", err);
            res.json({ success: false });
        });
    // await db
    //     .findAuthorInfo(citationId)
    //     .then(({ rows }) => {
    //         console.log("DB authors data: ", rows[0]);
    //     })
    //     .catch((err) => {
    //         console.log("Some error in DB select: ", err);
    //     });
});

app.get(`/api/user/:id`, function (req, res) {
    console.log("req.params.id: ", req.params.id);
    db.getUserInfo(req.params.id)
        .then(({ rows }) => {
            console.log("rows from DB in getUser Info: ", rows);
            if (rows.lenght == 0) {
                res.json({ userDontExist: true });
            } else if (req.session.userId == rows[0].id) {
                res.json({ sameUser: true });
            } else {
                res.json(rows[0]);
            }
        })
        .catch((err) => {
            console.log("error retriving user data from DB: ", err);
        });
});

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

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

let onlineUsers = [];

io.on("connection", async (socket) => {
    console.log(`New connection established with user ${socket.id}`);
    onlineUsers.push(socket.id);
    console.log("onlineUsers: ", onlineUsers);
    console.log("socket.request.session: ", socket.request.session);
    console.log(
        "socket.request.session.userId;: ",
        socket.request.session.userId
    );

    socket.emit("greeting", {
        message: "Hello from the server",
    });

    socket.on("thanks", (data) => {
        console.log("data: ", data);
    });

    socket.on("user-click", (data) => {
        console.log("data: ", data);
        console.log("socket.request.session: ", socket.request.session);
        const { userId, citationId } = socket.request.session;
        db.addComment(data.comment, userId, citationId)
            .then(({ rows }) => {
                io.emit(
                    "user-click-inform",
                    `Message sent to the chat: ${data.comment}`
                );
            })

            .catch((err) => {
                console.log("Error: ", err);
            });

        // socket.broadcast.emit("exceptMe", "Hey OTHER PEOPLE");
        // io.to(onlineUsers[0]).emit("private", {
        //     message: "this is such a private message",
        // });
    });

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} just disconnected`);
        // onlineUsers.filter((user) => user !== socket.id);
        let index = onlineUsers.indexOf(socket.id);
        if (index > -1) {
            onlineUsers.splice(index, 1);
        }
        console.log("offlineUser removed: ", onlineUsers);
    });
});
