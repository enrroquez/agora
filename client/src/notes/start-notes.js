import ReactDOM from "react-dom";
import { Name } from "./name.js";
// import { Counter } from "./counter.js";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return (
        <div>
            <div>
                Hello <Name fistName="David" lastName="Friedman" />
            </div>
            <div>
                Hello <Name fistName="Juan" lastName="Sin miedo" />
            </div>
            <div>
                Hello <Name fistName="Pedro" lastName="Torres" />
            </div>
        </div>
    );
}

// function HelloWorld() {
//     return (
//         <div>
//             <Counter />
//         </div>
//     );
// }
