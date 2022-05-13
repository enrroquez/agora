import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function goToCitation() {
    const [citation, setCitation] = useState({});
    const params = useParams();
    const history = useHistory();

    console.log("params in goToCitation: ", params);
    console.log("history in goToCitation: ", history);

    useEffect(() => {
        fetch(`/citation/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched from server: ", data);
                if (data.citationDontExist) {
                    history.replace("/");
                } else {
                    setCitation(data);
                }
            });
    }, []);

    // console.log("user.id in OtherProfile: ", citation.id);
    const { author, text, first, citationId, image_url, last, source } =
        citation;

    return (
        <section>
            <h1>Citation number {citationId}</h1>
            <div>
                <p className="small">
                    Author:{author}
                    <br />
                    Text: {text}
                    <br />
                    Source: <a href={source}>{source}</a>
                    <br />
                    Publisher: {first} {last}
                    <br />
                    {image_url}
                </p>
                <br />
            </div>
        </section>
    );
}
