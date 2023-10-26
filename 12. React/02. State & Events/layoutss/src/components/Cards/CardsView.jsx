import React from 'react'
import ShopCard from './ShopCard'

export default function CardsView(props) {
  const { items } = props
  return (
    <div className="cards">
      {items.map((item, index) => (
        <ShopCard key={index} item={item} />
      ))}
    </div>
  )
}
