import React from "react";
import ProfilePic from "./profilePic";
// import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
    }

    componentDidMount() {
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                //first name, last name, etc.
                this.setState(data);
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
                    </div>
                }
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={this.showUploader}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader hideUploader={this.hideUploader} />
                )}
            </>
        );
    }
}
