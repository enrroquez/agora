// Image Upload

// Let's add a third component, also a child of App, that is only visible after the user clicks on the profile pic.

// Munity image upload

// This Uploader component should display as a modal. Whether or not it is displayed should be determined by a property (called, for example, uploaderIsVisible) of the state of the App component. ProfilePic should be passed a function from App for setting this property to true.

// The Uploader component should be passed a function for setting the profilePicUrl of the App component's state. After a successful upload, it should call this function and pass to it the url of the image that was just uploaded (your POST route on the server will have to include this url in the response it sends). This should cause ProfilePic to automatically switch to the new image. The function for setting profilePicUrl should also set uploaderIsVisible to false.

import React from "react";

export default class uploader extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in uploader: ", props);
        this.state = {};
        console.log("this.state in uploader: ", this.state);
        this.fileSelectHandler = this.fileSelectHandler(this);
        this.clickHandler = this.clickHandler(this);
    }

    fileSelectHandler(e) {
        console.log("fileSelectHandler's e: ", e);
        console.log("fileSelectHandler's e.target: ", e.target);
        this.file = e.target.files[0];
        console.log("fileSelectHandler's this.file: ", this.file);
    }

    clickHandler(e) {
        e.preventDefault();
        console.log("user just submitted, got parameter e: ", e);
        console.log("clickHandler's this.file: ", this.file);
        const fd = new FormData();
        fd.append("file", this.file);
        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response when upload: ", response);
            })
            .catch((err) => {
                console.log("err submitting new profilepic", err);
            });
    }

    render() {
        console.log("we are rendering the form in the uploader component");
        return (
            <>
                <br />
                <div className="someClass">
                    <div>or add your image to the profile now!</div>
                    <br />
                    <form>
                        <input
                            onChange={this.fileSelectHandler}
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button onClick={this.clickHandler}>Submit</button>
                    </form>
                </div>
            </>
        );
    }
}

// When the change event happens on that input field it should create a FormData and do a POST request
// When the promise from the fetch call is resolved, then Uploader knows the new image url. It needs to pass the new image url to a function that App created and passed to Uploader so that App can put the new url in its state

// const aws = require("aws-sdk");
// const fs = require("fs");

// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env; // in prod the secrets are environment variables
// } else {
//     secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
// }

// const s3 = new aws.S3({
//     accessKeyId: secrets.AWS_KEY,
//     secretAccessKey: secrets.AWS_SECRET,
// });

// exports.upload = (req, res, next) => {
//     //why do we use export?
//     // if there is no file! send an error message!
//     if (!req.file) {
//         return res.sendStatus(500);
//     }

//     // we only want to talk to s3 IF we have a file!
//     // console.log("file: ", req.file);
//     const { filename, mimetype, size, path } = req.file;

//     const promise = s3
//         .putObject({
//             Bucket: "spicedling",
//             ACL: "public-read",
//             Key: filename,
//             Body: fs.createReadStream(path),
//             ContentType: mimetype,
//             ContentLength: size,
//         })
//         .promise();

//     promise
//         .then(() => {
//             // it worked!!!
//             console.log("aws upload worked!");
//             fs.unlink(path, () => {});
//             next();
//         })
//         .catch((err) => {
//             // uh oh
//             console.log("err in s3 upload: ", err);
//             res.sendStatus(404);
//         });
// };
