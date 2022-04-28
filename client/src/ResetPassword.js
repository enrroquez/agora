import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    //needs state so it should be a class
    constructor() {
        super();
        this.state = {
            error: "",
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCode = this.handleCode.bind(this);
    }
    componentDidMount() {
        console.log("ResetPassword just mounted");
    }
    handleChange(evt) {
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log("registration state updated", this.state)
        );
    }

    handleSubmit() {
        console.log(
            "user wants to send over data to the server & reset password"
        );
        console.log(
            "Ready to fetch. Data the user provided (this.state)",
            this.state
        );
        fetch("/password/reset/start.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("Server response for POST: ", resp);
                if (!resp.success) {
                    this.setState({
                        error: "Something went wrong!",
                    });
                } else {
                    this.setState({ step: 2 });
                    // location.reload();
                }
            })
            .catch((err) => {
                console.log("Error on fetch reset.json", err);
            });
    }

    handleCode() {
        fetch("/password/reset/verify.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("Server response for POST: ", resp);
                if (!resp.success) {
                    this.setState({
                        error: "There was an error updating your password",
                    });
                } else {
                    this.setState({ step: 3 });
                    // location.reload();
                }
            })
            .catch((err) => {
                console.log("Error on fetch reset.json", err);
            });
    }

    render() {
        console.log(this.state);
        console.log(this.state.error);
        if (this.state.step == 1) {
            return (
                <section className="someClass">
                    <h3 className="someClass">
                        <em>
                            Reset Password,
                            <br />
                            please make sure to enter the email you registered
                            <br />
                            <Link to="/login">or go to login</Link>
                        </em>
                    </h3>
                    {this.state.error && <h2>{this.state.error}</h2>}
                    <p>
                        <input
                            key="1"
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={this.handleChange}
                        />
                    </p>
                    <button onClick={this.handleSubmit}>Submit</button>
                </section>
            );
        } else if (this.state.step == 2) {
            return (
                <section className="someClass">
                    <h3>
                        Reset Password
                        <br />
                        <em>
                            We have sent an email message with the reset code.
                            <br />
                            Please introduce it here, along with your new
                            password.
                        </em>
                    </h3>
                    {this.state.error && <h2>{this.state.error}</h2>}
                    <p>
                        <input
                            key="2"
                            name="resetCode"
                            placeholder="Reset code"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            key="3"
                            name="password"
                            placeholder="New password"
                            type="password"
                            onChange={this.handleChange}
                        />
                    </p>
                    {/* {
                        setTimeout(() => {this.setState({ error: "" })}, 5000)
                    } */}
                    <button onClick={this.handleCode}>Reset</button>
                </section>
            );
        } else if (this.state.step == 3) {
            return (
                <section className="someClass">
                    <h2>Reset Password</h2>
                    <h3>
                        <em>
                            Password has been renewed.
                            <br />
                            <Link to="/login">Go to login</Link>
                        </em>
                        {this.state.error && <h2>{this.state.error}</h2>}
                    </h3>
                </section>
            );
        }
    }
}
