export default function ConfirmDeletionModal(props) {
    return (
        <div className="absolute bg-default-900 w-full h-full z-50">
            <button onClick={props.deleteCallback}>Delete</button>
            <button className="bg-default-100" onClick={props.closeCallback}>Cancel</button>
        </div>
    )
}