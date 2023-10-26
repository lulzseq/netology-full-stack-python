import React, { useState } from 'react';
import ListItem from './ListItem';

const startData = [
    {
        "date": "01.01.2000",
        "distance": "1"
    }
];

export default function Form() {
    const [jsonData, setJsonData] = useState([...startData]);
    const [newDate, setNewDate] = useState('');
    const [newDistance, setNewDistance] = useState('');

    const handleGetDate = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewDate(e.target.value);
    }

    const isNewDateExists = () => {
        return jsonData.some(item => item.date === newDate);
    }

    const handleGetDistance = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewDistance(e.target.value);
    }

    const handleAddData = () => {
        const re_date = /(^0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}/.test(newDate);
        const re_distance = /\d+/.test(newDistance);

        if (re_date && re_distance) {
            if (isNewDateExists()) {
                setJsonData(prevData => {
                    const updatedData = prevData.map(item => {
                        if (item.date === newDate) {
                            return {
                                ...item,
                                distance: (parseFloat(item.distance) + parseFloat(newDistance)).toString()
                            };
                        }
                        return item;
                    });
                    return updatedData.sort((a, b) => new Date(b.date) - new Date(a.date));
                });
            } else {
                const newData = {
                    date: newDate,
                    distance: newDistance
                };

                setJsonData(prevData => {
                    const updatedData = [...prevData, newData];
                    return updatedData.sort((a, b) => new Date(b.date) - new Date(a.date));
                });
            }
        }

        setNewDate('');
        setNewDistance('');
    }

    const handleRemoveItem = (index: number) => {
        setJsonData(prevData => prevData.filter((item, i) => i !== index));
    }

    return (
        <div className="container">
            <div className='forms'>
                <form className='form__date'>
                    <label htmlFor="date">Дата</label>
                    <input type="text" id="date" onChange={handleGetDate} value={newDate} />
                </form>
                <form className='form__distance'>
                    <label htmlFor="distance">Пройдено км</label>
                    <input type="text" id="distance" onChange={handleGetDistance} value={newDistance} />
                </form>
                <button className='btnSubmit' type='button' onClick={handleAddData}>OK</button>
            </div>
            <div className='data'>
                <div className='data__description'>
                    <p className='data__date'>Дата (ДД.ММ.ГГГГ)</p>
                    <p className='data__distance'>Пройдено км</p>
                    <p className='data__actions'>Действия</p>
                </div>
                <div className='data__items'>
                    {jsonData.map((item, index) => (
                        <ListItem key={index} item={item} onRemove={() => handleRemoveItem(index)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
