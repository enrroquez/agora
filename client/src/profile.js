import ProfilePic from "./profilePic";

export default function Profile(props) {
    // function components don't have state
    console.log("we are in Profile now");
    console.log("Props in Profile: ", props);

    function editProfile() {
        alert("Let's edit my profile");
        // fetch("/logout.json").then(() => location.replace("/"));
    }

    return (
        <div className="someClass">
            {/* <h2>
                This is {props.first} {props.last}s profile.
            </h2>
            <ProfilePic
                first={props.first}
                last={props.last}
                imageUrl={props.imageUrl}
            /> */}
            <button onClick={() => editProfile()}>Edit profile</button>
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
