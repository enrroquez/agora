import ProfilePic from "./profilePic";

export default function Profile(props) {
    // function components don't have state
    console.log("We are in Profile now");
    console.log("Props in Profile: ", props);

    // function editProfile() {
    //     alert("I will send this info to the editBio route");
    //     // fetch("/editBio.json").then(() => location.replace("/"));
    // }

    return (
        <>
            <div className="inMain">
                <h3>
                    This is your profile page {props.first} {props.last}.
                </h3>
                <em>You can change your picture by clicking in the image.</em>
                <br />
                <ProfilePic
                    first={props.first}
                    last={props.last}
                    imageUrl={props.imageUrl}
                    showUploader={props.showUploader}
                    style={"imgInProfile"}
                />
                {/* <em>And you can add/edit your picture bio:</em>
                <br />
                <textarea rows="5" cols="80" id="bio"></textarea>
                <br />
                <button onClick={() => editProfile()}>Edit profile</button> */}
            </div>
        </>
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
