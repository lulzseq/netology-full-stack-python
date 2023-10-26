import React from 'react';

export default function List({ data, onItemClick, selectedItem }) {

    return (
        <>
            <table className='items'>
                {data.map(item => (
                    <tr key={item.id}>
                        <td
                            className={`item ${selectedItem && selectedItem.id === item.id ? 'selected-item' : ''}`}
                            onClick={() => onItemClick(item)}
                        >
                            {item.name}
                        </td>
                    </tr>
                ))}
            </table>
        </>
    );
}
