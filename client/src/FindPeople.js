import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    const [currentSearch, setCurrentSearch] = useState("");

    console.log("arrayOfUsers: ", arrayOfUsers);

    useEffect(() => {
        let abort = false;

        fetch(`/find-users?search=${currentSearch}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("response: ", response);
                if (!abort) {
                    setArrayOfUsers(response); //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                }
            });

        return () => (abort = true);
    }, [currentSearch]);

    return (
        <section id="findPeople">
            <h1>Find interesting people here</h1>
            <input
                placeholder="Enter a name"
                onChange={(e) => setCurrentSearch(e.target.value)}
            />
            <div>{currentSearch}</div>
            <div id="usersContainer">
                {!currentSearch && <h3>Most recent members</h3>}
                {currentSearch && <h3>Your search results</h3>}
                {console.log("arrayOfUsers: ", arrayOfUsers)}
                {arrayOfUsers.map((user) => (
                    <div key={user.id}>
                        {console.log("user.id: ", user.id)}
                        {console.log("user.imageUrl: ", user.imageUrl)}
                        <div>
                            <Link to={`user/${user.id}`}>
                                <img
                                    className="mostRecentImage"
                                    src={
                                        user.imageUrl
                                            ? user.imageUrl
                                            : "anon.jpg"
                                    }
                                    alt={`${user.first} ${user.last}`}
                                />
                            </Link>
                        </div>
                        <div>
                            {user.first} {user.last}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

//     useEffect(() => {
//         fetch(`/users`)
//             .then((res) => res.json())
//             .then(({arrayOfUsers}) => {
//                     console.log(arrayOfUsers);
//             });
//         return ();
//     });
// }

// setArrayOfUsers(){

// };

// setCurrentSearch(){

// };

// // you could use this to ensure that only the correct results appear when HTTP responses are received in a different order than the one in which the requests were made.
// useEffect(() => {
//     let abort;
//     (async () => {
//         const data = await fetch(
//             `/user/${id}.json`
//         ).then(
//             response => response.json()
//         );
//         if (!abort) {
//             setUser(data.user);
//         }

//     })();
//     return () => {
//         abort = true;
//     };
// }, [id]);
