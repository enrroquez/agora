import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListCitations() {
    const [citations, setListCitations] = useState([]);

    useEffect(() => {
        fetch(`/getCitations`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched from server: ", data); //<<<<<<<<<<<<<<<
                setListCitations(data);
                console.log("data fetched from server: ", citations); //<<<<<<<<<<<<<
            })
            .catch((err) => {
                console.log("error retrieving data from server: ", err);
            });
    }, []);

    if (!citations) {
        return <></>;
    }

    return (
        <section>
            <h1>List of all texts brought to collective analysis</h1>
            {citations.map((citation) => (
                <div key={citation.id}>
                    <p className="citations-list">
                        <div>
                            Published by:
                            <br />
                            <br />
                            <img src={citation.image_url} height="100px" />
                            <br />
                            {citation.first} {citation.last}
                            <br />
                            on {citation.to_char}
                        </div>
                        <div>
                            <>
                                <em>
                                    <b>{citation.citation}</b>
                                </em>
                            </>
                            <br />
                            <br />
                            Author: {citation.author}
                            <br />
                            Source:{" "}
                            <a href={citation.source}>{citation.source}</a>
                            <br />
                            <br />
                            <Link to={`/show-citation/${citation.id}`}>
                                Join the discussion
                            </Link>
                        </div>
                    </p>
                    <br />
                </div>
            ))}
        </section>
    );
}
//     <div id="list-container">
//         <p></p>

//         _.*Algo*._
//         id | citation | author | source | first | last | image_url
//         <h3>
//             This is {user.first} {user.last}'s profile.
//         </h3>
//         <img
//             className="remember"
//             // don't forget
//             src={user.imageUrl || "anon.jpg"}
//             alt={`${user.first} ${user.last}`}
//         />
//         <p>{user.biography}</p>
//     </div>
