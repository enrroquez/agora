import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function OtherProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();

    console.log("params in OtherProfile: ", params);
    console.log("history in Other Profile: ", history);

    useEffect(() => {
        fetch(`/api/user/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched from server: ", data);
                if (data.userDontExist) {
                    history.replace("/");
                } else if (data.sameUser) {
                    history.replace("/");
                } else {
                    setUser(data);
                }
            });
    }, []);

    console.log("user.id in OtherProfile: ", user.id);
    if (!user.id) return <></>;
    else
        return (
            <div>
                <h3>
                    This is {user.first} {user.last}'s profile.
                </h3>
                <img
                    className="remember"
                    src={user.imageUrl || "anon.jpg"}
                    alt={`${user.first} ${user.last}`}
                />
                <p>{user.biography}</p>
            </div>
        );
}
