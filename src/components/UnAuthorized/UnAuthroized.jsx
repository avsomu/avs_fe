export default function UnAuthorized({ text }) {
    return (
        <h1 className="unauthor-page"> {text ? text : "fail"}</h1>
    )
}