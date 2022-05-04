import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilePic";
import Uploader from "./Uploader";
import Profile from "./profile";
import FindPeople from "./FindPeople";
import OtherProfile from "./OtherProfile";
import { Link } from "react-router-dom";
import InlineCommenting from "./InlineCommenting";
import InlineCommenting2 from "./InlineCommenting_ver2";

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
                <BrowserRouter>
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
                            <br />
                            <Link className="textToButton" to="/">
                                Home
                            </Link>
                            <> </>
                            <Link className="textToButton" to="/commenting">
                                Text analisys
                            </Link>
                            <> </>
                            <button onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                    <Route exact path="/">
                        <Profile
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            showUploader={this.showUploader}
                            biography={this.state.biography}
                            setBio={this.setBio}
                        />
                    </Route>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            hideUploader={this.hideUploader}
                            updateProfilePic={this.updateProfilePic}
                        />
                    )}
                    <Route path="/users">
                        <FindPeople />
                    </Route>
                    <Route exact path="/user/:id">
                        <OtherProfile />
                    </Route>
                    <Route exact path="/commenting">
                        <InlineCommenting />
                    </Route>
                    <Route exact path="/commenting2">
                        <InlineCommenting2 />
                    </Route>
                    <div className="inFooter">
                        <h3>
                            Welcome {this.state.first} {this.state.last}!
                        </h3>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
