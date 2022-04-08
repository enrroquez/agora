export function Name(props) {
    const { firstName, lastName = "Anonymous" } = props;
    return (
        <h3>
            <strong>{firstName}</strong>
            <em>{lastName}</em>
        </h3>
    );
}
