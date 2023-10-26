import React from 'react'

export default function ShopItem(props) {
    const { item } = props
    return (
        <div className="list__item">
            <img src={item.img}></img>
            <h3>{item.name}</h3>
            <p>{item.color}</p>
            <p className='price'>${item.price}</p>
            <button className='button'>ADD to cart</button>
        </div>
    )
}
