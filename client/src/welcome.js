import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <>
            <BrowserRouter>
                <div className="someClass">
                    <img src="./agora.jpg" alt="logo" height="200vh" />
                    <h1>Welcome to Agora</h1>
                    <h2>
                        <em>The public sphere</em>
                    </h2>
                </div>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
