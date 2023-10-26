import React from 'react'

export default function ShopCard(props) {
    const { item } = props
    return (
        <div className='cards_item'>
            <h3>{item.name}</h3>
            <p>{item.color}</p>
            <img src={item.img}></img>
            <div>
                <p className='price'>${item.price}</p>
                <button className='button'>Add to cart</button>
            </div>
        </div>
    )
}
