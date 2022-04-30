import { useState } from "react";

export default function inlineCommenting() {
    const [citationInProgress, setCitation] = useState("");
    const [authorInProgress, setAuthor] = useState("");
    const [sourceInProgress, setSource] = useState("");
    const [captureIsVisible, setCapture] = useState("");

    function getCitation() {
        let capturedCitation = window.getSelection().toString();
        console.log(`Citation captured: `, capturedCitation);
    }

    function sendCitationToServer() {
        fetch(`/saveCitation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                citationInProgress,
                authorInProgress,
                sourceInProgress,
            }),
        })
            .then((res) => res.json())
            .then(({ success }) => {
                setCapture(success);
                console.log("captureIsVisible: ", captureIsVisible);
            })
            .catch((err) => {
                console.log("error sending data to server: ", err);
            });
    }

    return (
        <section>
            <h1>Enter a text to analyse</h1>
            <br />
            {!captureIsVisible && ( //conditional rendering of a form, it becomes not visible after capturing
                <>
                    <form id="capture">
                        <input
                            placeholder="Citation"
                            onChange={(e) => setCitation(e.target.value)}
                        />
                        <input
                            placeholder="Author"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <input
                            placeholder="Source"
                            onChange={(e) => setSource(e.target.value)}
                        />
                        <button type="button" onClick={sendCitationToServer}>
                            Capture
                        </button>
                    </form>
                </>
            )}
            <br />
            <br />
            <div className="citation-container">
                <div className="citation">
                    <p onMouseUp={getCitation}>"{citationInProgress}"</p>
                    <p className="author">{authorInProgress}</p>
                    <p className="source">{sourceInProgress}</p>
                </div>
            </div>
            <br />
        </section>
    );
}

// In the earlier epochs of history, we find almost everywhere a complicated arrangement of society into various orders, a manifold gradation of social rank. In ancient Rome we have patricians, knights, plebeians, slaves; in the Middle Ages, feudal lords, vassals, guild-masters, journeymen, apprentices, serfs; in almost all of these classes, again, subordinate gradations. Karl Marx https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm
// I saw the Emperor—this world-soul [Weltseele]—riding out of the city on reconnaissance. It is indeed a wonderful sensation to see such an individual, who, concentrated here at a single point, astride a horse, reaches out over the world and masters it. Georg Wilhelm Friedrich Hegel https://en.wikipedia.org/wiki/Georg_Wilhelm_Friedrich_Hegel

// function sendSelectionToServer() {
//     fetch(`/saveSelection`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             selectionInProgress,
//         }),
//     })
//         .then((res) => res.json())
//         .then((response) => {
//             console.log("response from save citation: ", response);
//         })
//         .catch((err) => {
//             console.log("error retriving data from DB: ", err);
//         });
// }

// function sendCommentToServer() {
//     fetch(`/saveComment`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             commentInProgress,
//             someReply,
//         }),
//     })
//         .then((res) => res.json())
//         .then((response) => {
//             console.log("response from save citation: ", response);
//         })
//         .catch((err) => {
//             console.log("error retriving data from DB: ", err);
//         });
// }
