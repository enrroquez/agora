import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <>
            {
                <div className="someClass">
                    <img src="./agora.jpg" alt="logo" height="200vh" />
                    <h1>Welcome to Agora</h1>
                    {/* <h2>
                    <em>The argumentation community</em>
                </h2> */}
                </div>
            }
            <BrowserRouter>
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
