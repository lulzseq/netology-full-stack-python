import React from 'react'
import ShopItem from './ShopItem'

export default function ListView(props) {
  const { items } = props
  return (
    <div className="list">
      {items.map((item, index) =>
        <ShopItem key={index} item={item} />
      )}
    </div>
  )
}
