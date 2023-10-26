import React from 'react';

export default function ListItem({ item, onRemove }: any) {
  return (
    <div className='data__item'>
        <p className='item__date'>{item.date}</p>
        <p className='item__distance'>{item.distance}</p>
        <button className='btnDelete' onClick={onRemove}>✘</button>
    </div>
  );
}
