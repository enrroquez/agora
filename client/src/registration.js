import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Registration just mounted");
    }

    handleChange(evt) {
        // console.log("User is typing");
        // console.log("which input field is my user typing in?,",evt.target.name);
        // console.log("what is my user typing?,", evt.target.value);
        // console.log("evt: ", evt); //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>check the console in browser
        // every time a change on any of the input fields happens we want to synch that
        // change to our state
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log("registration state updated", this.state)
        );
    }

    handleSubmit(e) {
        console.log("user wants to send over data to the server & register");
        e.preventDefault(); // avoid browser reloading, I think
        console.log("Ready to fetch. Data the user provided", this.state);
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("Server response from POST /register.json", resp);

                // Still to do in the client
                // if the server indicates registration failed -> render error conditionally
                // if the server indicates that registration was successful
                // trigger page reload with location.reload() in order of rerunning
                // start.js

                if (!resp.success) {
                    this.setState({ error: "Some error in registration" });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("Error on fetch register.json", err);
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
                        Please register
                        <br />
                        <Link to="/login">or login</Link>
                    </em>
                </h3>
                {this.state.error && <h2>{this.state.error}</h2>}
                <form>
                    <p>
                        <input
                            name="first"
                            placeholder="First Name"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <input
                            name="last"
                            placeholder="Last Name"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                        />
                    </p>
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
            </section>
        );
    }
}
