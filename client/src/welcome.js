//below we are importing
import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <>
            <div className="someClass">
                <img src="./agora.jpg" alt="logo" height="200vh" />
                <h1>Welcome to Agora</h1>
                {/* <h2>
                    <em>The argumentation community</em>
                </h2> */}
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}
