import React from "react";
export class Counter extends React.Component {
    //Counter component inherits from React.Component,
    //the constructor need to initialize
    constructor() {
        super();
        this.state = {
            count: 0,
            wasClicked: false,
        };
    }

    componentDidMount() {
        console.log("Mounted");
    }

    componentWillUnmount() {
        console.log("Will mount");
    }

    componentDidUpdate() {
        console.log("something");
    }

    render() {
        console.log(this.state);
        return (
            <section>
                <h1>Counter</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.handleClick()}>Click me</button>
            </section>
        );
    }

    handleClick() {
        //this.setState({ count: this.state.count + 1 });
        this.setState((prevState) => {
            return { count: prevState.count + 1 };
        });
        // this.setState({ wasClicked: true });
    }
}

//Constructor this.handleClick = this.handleClick.bind(this); //Preserve the context
//<button onClick={this.handleClick}>Click me</button>

//<button onClick={() => this.handleClick()}>Click me</button> // Preserve the context
