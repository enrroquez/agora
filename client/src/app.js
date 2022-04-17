import React from "react";
import ProfilePic from "./profilePic";
import Uploader from "./Uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic(this);
    }

    componentDidMount() {
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                //first name, last name, etc.
                this.setState(data);
            })
            .catch((err) => {
                console.log("error fetching user", err.message);
            });
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    hideUploader() {
        this.setState({
            uploaderIsVisible: false,
        });
    }

    updateProfilePic(newImageUrl) {
        this.setState({
            imageUrl: newImageUrl,
        });
    }

    // To Uploader the App component must pass a function that gets passed an image url and puts it in App's state. Uploader can call this function after it uploads a new image.

    providesImageUrlToState(imageUrl) {
        this.setState({
            imageUrl: imageUrl,
        });
    }

    render() {
        //whenever state changes render runs again
        if (!this.state.id) {
            return <img src="/spinner.gif" alt="Loading..." height="200vh" />;
        }
        return (
            <>
                {
                    <div className="someClass">
                        <img src="./agora.jpg" alt="logo" height="200vh" />
                        <h2>
                            Agora: <em>the public sphere</em>
                        </h2>
                    </div>
                }
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={this.showUploader}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        hideUploader={this.hideUploader}
                        updateProfilePic={this.updateProfilePic}
                    />
                )}
            </>
        );
    }
}
