import React from "react";
import ProfilePic from "./profilePic";
import Uploader from "./Uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.setBio = this.setBio.bind(this);
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

    setBio(newBio) {
        this.setState({
            biography: newBio,
        });
    }

    // To Uploader the App component must pass a function that gets passed an image url and puts it in App's state. Uploader can call this function after it uploads a new image.

    updateProfilePic(newImageUrl) {
        // console.log("updateProfilePic' newImageUrl: ", newImageUrl);
        this.setState({
            imageUrl: newImageUrl,
        });
        console.log("this.state in updateProfilePic: ", this.state);
    }

    render() {
        //whenever state changes render runs again
        if (!this.state.id) {
            return <img src="/spinner.gif" alt="Loading..." height="200vh" />;
        }

        function logout() {
            fetch("/logout.json").then(() => location.replace("/"));
        }

        console.log("this.state in app: ", this.state);

        return (
            <>
                {
                    <div className="inHeader">
                        <div>
                            <img src="./agora.jpg" alt="logo" height="100px" />
                            <h3>
                                Agora <br />
                                <em>the public sphere</em>
                            </h3>
                        </div>
                        <div>
                            <ProfilePic
                                imageUrl={this.state.imageUrl}
                                first={this.state.first}
                                last={this.state.last}
                                showUploader={this.showUploader}
                                style={"imgInHeader"}
                            />
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                }
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                    showUploader={this.showUploader}
                    biography={this.state.biography}
                    setBio={this.setBio}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        hideUploader={this.hideUploader}
                        updateProfilePic={this.updateProfilePic}
                    />
                )}
                {
                    <div className="inFooter">
                        <h3>
                            Welcome {this.state.first} {this.state.last}!
                        </h3>
                    </div>
                }
            </>
        );
    }
}
