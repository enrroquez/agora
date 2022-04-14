export default function profilePic(props) {
    console.log("we are in profilePic");
    console.log("props: ", props);
    return (
        <>
            <div className="someClass">
                <img
                    src={props.imageUrl || "/anon.jpg"}
                    height={"200vh"}
                    alt={`${props.first} ${props.last}`}
                    onClick={props.showUploader}
                />
            </div>
        </>
    );
}
