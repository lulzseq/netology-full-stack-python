import Star from './Star'


export default function Stars(props) {
    const { name, rating, count } = props

    return (
        <>
            <ul className="card-body-stars">
                <p>{name}</p>
                <p>Rating: {rating}</p>
                <div>
                    {Array(count).fill(<Star />)}
                </div>
            </ul>
        </>
    )
}
