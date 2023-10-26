import React, { useState } from 'react';

export default function Form() {
    const [values, setValues] = useState<{ hex: string, rgb: string }>({ hex: '#222222', rgb: '' });
    const [inputValue, setInputValue] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setInputValue(inputValue);

        const rgb = hexToRgb(inputValue);

        if (inputValue.length === 7 && rgb) {
            setValues({ hex: inputValue, rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})` });
        } else if ((inputValue.length > 7) || (inputValue.length === 7 && !rgb)) {
            setValues({ hex: inputValue, rgb: 'ERROR' });
        }
    }

    function hexToRgb(hex: string | undefined) {
        if (!hex) return null;
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return (
        <form className='form' style={{ backgroundColor: values.rgb !== 'ERROR' ? values.rgb : '#222222' }}>
            <input
                className='input'
                type="text"
                value={inputValue}
                onChange={handleChange}
                ref={(input) => input && input.focus()}
            />
            <p className='result'>{values.rgb}</p>
        </form>
    );
}
