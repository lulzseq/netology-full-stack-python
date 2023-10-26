import React from 'react';
import '../App.css';

export default function IconSwitch({ icon, onSwitch }) {
    return (
        <>
            <button className='material-icons' onClick={onSwitch}>{icon}</button>
        </>
    );
}
