import { useState } from "react";

export default function inlineCommenting() {
    const [citationInProgress, setCitation] = useState("");

    function getCitation() {
        let selection = window.getSelection().toString();
        console.log(`Selected text: `, selection);
    }

    function fixCitation() {
        let fixedCitation = citationInProgress;
        console.log("citationFixed: ", fixedCitation);
    }

    return (
        <section id="textSelection">
            <h1>Enter a text to analyse</h1>
            <br />
            <input
                placeholder="Enter a text"
                onChange={(e) => setCitation(e.target.value)}
            />
            <button type="button" onClick={fixCitation}>
                Capture
            </button>
            <br />
            <br />
            <div className="citation">
                <div onMouseUp={getCitation}>{citationInProgress}</div>
            </div>
            <br />
        </section>
    );
}
// In the earlier epochs of history, we find almost everywhere a complicated arrangement of society into various orders, a manifold gradation of social rank. In ancient Rome we have patricians, knights, plebeians, slaves; in the Middle Ages, feudal lords, vassals, guild-masters, journeymen, apprentices, serfs; in almost all of these classes, again, subordinate gradations.
