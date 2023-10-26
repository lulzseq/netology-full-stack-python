import React from 'react';

export default function SearchHeader({ links }) {
    return (
        <div className='search__header'>
            {links.map((link, index) => (
                <div key={index} className='search__header__item'>
                    <a href={link.url}>{link.text}</a>
                </div>
            ))}
        </div>
    );
}
