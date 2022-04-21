import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        console.log("props in BioEditor: ", props);
        super(props);
        this.state = {
            textAreaIsVisible: false,
            currentBio: this.props.biography,
        };
        this.handleBioChange = this.handleBioChange.bind(this);
        this.showTextArea = this.showTextArea.bind(this);
        this.submitBio = this.submitBio.bind(this);
    }

    handleBioChange(e) {
        this.setState({
            currentBio: e.target.value,
        });
    }

    showTextArea() {
        this.setState({
            textAreaIsVisible: true,
        });
    }

    submitBio(e) {
        e.preventDefault();
        const { currentBio } = this.state;
        console.log("user has submitted a bio update");
        fetch("/profile/biography.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentBio: currentBio }),
        })
            .then((resp) => resp.json())
            .then(({ biography }) => {
                // console.log("response: ", response);
                // console.log("this.props in bioEditor: ", this.props);
                this.props.setBio(biography);
                this.setState({
                    textAreaIsVisible: false,
                });
            })
            .catch((err) => {
                console.log("error submitting bio update: ", err);
            });
    }

    render() {
        return (
            <div>
                {this.state.textAreaIsVisible && (
                    <>
                        <div id="bioBox">
                            <textarea
                                value={this.state.currentBio}
                                onChange={this.handleBioChange}
                                resize="none"
                            />
                        </div>
                        <br />
                        <button onClick={this.submitBio}>
                            Update your bio
                        </button>
                        <br />
                    </>
                )}
                {!this.state.textAreaIsVisible && this.props.biography && (
                    <>
                        <div id="bioBox">
                            <p>{this.props.biography}</p>
                        </div>
                        <br />
                        <button onClick={this.showTextArea}>
                            Edit your Bio
                        </button>
                        <br />
                    </>
                )}
                {!this.state.textAreaIsVisible && !this.props.biography && (
                    <>
                        <button onClick={this.showTextArea}>
                            Add your Bio
                        </button>
                        <br />
                    </>
                )}
            </div>
        );
    }
}
