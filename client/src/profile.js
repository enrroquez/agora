// Import ProfilePic from "./profilepic";

export default function Profile({ first, last, image }) {
    //function components don't have state
    //console.log("Props in Profile: ", props);
    return (
        <div className="container">
            <h1>This is the Profile Component</h1>
            <h2>
                My name is {first} {last}
            </h2>
            <ProfilePic first={first} />
        </div>
    );
}

// export default function Profile(props) { //function components don't have state
//     console.log("Props in Profile: ", props);
//     return (
//         <div className="container">
//             <h1>This is the Profile Component</h1>
//             <h2>My name is {props.first} {props.last}</h2>

//             <ProfilePic
//                 first={props.first}
//             />

//         </div>
//     );
// }
