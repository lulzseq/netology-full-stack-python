import React, { useState } from 'react';
import IconSwitch from './IconSwitch';
import CardsView from './Cards/CardsView';
import ListView from './List/ListView';

export default function Store({ products }) {
    const [icon, setIcon] = useState('view_module');

    function handleClick() {
        if (icon === 'view_module') {
            setIcon('view_list');
        } else {
            setIcon('view_module');
        }
    }

    return (
        <>
            <IconSwitch icon={icon} onSwitch={handleClick} />
            {icon == 'view_list' &&
                <CardsView items={products} />
            }
            {icon == 'view_module' &&
                <ListView items={products} />
            }

        </>
    );
}
