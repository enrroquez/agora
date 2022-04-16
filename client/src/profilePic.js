export default function profilePic(props) {
    console.log("we are in profilePic");
    console.log("props: ", props);

    function logout() {
        fetch("/logout.json").then(() => location.replace("/"));
    }

    return (
        <>
            <br />
            <div className="someClass">
                <img
                    src={props.imageUrl || "/anon.jpg"}
                    height={"100vh"}
                    alt={`${props.first} ${props.last}'s photo`}
                    onClick={props.showUploader}
                />
                <h3>Welcome {`${props.first} ${props.last}`}!</h3>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </>
    );
}
