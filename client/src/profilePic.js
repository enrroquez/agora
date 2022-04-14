export default function profilePic(props) {
    console.log("we are in profilePic");
    console.log("props: ", props);
    return (
        <>
            <img
                src={props.imageUrl || "/agora.jpg"}
                alt={`${props.first} ${props.last}`}
                onClick={props.showUploader}
            />
        </>
    );
}
