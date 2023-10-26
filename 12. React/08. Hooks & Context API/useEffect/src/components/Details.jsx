import React, { useEffect, useState } from 'react';

export default function Details({ info }) {
    const { id, name } = info;

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [id]);

    return (
        <div className='details'>
            <img src={data.avatar} alt="Avatar" />
            <h2>{data.name}</h2>
            <p>City: {data.details && data.details.city}</p>
            <p>Company: {data.details && data.details.company}</p>
            <p>Position: {data.details && data.details.position}</p>
        </div>
    );
}
