import { useState } from "react";
import { socket } from "./socket.js";

export default function inlineCommenting() {
    const [citationInProgress, setCitation] = useState("");
    const [authorInProgress, setAuthor] = useState("");
    const [sourceInProgress, setSource] = useState("");
    const [commentReceived, setComment] = useState("");
    const [capturingIsVisible, setCapturing] = useState("true");
    const [selectingIsVisible, setSelecting] = useState("");
    const [commentingIsVisible, setCommenting] = useState("");

    function sendCommentToServer() {
        console.log("I am in sendCommentToServer function!!!");
        console.log("and comment captured is: ", commentReceived);
    }

    function getSelection() {
        let capturedSelection = window.getSelection().toString();
        if (capturedSelection) {
            console.log(`capturedSelection: `, capturedSelection);
            fetch(`/saveSelection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    capturedSelection,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log("response from server: ", response);
                    setCommenting(response.success);
                    console.log("commentingIsVisible: ", commentingIsVisible);
                    setSelecting(false);
                })
                .catch((err) => {
                    console.log("error sending data to server: ", err);
                });
        }
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
            .then((response) => {
                console.log("success: ", response.success);
                setCapturing(false); // setCapturing(response.success);
                console.log("capturingIsVisible: ", capturingIsVisible);
                setSelecting(response.success);
                console.log("citationInProgress is set: ", citationInProgress);
            })
            .catch((err) => {
                console.log("error sending data to server: ", err);
            });
    }

    return (
        <section>
            <h1>Let's analyse arguments together!</h1>
            <br />
            {capturingIsVisible && (
                <>
                    <h3>1 - Add a citation.</h3>
                </>
            )}
            {selectingIsVisible && (
                <>
                    <h3>2 - Select a piece.</h3>
                </>
            )}
            {commentingIsVisible && (
                <>
                    <h3>3 - Add a comment.</h3>
                </>
            )}
            <br />
            {capturingIsVisible && (
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
                    <p onMouseUp={getSelection}>"{citationInProgress}"</p>
                    <p className="author">{authorInProgress}</p>
                    <p className="source">{sourceInProgress}</p>
                </div>
            </div>
            <br />
            <br />
            {commentingIsVisible && (
                <>
                    <form id="comment">
                        <input
                            placeholder="Comment"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                socket.emit("user-click", {
                                    info: [
                                        "thanks",
                                        "the user just clicked the button",
                                    ],
                                })
                            }
                        >
                            Post
                        </button>
                    </form>
                    {/* <form id="comment">
                        <input
                            placeholder="Comment"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button type="button" onClick={sendCommentToServer}>
                            Post
                        </button>
                    </form>
                    <button
                        onClick={() =>
                            socket.emit("user-click", {
                                info: [
                                    "thanks",
                                    "the user just clicked the button",
                                ],
                            })
                        }
                    >
                        Click me for a nice socket message
                    </button> */}
                </>
            )}
        </section>
    );
}

// In the earlier epochs of history, we find almost everywhere a complicated arrangement of society into various orders, a manifold gradation of social rank. In ancient Rome we have patricians, knights, plebeians, slaves; in the Middle Ages, feudal lords, vassals, guild-masters, journeymen, apprentices, serfs; in almost all of these classes, again, subordinate gradations. Karl Marx https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch02.htm
// I saw the Emperor—this world-soul [Weltseele]—riding out of the city on reconnaissance. It is indeed a wonderful sensation to see such an individual, who, concentrated here at a single point, astride a horse, reaches out over the world and masters it. Georg Wilhelm Friedrich Hegel https://en.wikipedia.org/wiki/Georg_Wilhelm_Friedrich_Hegel

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
