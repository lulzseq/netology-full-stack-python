import React from 'react'
import Image from './Image'

export default function Card({ image, children }) {
    return (
        <div className="card">
            <Image data={image} />
            {children}
        </div>
    )
}
