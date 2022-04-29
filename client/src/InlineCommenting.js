import { useState } from "react";

export default function inlineCommenting() {
    const [citationInProgress, setCitation] = useState("");
    const [authorInProgress, setAuthor] = useState("");
    const [sourceInProgress, setSource] = useState("");

    function fixEntry() {
        let fixedCitation = citationInProgress;
        let fixedAuthor = authorInProgress;
        console.log("Citation fixed: ", fixedCitation);
        console.log("Author fixed: ", fixedAuthor);
        console.log("Source fixed: ", fixedSource);
    }

    function getCitation() {
        let capturedCitation = window.getSelection().toString();
        console.log(`Citation captured: `, capturedCitation);
    }

    return (
        <section id="textSelection">
            <h1>Enter a text to analyse</h1>
            <br />
            <form>
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
                <button type="button" onClick={fixEntry}>
                    Capture
                </button>
            </form>
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
// In the earlier epochs of history, we find almost everywhere a complicated arrangement of society into various orders, a manifold gradation of social rank. In ancient Rome we have patricians, knights, plebeians, slaves; in the Middle Ages, feudal lords, vassals, guild-masters, journeymen, apprentices, serfs; in almost all of these classes, again, subordinate gradations.
