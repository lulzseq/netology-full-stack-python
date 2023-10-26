import React from 'react';
import { IText } from '../models/IText';

export const Text: React.FC<IText> = ({ data }) => {
    return (
        <>
            {data.map((text, index) => <p key={index} className="card-text">{text}</p>)}
        </>
    );
};

export default Text