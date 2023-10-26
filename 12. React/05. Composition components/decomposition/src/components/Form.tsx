import React from 'react'

export default function Form({ placeholder, icon, btnText }) {
    return (
        <>
            <div className='form'>
                <form>
                    <input type="text" placeholder={placeholder} />
                    <button type="submit">{icon} {btnText}</button>
                </form>
            </div>
        </>
    )
}
