import React from 'react';
import TimezonesProps from '../models/models';

const Timezones: React.FC<TimezonesProps> = ({ onChange, selectedTimezone, children }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor="time">Timezone</label>
            <select id="time" defaultValue={selectedTimezone} onChange={onChange}>
                {children}
            </select>
        </div>
    );
};

export default Timezones;
