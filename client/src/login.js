import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Login just mounted");
    }

    handleChange(evt) {
        this.setState(
            {
                [evt.target.name]: evt.target.value,
            },
            () => console.log("login state updated", this.state)
        );
    }

    handleSubmit(e) {
        // console.log("user wants to send over data to the server & register");
        e.preventDefault();
        console.log(
            "Ready to fetch. Data the user provided (this.state)",
            this.state
        );
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("Server response from POST /login.json", resp);
                if (!resp.success) {
                    this.setState({ error: "Some error in login" });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("Error on fetch login.json", err);
                // make sure to set our error state in the component's state <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            });
    }

    render() {
        console.log("this.state before rendering: ", this.state);
        return (
            <section>
                <h3 className="someClass">
                    <em>
                        Please login
                        <br />
                        <Link to="/">or register first</Link>
                    </em>
                </h3>
                {this.state.error && <h2>{this.state.error}</h2>}
                <form>
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
