import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListCitations() {
    const [citations, setListCitations] = useState([]);
    // const { id, citation, author, source, first, last, image_url } = citations;

    useEffect(() => {
        fetch(`/getCitations`)
            .then((res) => res.json())
            .then((data) => {
                setListCitations(data);
                console.log("data fetched from server: ", citations);
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
                    <p className="small">
                        Author:{citation.author}
                        <br />
                        Text: {citation.citation}
                        <br />
                        Source: <a href={citation.source}>{citation.source}</a>
                        <br />
                        Publisher: {citation.first} {citation.last}
                        <br />
                        <Link to={`/show-citation/${citation.id}`}>
                            Join the discussion
                        </Link>
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
