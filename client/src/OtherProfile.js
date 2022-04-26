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

                // if(/*current user*/) {
                //     history.replace("/")
                // } else {
                //     // Update State
                // }
            });
    }, []);

    console.log("user.id in OtherProfile: ", user.id);
    if (!user.id) return <></>;
    else
        return (
            <section>
                <div>Profile from some other user</div>
            </section>
        );
}
