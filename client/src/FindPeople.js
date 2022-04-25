import { useState, useEffect } from "react";

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
                    setArrayOfUsers(response);
                }
            });

        return () => (abort = true);
    }, [currentSearch]);

    return (
        <section id="findPeople">
            <h1>Find interesting people here</h1>
            <input
                placeholder="Enter name"
                onChange={(e) => setCurrentSearch(e.target.value)}
            />
            <div>{currentSearch}</div>
            <div id="usersContainer">
                {!currentSearch && <h3>Most recent members</h3>}
                {currentSearch && <h3>Your search results</h3>}
                {arrayOfUsers.map((user) => (
                    // console.log('user.id: ', user.id);
                    <div key={user.id}>
                        <img
                            className="mostRecentImage"
                            src={
                                user.imageUrl
                                    ? user.imageUrl
                                    : "images/anon.jpg"
                            }
                            alt={`${user.first} ${user.last}`}
                        />
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
