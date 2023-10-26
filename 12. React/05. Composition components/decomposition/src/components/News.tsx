export default function News({ title, children }) {
    return (
        <>
            <div className='news'>
                <h3>{title}</h3>
                {children}
            </div>
        </>
    )
}
