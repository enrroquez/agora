export default function profilePic(props) {
    console.log("we are in profilePic");
    console.log("props in profilePic: ", props);

    return (
        <>
            <br />
            <div className="someClass">
                <img
                    src={props.imageUrl || "/anon.jpg"}
                    // height={"100vh"}
                    alt={`${props.first} ${props.last}'s photo`}
                    onClick={props.showUploader}
                    className={props.style}
                />
            </div>
        </>
    );
}
