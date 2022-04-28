import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from ".redux/reducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data.userId:", data.userId);
        if (!data.userId) {
            // this means the user does not have the right cookie, and should
            // see registration, login or pw reset
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // this means the user is logged in cause their browser DID have a cookie
            ReactDOM.render(
                <Provider store={store}>
                    <App />

                    {/* <div className="someClass">
                        <img src="./agora.jpg" alt="logo" height="200vh" />
                        <h1>Welcome to Agora</h1>
                        <h2>
                            <em>You are logged in</em>
                        </h2>
                    </div> */}
                </Provider>,
                document.querySelector("main")
            );
        }
    });
