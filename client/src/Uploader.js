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
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
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
            .then(({ image_url }) => {
                console.log("response after upload: ", image_url);
                this.props.hideUploader();
                this.props.updateProfilePic(image_url);
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
