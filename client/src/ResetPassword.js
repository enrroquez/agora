import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    //needs state so it should be a class
    constructor() {
        super();
        this.state = {
            error: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        fetch("/reset-1st.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("Server response from POST /reset.json", resp);
                if (!resp.success) {
                    this.setState({
                        error: "If that was a valid email, we have sent an email message with the reset code.",
                    });
                    // there was success:false in route POST login.json what should we do?
                } else {
                    // there was success:true in route POST login.json the user's email was found in DB
                    console.log("success:true");
                    // location.reload();
                }
            })
            .catch((err) => {
                console.log("Error on fetch reset.json", err);
                // make sure to set our error state in the component's state <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<PEND?
            });
    }

    render() {
        console.log(this.state);
        console.log(this.state.error);
        return (
            <section>
                <h3 className="someClass">
                    <em>
                        Reset Password,
                        <br />
                        please make sure to enter the email you registered.
                        <br />
                        <Link to="/login">or go to login</Link>
                    </em>
                </h3>
                {this.state.error && <h2>{this.state.error}</h2>}
                <p>
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={this.handleChange}
                    />
                </p>
                <button onClick={this.handleSubmit}>Reset</button>
            </section>
        );
    }
}
